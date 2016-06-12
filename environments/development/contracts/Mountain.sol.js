// Factory "morphs" into a Pudding class.
// The reasoning is that calling load in each context
// is cumbersome.

(function() {

  var contract_data = {
    abi: [{"constant":false,"inputs":[{"name":"member","type":"address"}],"name":"isAddressMember","outputs":[{"name":"","type":"bool"}],"type":"function"},{"constant":true,"inputs":[],"name":"memberInformationLength","outputs":[{"name":"","type":"uint256"}],"type":"function"},{"constant":false,"inputs":[{"name":"memberAddress","type":"address"},{"name":"newAmount","type":"uint256"},{"name":"withdrawal","type":"bool"}],"name":"updateAccountState","outputs":[],"type":"function"},{"constant":true,"inputs":[],"name":"multiplier","outputs":[{"name":"","type":"uint256"}],"type":"function"},{"constant":true,"inputs":[{"name":"","type":"uint256"}],"name":"memberInformation","outputs":[{"name":"memberAddress","type":"address"},{"name":"lastTransaction","type":"int256"},{"name":"lastTransactionDate","type":"uint256"},{"name":"totalOut","type":"uint256"},{"name":"totalIn","type":"uint256"},{"name":"balance","type":"int256"},{"name":"name","type":"bytes32"}],"type":"function"},{"constant":false,"inputs":[{"name":"amount","type":"uint256"}],"name":"withdraw","outputs":[],"type":"function"},{"constant":false,"inputs":[{"name":"amount","type":"uint256"}],"name":"loan","outputs":[],"type":"function"},{"constant":true,"inputs":[],"name":"canBorrow","outputs":[{"name":"","type":"int256"}],"type":"function"},{"constant":false,"inputs":[{"name":"member","type":"address"},{"name":"name","type":"bytes32"}],"name":"addMember","outputs":[],"type":"function"},{"constant":false,"inputs":[{"name":"member","type":"address"}],"name":"invite","outputs":[],"type":"function"},{"constant":true,"inputs":[],"name":"founder","outputs":[{"name":"","type":"address"}],"type":"function"},{"constant":false,"inputs":[{"name":"who","type":"address"}],"name":"maxBorrowAmount","outputs":[{"name":"","type":"int256"}],"type":"function"},{"constant":true,"inputs":[{"name":"","type":"address"}],"name":"memberStatus","outputs":[{"name":"","type":"uint256"}],"type":"function"},{"constant":true,"inputs":[],"name":"contractName","outputs":[{"name":"","type":"bytes32"}],"type":"function"},{"constant":true,"inputs":[],"name":"canWithdraw","outputs":[{"name":"","type":"int256"}],"type":"function"},{"constant":true,"inputs":[],"name":"maxLoan","outputs":[{"name":"","type":"uint256"}],"type":"function"},{"constant":false,"inputs":[],"name":"deposit","outputs":[],"type":"function"},{"constant":true,"inputs":[],"name":"waitingWeeks","outputs":[{"name":"","type":"uint256"}],"type":"function"},{"constant":true,"inputs":[{"name":"","type":"address"}],"name":"accountBalance","outputs":[{"name":"","type":"int256"}],"type":"function"},{"constant":false,"inputs":[{"name":"member","type":"address"}],"name":"isAddressInvited","outputs":[{"name":"","type":"bool"}],"type":"function"},{"inputs":[{"name":"_contractName","type":"bytes32"},{"name":"_multiplier","type":"uint256"},{"name":"_waitingWeeks","type":"uint256"},{"name":"_maxLoan","type":"uint256"},{"name":"_founder","type":"address"}],"type":"constructor"}],
    binary: "606060405260405160a080610b8d83396101006040529051608051915160c05160e051600093845560029490945560039190915560045560018054600160a060020a031916909217909155610b3490819061005990396000f3606060405236156100f05760e060020a6000350463115ce33281146100f2578063117af28914610121578063199099dc1461012a5780631b3ed722146101d357806328148214146101dc5780632e1a7d4d146102fb578063365a53061461032f578063421715c21461036457806349df7208146103915780634b77c468146103c05780634d853ee51461040b5780635a9e75a21461041d57806364afef301461045457806375d0c0dc1461046c578063b51459fe14610475578063be0403fc146104af578063d0e30db0146104b8578063d1c8314e146104e8578063d294cb0f146104f1578063e7722f9b14610509575b005b610538600435600160a060020a038116600090815260056020526040812054600114156105be575060016105c2565b61054c60075481565b6100f06004356024356044355b600160a060020a03831660009081526008602052604081205460068054919291839081101561000257600160a060020a0387168352600960205260409092205460079092027ff652222313e28459528d920b65115c16c04f3efc82aaedc97be59f3f377c0d4481019290925550600080516020610b148339815191520182156105c75760038101805485019055600084900360018201556105d9565b61054c60025481565b61055e6004356006805482908110156100025750600052600702600080516020610b148339815191528101547ff652222313e28459528d920b65115c16c04f3efc82aaedc97be59f3f377c0d408201547ff652222313e28459528d920b65115c16c04f3efc82aaedc97be59f3f377c0d418301547ff652222313e28459528d920b65115c16c04f3efc82aaedc97be59f3f377c0d428401547ff652222313e28459528d920b65115c16c04f3efc82aaedc97be59f3f377c0d438501547ff652222313e28459528d920b65115c16c04f3efc82aaedc97be59f3f377c0d448601547ff652222313e28459528d920b65115c16c04f3efc82aaedc97be59f3f377c0d459690960154600160a060020a03959095169593949293919290919087565b6100f060043533600160a060020a03166000908152600560205260409020546001141561032c578060001415610668575b50565b6100f060043533600160a060020a03166000908152600560205260409020546001141561032c57806000141561078e5761032c565b61054c33600160a060020a0316600090815260056020526040812054600114156107bd576107ba33610424565b6100f0600435602435600160a060020a038216600090815260056020526040902054600114156107c057610002565b6100f0600435600154600160a060020a0390811633909116141561032c57600160a060020a038116600090815260056020526040812054141561091d5760406000206002905561032c565b6105a1600154600160a060020a031681565b61054c6004355b600160a060020a038116600090815260096020526040812054819081908190819081908190121561093057610926565b61054c60043560056020526000908152604090205481565b61054c60005481565b61054c33600160a060020a0316600090815260056020526040812054600114156107bd5760096020526040812054819013610a4b576107bd565b61054c60045481565b6100f033600160a060020a0316600090815260056020526040902054600114156104e6573460001415610a6a575b565b61054c60035481565b61054c60043560096020526000908152604090205481565b610538600435600160a060020a038116600090815260056020526040812054600214156105be575060016105c2565b604080519115158252519081900360200190f35b60408051918252519081900360200190f35b60408051600160a060020a039890981688526020880196909652868601949094526060860192909252608085015260a084015260c0830152519081900360e00190f35b60408051600160a060020a03929092168252519081900360200190f35b5060005b919050565b60048101805485019055600181018490555b426002820155600680548291908490811015610002576000918252600702600080516020610b1483398151915201905081548154600160a060020a031916600160a060020a039190911617815560018281015490820155600282810154908201556003828101549082015560048281015490820155600582810154908201556006918201549101555050505050565b33600160a060020a031660009081526009602052604081205413158061069357506040600020548190125b1561069d57610002565b8030600160a060020a03163110156106b457610002565b60405133600160a060020a031690600090839082818181858883f1505050908152600a6020526040902080546001810180835582818380158290116107285760020281600202836000526020600020918201910161072891905b8082111561078a576000808255600182015560020161070e565b505050600092835250602080832060408051808201825242808252878703918501829052600295909502909201938455600193840182905533600160a060020a0381168652600990935290932080549390930190925561032c91908390610137565b5090565b8030600160a060020a03163110156107a557610002565b6107ae33610424565b8113156106b457610002565b90505b90565b600160a060020a0382166000908152600560209081526040808320600190819055600680546008909452919093208290559181018083558281838015829011610870576000839052610870906007908102600080516020610b14833981519152908101918402015b8082111561078a578054600160a060020a0319168155600060018201819055600282018190556003820181905560048201819055600582018190556006820155600701610828565b50505060009283525060208083206040805160e0810182523380825281850187905242828401819052606083018890526080830188905260a0830188905260c090920188905260079586029093018054600160a060020a03191690931783556001838101879055600284019190915560038301869055600483018690556005830186905560069290920195909555600160a060020a03959095168352600990529181205580549091019055565b610002565b8095505b5050505050919050565b600093505b600160a060020a0387166000908152600a6020526040902054841015610a215760406000908120600160a060020a03891682528054869081101561000257906000526020600020906002020160005060010154600160a060020a0389166000908152600a6020526040902080549290911315945090859081101561000257906000526020600020906002020160005054421015915082806109d35750815b15610a1557600160a060020a0387166000908152600a602052604090208054859081101561000257906000526020600020906002020160005060010154909401935b60019390930192610935565b50600254840230600160a060020a0316318113156109225730600160a060020a0316319550610926565b5033600160a060020a03166000908152600960205260409020546107bd565b33600160a060020a03166000908152600a602052604090208054600181018083558281838015829011610ab657600202816002028360005260206000209182019101610ab6919061070e565b5050506000928352506020808320604080518082018252428082523491850182905260029590950290920193845560019390930181905533600160a060020a038116855260099092529183208054830190556104e69290919061013756f652222313e28459528d920b65115c16c04f3efc82aaedc97be59f3f377c0d3f",
    unlinked_binary: "606060405260405160a080610b8d83396101006040529051608051915160c05160e051600093845560029490945560039190915560045560018054600160a060020a031916909217909155610b3490819061005990396000f3606060405236156100f05760e060020a6000350463115ce33281146100f2578063117af28914610121578063199099dc1461012a5780631b3ed722146101d357806328148214146101dc5780632e1a7d4d146102fb578063365a53061461032f578063421715c21461036457806349df7208146103915780634b77c468146103c05780634d853ee51461040b5780635a9e75a21461041d57806364afef301461045457806375d0c0dc1461046c578063b51459fe14610475578063be0403fc146104af578063d0e30db0146104b8578063d1c8314e146104e8578063d294cb0f146104f1578063e7722f9b14610509575b005b610538600435600160a060020a038116600090815260056020526040812054600114156105be575060016105c2565b61054c60075481565b6100f06004356024356044355b600160a060020a03831660009081526008602052604081205460068054919291839081101561000257600160a060020a0387168352600960205260409092205460079092027ff652222313e28459528d920b65115c16c04f3efc82aaedc97be59f3f377c0d4481019290925550600080516020610b148339815191520182156105c75760038101805485019055600084900360018201556105d9565b61054c60025481565b61055e6004356006805482908110156100025750600052600702600080516020610b148339815191528101547ff652222313e28459528d920b65115c16c04f3efc82aaedc97be59f3f377c0d408201547ff652222313e28459528d920b65115c16c04f3efc82aaedc97be59f3f377c0d418301547ff652222313e28459528d920b65115c16c04f3efc82aaedc97be59f3f377c0d428401547ff652222313e28459528d920b65115c16c04f3efc82aaedc97be59f3f377c0d438501547ff652222313e28459528d920b65115c16c04f3efc82aaedc97be59f3f377c0d448601547ff652222313e28459528d920b65115c16c04f3efc82aaedc97be59f3f377c0d459690960154600160a060020a03959095169593949293919290919087565b6100f060043533600160a060020a03166000908152600560205260409020546001141561032c578060001415610668575b50565b6100f060043533600160a060020a03166000908152600560205260409020546001141561032c57806000141561078e5761032c565b61054c33600160a060020a0316600090815260056020526040812054600114156107bd576107ba33610424565b6100f0600435602435600160a060020a038216600090815260056020526040902054600114156107c057610002565b6100f0600435600154600160a060020a0390811633909116141561032c57600160a060020a038116600090815260056020526040812054141561091d5760406000206002905561032c565b6105a1600154600160a060020a031681565b61054c6004355b600160a060020a038116600090815260096020526040812054819081908190819081908190121561093057610926565b61054c60043560056020526000908152604090205481565b61054c60005481565b61054c33600160a060020a0316600090815260056020526040812054600114156107bd5760096020526040812054819013610a4b576107bd565b61054c60045481565b6100f033600160a060020a0316600090815260056020526040902054600114156104e6573460001415610a6a575b565b61054c60035481565b61054c60043560096020526000908152604090205481565b610538600435600160a060020a038116600090815260056020526040812054600214156105be575060016105c2565b604080519115158252519081900360200190f35b60408051918252519081900360200190f35b60408051600160a060020a039890981688526020880196909652868601949094526060860192909252608085015260a084015260c0830152519081900360e00190f35b60408051600160a060020a03929092168252519081900360200190f35b5060005b919050565b60048101805485019055600181018490555b426002820155600680548291908490811015610002576000918252600702600080516020610b1483398151915201905081548154600160a060020a031916600160a060020a039190911617815560018281015490820155600282810154908201556003828101549082015560048281015490820155600582810154908201556006918201549101555050505050565b33600160a060020a031660009081526009602052604081205413158061069357506040600020548190125b1561069d57610002565b8030600160a060020a03163110156106b457610002565b60405133600160a060020a031690600090839082818181858883f1505050908152600a6020526040902080546001810180835582818380158290116107285760020281600202836000526020600020918201910161072891905b8082111561078a576000808255600182015560020161070e565b505050600092835250602080832060408051808201825242808252878703918501829052600295909502909201938455600193840182905533600160a060020a0381168652600990935290932080549390930190925561032c91908390610137565b5090565b8030600160a060020a03163110156107a557610002565b6107ae33610424565b8113156106b457610002565b90505b90565b600160a060020a0382166000908152600560209081526040808320600190819055600680546008909452919093208290559181018083558281838015829011610870576000839052610870906007908102600080516020610b14833981519152908101918402015b8082111561078a578054600160a060020a0319168155600060018201819055600282018190556003820181905560048201819055600582018190556006820155600701610828565b50505060009283525060208083206040805160e0810182523380825281850187905242828401819052606083018890526080830188905260a0830188905260c090920188905260079586029093018054600160a060020a03191690931783556001838101879055600284019190915560038301869055600483018690556005830186905560069290920195909555600160a060020a03959095168352600990529181205580549091019055565b610002565b8095505b5050505050919050565b600093505b600160a060020a0387166000908152600a6020526040902054841015610a215760406000908120600160a060020a03891682528054869081101561000257906000526020600020906002020160005060010154600160a060020a0389166000908152600a6020526040902080549290911315945090859081101561000257906000526020600020906002020160005054421015915082806109d35750815b15610a1557600160a060020a0387166000908152600a602052604090208054859081101561000257906000526020600020906002020160005060010154909401935b60019390930192610935565b50600254840230600160a060020a0316318113156109225730600160a060020a0316319550610926565b5033600160a060020a03166000908152600960205260409020546107bd565b33600160a060020a03166000908152600a602052604090208054600181018083558281838015829011610ab657600202816002028360005260206000209182019101610ab6919061070e565b5050506000928352506020808320604080518082018252428082523491850182905260029590950290920193845560019390930181905533600160a060020a038116855260099092529183208054830190556104e69290919061013756f652222313e28459528d920b65115c16c04f3efc82aaedc97be59f3f377c0d3f",
    address: "0x633ff0669a9523d05f5037c26ec6ad56a6794153",
    generated_with: "2.0.9",
    contract_name: "Mountain"
  };

  function Contract() {
    if (Contract.Pudding == null) {
      throw new Error("Mountain error: Please call load() first before creating new instance of this contract.");
    }

    Contract.Pudding.apply(this, arguments);
  };

  Contract.load = function(Pudding) {
    Contract.Pudding = Pudding;

    Pudding.whisk(contract_data, Contract);

    // Return itself for backwards compatibility.
    return Contract;
  }

  Contract.new = function() {
    if (Contract.Pudding == null) {
      throw new Error("Mountain error: Please call load() first before calling new().");
    }

    return Contract.Pudding.new.apply(Contract, arguments);
  };

  Contract.at = function() {
    if (Contract.Pudding == null) {
      throw new Error("Mountain error: Please call load() first before calling at().");
    }

    return Contract.Pudding.at.apply(Contract, arguments);
  };

  Contract.deployed = function() {
    if (Contract.Pudding == null) {
      throw new Error("Mountain error: Please call load() first before calling deployed().");
    }

    return Contract.Pudding.deployed.apply(Contract, arguments);
  };

  if (typeof module != "undefined" && typeof module.exports != "undefined") {
    module.exports = Contract;
  } else {
    // There will only be one version of Pudding in the browser,
    // and we can use that.
    window.Mountain = Contract;
  }

})();
