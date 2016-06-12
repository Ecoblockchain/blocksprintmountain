contract Mountain {

    // Settings for contract, determined at initialization

    // Name of contract
    bytes32 public contractName;

    // Founder created contract
    address public founder;

    // Multiplier: deposit multiplied by this to determine max loan
    uint public multiplier;

    // Amount of time to wait after deposits before counting them
    // in calculation of max loan
    uint public waitingWeeks;

    // Hard limit to loans
    uint public maxLoan;

    // For later
    // uint public timeToPayBack;
    // uint public rateOfBorrowingDown;
    // uint public rateOfUnanimityForNewMembers;

    // Members are current members
    enum MemberStatuses { Invited, Member }
    mapping(address => MemberStatuses) public memberStatus;

    struct MemberInformation {
        address     memberAddress;
        int         lastTransaction;
        uint        lastTransactionDate;
        uint        totalOut;
        uint        totalIn;
        int         balance;
        bytes32      name;
    }
    MemberInformation[] public memberInformation;
    uint public memberInformationLength;
    mapping(address => uint) memberInformationLookup;

    // Balances for each member - a signed integer, can be negative
    mapping(address => int) accountBalance;

    // Every deposit or withdrawal is a transaction; amountIntoMountain
    // is negative for withdrawals and positive for deposits.
    struct Transaction {
        uint    timestamp;
        int     amountIntoMountain;
    }

    // History of transactions for a user
    mapping(address => Transaction[]) accountHistory;

    // Constructor

    function Mountain(bytes32 name, uint multiplier, uint waitingWeeks, uint maxLoan, address founder){
        contractName = name;
        multiplier = multiplier;
        waitingWeeks = waitingWeeks;
        maxLoan = maxLoan;
        founder = founder;
    }

    // TRANSACTIONS: State-altering methods

    modifier mustBeMember() {
        if(memberStatus[msg.sender] != MemberStatuses.Member) throw;
    }

    modifier mustBeFounder() {
        if(msg.sender != founder) throw;
    }

    function isMemberInvited (address member) public returns (bool) {
        if(memberStatus[member] == MemberStatuses.Invited){
          return true;
        }
        return false;
    }

    function addMember (address member, bytes32 name) {
        memberStatus[member] = MemberStatuses.Member;
        memberInformationLookup[member] = memberInformation.length;
        memberInformation.push(MemberInformation(
            msg.sender,
            0,
            now,
            0,
            0,
            0,
            name
        ));
        memberInformationLength++;
    }

    function updateAccountState(address memberAddress, uint newAmount, bool withdrawal) internal {
        var info = memberInformation[memberInformationLookup[memberAddress]];

        info.balance = accountBalance[memberAddress];
        if(withdrawal){
            info.totalOut += newAmount;
            info.lastTransaction = -int(newAmount);
        }else{
            info.totalIn += newAmount;
            info.lastTransaction = int(newAmount);
        }
        info.lastTransactionDate = now;

        memberInformation[memberInformationLookup[memberAddress]] = info;
    }

    function maxBorrowAmount(address who) internal returns (int) {

        int borrowBase;
        // Consider all transactions in user's history
        // @TODO Consider putting a hard limit on number of transactions
        // in accountHistory, to not allow someone to consume all the gas
        for (uint j = 0; j < accountHistory[who].length; j++) {
            // If the transaction we're considering is a deposit,
            // check that it is older than six months; if it is not,
            // do not take it into account. If it is, take it into account.

            // If the transaction is a withdrawal or loan, it is taken
            // into account no matter when it was.
            bool A = accountHistory[who][j].amountIntoMountain >= 0;
            bool B = now < accountHistory[who][j].timestamp + waitingWeeks * 1 weeks;

            if(!(A && B)){
                borrowBase += accountHistory[who][j].amountIntoMountain;
            }
        }

        // Once we have the base, we multiply it by the factor
        // defined in the contract terms.
        var amountCanBorrow = borrowBase * int(multiplier);
        if(amountCanBorrow > int(this.balance)){
            throw;
        }

        return amountCanBorrow;

    }

    function invite(address newMember) mustBeFounder() {
        var status = memberStatus[newMember];
        if(status != MemberStatuses.Member && status != MemberStatuses.Invited){
            memberStatus[newMember] == MemberStatuses.Invited;
        }
    }

    function deposit() mustBeMember() {
        // Send money as value in the deposit function

        // No point in recording the history of null transactions
        if(msg.value == 0){
          return;
        }

        // Make transaction record for deposit
        accountHistory[msg.sender].push(Transaction(
          now,
          int(msg.value)
        ));

        // Update account balance for member
        accountBalance[msg.sender] += int(msg.value);

        updateAccountState(msg.sender, msg.value, false);

    }

    function withdraw(uint amount) mustBeMember() {
        // Withdraw deposits placed -- not more than what has
        // been placed in the account. This can be done at any time.

        if(amount == 0) return;

        // Check that the user has money on the account
        // And that the amount they want to withdraw is less
        // than their total balance.
        if(accountBalance[msg.sender] <= 0 || accountBalance[msg.sender] < int(amount)){
          return;
        }

        // Check that there is globally enough money on the contract
        // to make the transaction.
        if(this.balance < amount){
          return;
        }

        // Send the money
        msg.sender.send(amount);

        // Record the transaction
        accountHistory[msg.sender].push(Transaction(
          now,
          -int(amount)
        ));

        // Update the member account balance
        accountBalance[msg.sender] = accountBalance[msg.sender] - int(amount);

        updateAccountState(msg.sender, amount, true);

    }

    function loan(uint amount) mustBeMember() {
        // Withdrawl an amount that is greater than the sum
        // of deposits. Validation is more complex than for
        // simple withdrawals.

        if(amount == 0) return;

        if(this.balance < amount){
          return;
        }

        // If the amount the user wishes to borrow is greater
        // than the amount allowed, do not execute the operation
        if(int(amount) > maxBorrowAmount(msg.sender)){
            return;
        }

        // If we got to here, everything's OK, send the money.
        msg.sender.send(amount);

        // Record transaction
        accountHistory[msg.sender].push(Transaction(
          now,
          -int(amount)
        ));

        // Update account balance
        accountBalance[msg.sender] = accountBalance[msg.sender] - int(amount);

        updateAccountState(msg.sender, amount, true);

    }

    // CALLS: Read only operations

    function canWithdraw() mustBeMember() constant returns (int) {

      if(accountBalance[msg.sender] <= 0){
        return 0;
      }
      return accountBalance[msg.sender];

    }

    function canBorrow() mustBeMember() constant returns (int) {

      return maxBorrowAmount(msg.sender);

    }

}
