// Factory "morphs" into a Pudding class.
// The reasoning is that calling load in each context
// is cumbersome.

(function() {

  var contract_data = {
    abi: [{"constant":false,"inputs":[{"name":"contractName","type":"bytes32"},{"name":"multiplier","type":"uint256"},{"name":"waitingWeeks","type":"uint256"},{"name":"maxLoan","type":"uint256"}],"name":"createContract","outputs":[],"type":"function"},{"constant":true,"inputs":[{"name":"","type":"address"}],"name":"contractsByFounderLength","outputs":[{"name":"","type":"uint256"}],"type":"function"},{"constant":false,"inputs":[{"name":"who","type":"address"},{"name":"contractName","type":"bytes32"},{"name":"contractAddress","type":"address"}],"name":"addContractMember","outputs":[],"type":"function"},{"constant":true,"inputs":[{"name":"","type":"address"},{"name":"","type":"uint256"}],"name":"contractsByFounder","outputs":[{"name":"contractName","type":"bytes32"},{"name":"contractAddress","type":"address"}],"type":"function"},{"constant":true,"inputs":[{"name":"","type":"address"}],"name":"contractsByMemberLength","outputs":[{"name":"","type":"uint256"}],"type":"function"},{"constant":false,"inputs":[{"name":"name","type":"bytes32"},{"name":"mountain","type":"address"}],"name":"joinMountain","outputs":[],"type":"function"},{"constant":true,"inputs":[{"name":"","type":"address"},{"name":"","type":"uint256"}],"name":"contractsByMember","outputs":[{"name":"contractName","type":"bytes32"},{"name":"contractAddress","type":"address"}],"type":"function"},{"anonymous":false,"inputs":[{"indexed":false,"name":"mountain","type":"address"}],"name":"MountainCreated","type":"event"}],
    binary: "6060604052611068806100126000396000f3606060405236156100605760e060020a600035046276173181146100625780631d52de8d14610133578063aadbc52d1461014b578063c12fb8f9146101a4578063c4279682146101ed578063e790aa9e14610205578063ed0aebbd14610315575b005b610060600435602435604435606435600060003391508585858585604051610b498061051f833901808660001916815260200185815260200184815260200183815260200182600160a060020a0316815260200195505050505050604051809103906000f0600160a060020a03831682526020829052604090912080546001810180835582818380158290116103925760020281600202836000526020600020918201910161039291905b808211156104755760008155600181018054600160a060020a031916905560020161010d565b61035e60043560016020526000908152604090205481565b6100606004356024356044355b600160a060020a038316600090815260026020526040902080546001810180835582818380158290116104bd576002028160020283600052602060002091820191016104bd919061010d565b61037060043560243560006020819052828152604090208054829081101561000257506000908152602090206002909102018054600190910154909150600160a060020a031682565b61035e60043560036020526000908152604090205481565b6100606004356024356000600082915081600160a060020a031663e7722f9b336040518260e060020a0281526004018082600160a060020a031681526020019150506020604051808303816000876161da5a03f1156100025750506040515115156001141590506105195781600160a060020a03166349df720833866040518360e060020a0281526004018083600160a060020a0316815260200182600019168152602001925050506000604051808303816000876161da5a03f1156100025750505081600160a060020a03166375d0c0dc6040518160e060020a0281526004018090506020604051808303816000876161da5a03f1156100025750506040515191506105199050338284610158565b61037060043560243560026020526000828152604090208054829081101561000257506000908152602090206002909102018054600190910154909150600160a060020a031682565b60408051918252519081900360200190f35b60408051928352600160a060020a039190911660208301528051918290030190f35b50505060009283525060408051602080852082840184528b83529181018690526002939093020189815560019081018054600160a060020a0319168617905533600160a060020a0390811680865293829052828520805490920190915581517f49df720800000000000000000000000000000000000000000000000000000000815260048101939093527f466f756e6465720000000000000000000000000000000000000000000000000060248401529051908416926349df72089260448181019391829003018183876161da5a03f11561000257505050610479338783610158565b5090565b60408051600160a060020a038316815290517faf6bb8777c79e09c5106d77363c480ab79dbbe488b4b97b194b03a4d812962269181900360200190a1505050505050565b505050600092835250602080832060408051808201825287815283018690526002939093020194855560019485018054600160a060020a03191690941790935533600160a060020a031682526003909252208054909101905550565b5050505056606060405260405160a080610b4983396101006040529051608051915160c05160e051600093845560029490945560039190915560045560018054600160a060020a031916909217909155610af090819061005990396000f3606060405236156100e55760e060020a6000350463115ce33281146100e7578063117af289146101165780631b3ed7221461011f57806328148214146101285780632e1a7d4d14610247578063365a53061461027b578063421715c2146102b057806349df7208146102df5780634b77c4681461030e5780634d853ee5146103595780635a9e75a21461036b57806364afef301461046657806375d0c0dc1461047e578063b51459fe14610487578063be0403fc146104c1578063d0e30db0146104ca578063d1c8314e146104fa578063d294cb0f14610503578063e7722f9b1461051b575b005b61054a600435600160a060020a038116600090815260056020526040812054600114156105d0575060016105d4565b61055e60075481565b61055e60025481565b6105706004356006805482908110156100025750600052600702600080516020610ad08339815191528101547ff652222313e28459528d920b65115c16c04f3efc82aaedc97be59f3f377c0d408201547ff652222313e28459528d920b65115c16c04f3efc82aaedc97be59f3f377c0d418301547ff652222313e28459528d920b65115c16c04f3efc82aaedc97be59f3f377c0d428401547ff652222313e28459528d920b65115c16c04f3efc82aaedc97be59f3f377c0d438501547ff652222313e28459528d920b65115c16c04f3efc82aaedc97be59f3f377c0d448601547ff652222313e28459528d920b65115c16c04f3efc82aaedc97be59f3f377c0d459690960154600160a060020a03959095169593949293919290919087565b6100e560043533600160a060020a0316600090815260056020526040902054600114156102785780600014156105d9575b50565b6100e560043533600160a060020a0316600090815260056020526040902054600114156102785780600014156107a157610278565b61055e33600160a060020a031660009081526005602052604081205481906001141561079d5761079733610372565b6100e5600435602435600160a060020a038216600090815260056020526040902054600114156107cd57610002565b6100e5600435600154600160a060020a0390811633909116141561027857600160a060020a038116600090815260056020526040812054141561092a57604060002060029055610278565b6105b3600154600160a060020a031681565b61055e6004355b600080808080805b600160a060020a0387166000908152600a602052604090205484101561093d5760406000908120600160a060020a03891682528054869081101561000257906000526020600020906002020160005060010154600160a060020a0389166000908152600a6020526040902080549290911315945090859081101561000257906000526020600020906002020160005054421015915082806104185750815b1561045a57600160a060020a0387166000908152600a602052604090208054859081101561000257906000526020600020906002020160005060010154909401935b6001939093019261037a565b61055e60043560056020526000908152604090205481565b61055e60005481565b61055e33600160a060020a031660009081526005602052604081205460011415610982576009602052604081205481901361096757610982565b61055e60045481565b6100e533600160a060020a0316600090815260056020526040902054600114156104f8573460001415610985575b565b61055e60035481565b61055e60043560096020526000908152604090205481565b61054a600435600160a060020a038116600090815260056020526040812054600214156105d0575060016105d4565b604080519115158252519081900360200190f35b60408051918252519081900360200190f35b60408051600160a060020a039890981688526020880196909652868601949094526060860192909252608085015260a084015260c0830152519081900360e00190f35b60408051600160a060020a03929092168252519081900360200190f35b5060005b919050565b33600160a060020a031660009081526009602052604081205413158061060457506040600020548190125b1561060e57610002565b8030600160a060020a031631101561062557610002565b60405133600160a060020a031690600090839082818181858883f1505050908152600a6020526040902080546001810180835582818380158290116106995760020281600202836000526020600020918201910161069991905b8082111561079d576000808255600182015560020161067f565b50505091909060005260206000209060020201600050604080518082018252428082526000868103602093840181905291855560019485019190915533600160a060020a03811682526009909252919091208054859003905561027892509083905b600160a060020a03831660009081526008602052604081205460068054919291839081101561000257600160a060020a0387168352600960205260409092205460079092027ff652222313e28459528d920b65115c16c04f3efc82aaedc97be59f3f377c0d4481019290925550600080516020610ad0833981519152018215610a2f576003810180548501905560008490036001820155610a41565b90508091505b5090565b8030600160a060020a03163110156107b857610002565b6107c133610372565b81131561062557610002565b600160a060020a038216600090815260056020908152604080832060019081905560068054600890945291909320829055918101808355828183801582901161087d57600083905261087d906007908102600080516020610ad0833981519152908101918402015b8082111561079d578054600160a060020a0319168155600060018201819055600282018190556003820181905560048201819055600582018190556006820155600701610835565b50505060009283525060208083206040805160e0810182523380825281850187905242828401819052606083018890526080830188905260a0830188905260c090920188905260079586029093018054600160a060020a03191690931783556001838101879055600284019190915560038301869055600483018690556005830186905560069290920195909555600160a060020a03959095168352600990529181205580549091019055565b610002565b8095505b5050505050919050565b50600254840230600160a060020a03163181131561092f5730600160a060020a0316319550610933565b5033600160a060020a03166000908152600960205260409020545b90565b33600160a060020a03166000908152600a6020526040902080546001810180835582818380158290116109d1576002028160020283600052602060002091820191016109d1919061067f565b5050506000928352506020808320604080518082018252428082523491850182905260029590950290920193845560019390930181905533600160a060020a038116855260099092529183208054830190556104f8929091906106fb565b60048101805485019055600181018490555b426002820155600680548291908490811015610002576000918252600702600080516020610ad083398151915201905081548154600160a060020a031916600160a060020a03919091161781556001828101549082015560028281015490820155600382810154908201556004828101549082015560058281015490820155600691820154910155505050505056f652222313e28459528d920b65115c16c04f3efc82aaedc97be59f3f377c0d3f",
    unlinked_binary: "6060604052611068806100126000396000f3606060405236156100605760e060020a600035046276173181146100625780631d52de8d14610133578063aadbc52d1461014b578063c12fb8f9146101a4578063c4279682146101ed578063e790aa9e14610205578063ed0aebbd14610315575b005b610060600435602435604435606435600060003391508585858585604051610b498061051f833901808660001916815260200185815260200184815260200183815260200182600160a060020a0316815260200195505050505050604051809103906000f0600160a060020a03831682526020829052604090912080546001810180835582818380158290116103925760020281600202836000526020600020918201910161039291905b808211156104755760008155600181018054600160a060020a031916905560020161010d565b61035e60043560016020526000908152604090205481565b6100606004356024356044355b600160a060020a038316600090815260026020526040902080546001810180835582818380158290116104bd576002028160020283600052602060002091820191016104bd919061010d565b61037060043560243560006020819052828152604090208054829081101561000257506000908152602090206002909102018054600190910154909150600160a060020a031682565b61035e60043560036020526000908152604090205481565b6100606004356024356000600082915081600160a060020a031663e7722f9b336040518260e060020a0281526004018082600160a060020a031681526020019150506020604051808303816000876161da5a03f1156100025750506040515115156001141590506105195781600160a060020a03166349df720833866040518360e060020a0281526004018083600160a060020a0316815260200182600019168152602001925050506000604051808303816000876161da5a03f1156100025750505081600160a060020a03166375d0c0dc6040518160e060020a0281526004018090506020604051808303816000876161da5a03f1156100025750506040515191506105199050338284610158565b61037060043560243560026020526000828152604090208054829081101561000257506000908152602090206002909102018054600190910154909150600160a060020a031682565b60408051918252519081900360200190f35b60408051928352600160a060020a039190911660208301528051918290030190f35b50505060009283525060408051602080852082840184528b83529181018690526002939093020189815560019081018054600160a060020a0319168617905533600160a060020a0390811680865293829052828520805490920190915581517f49df720800000000000000000000000000000000000000000000000000000000815260048101939093527f466f756e6465720000000000000000000000000000000000000000000000000060248401529051908416926349df72089260448181019391829003018183876161da5a03f11561000257505050610479338783610158565b5090565b60408051600160a060020a038316815290517faf6bb8777c79e09c5106d77363c480ab79dbbe488b4b97b194b03a4d812962269181900360200190a1505050505050565b505050600092835250602080832060408051808201825287815283018690526002939093020194855560019485018054600160a060020a03191690941790935533600160a060020a031682526003909252208054909101905550565b5050505056606060405260405160a080610b4983396101006040529051608051915160c05160e051600093845560029490945560039190915560045560018054600160a060020a031916909217909155610af090819061005990396000f3606060405236156100e55760e060020a6000350463115ce33281146100e7578063117af289146101165780631b3ed7221461011f57806328148214146101285780632e1a7d4d14610247578063365a53061461027b578063421715c2146102b057806349df7208146102df5780634b77c4681461030e5780634d853ee5146103595780635a9e75a21461036b57806364afef301461046657806375d0c0dc1461047e578063b51459fe14610487578063be0403fc146104c1578063d0e30db0146104ca578063d1c8314e146104fa578063d294cb0f14610503578063e7722f9b1461051b575b005b61054a600435600160a060020a038116600090815260056020526040812054600114156105d0575060016105d4565b61055e60075481565b61055e60025481565b6105706004356006805482908110156100025750600052600702600080516020610ad08339815191528101547ff652222313e28459528d920b65115c16c04f3efc82aaedc97be59f3f377c0d408201547ff652222313e28459528d920b65115c16c04f3efc82aaedc97be59f3f377c0d418301547ff652222313e28459528d920b65115c16c04f3efc82aaedc97be59f3f377c0d428401547ff652222313e28459528d920b65115c16c04f3efc82aaedc97be59f3f377c0d438501547ff652222313e28459528d920b65115c16c04f3efc82aaedc97be59f3f377c0d448601547ff652222313e28459528d920b65115c16c04f3efc82aaedc97be59f3f377c0d459690960154600160a060020a03959095169593949293919290919087565b6100e560043533600160a060020a0316600090815260056020526040902054600114156102785780600014156105d9575b50565b6100e560043533600160a060020a0316600090815260056020526040902054600114156102785780600014156107a157610278565b61055e33600160a060020a031660009081526005602052604081205481906001141561079d5761079733610372565b6100e5600435602435600160a060020a038216600090815260056020526040902054600114156107cd57610002565b6100e5600435600154600160a060020a0390811633909116141561027857600160a060020a038116600090815260056020526040812054141561092a57604060002060029055610278565b6105b3600154600160a060020a031681565b61055e6004355b600080808080805b600160a060020a0387166000908152600a602052604090205484101561093d5760406000908120600160a060020a03891682528054869081101561000257906000526020600020906002020160005060010154600160a060020a0389166000908152600a6020526040902080549290911315945090859081101561000257906000526020600020906002020160005054421015915082806104185750815b1561045a57600160a060020a0387166000908152600a602052604090208054859081101561000257906000526020600020906002020160005060010154909401935b6001939093019261037a565b61055e60043560056020526000908152604090205481565b61055e60005481565b61055e33600160a060020a031660009081526005602052604081205460011415610982576009602052604081205481901361096757610982565b61055e60045481565b6100e533600160a060020a0316600090815260056020526040902054600114156104f8573460001415610985575b565b61055e60035481565b61055e60043560096020526000908152604090205481565b61054a600435600160a060020a038116600090815260056020526040812054600214156105d0575060016105d4565b604080519115158252519081900360200190f35b60408051918252519081900360200190f35b60408051600160a060020a039890981688526020880196909652868601949094526060860192909252608085015260a084015260c0830152519081900360e00190f35b60408051600160a060020a03929092168252519081900360200190f35b5060005b919050565b33600160a060020a031660009081526009602052604081205413158061060457506040600020548190125b1561060e57610002565b8030600160a060020a031631101561062557610002565b60405133600160a060020a031690600090839082818181858883f1505050908152600a6020526040902080546001810180835582818380158290116106995760020281600202836000526020600020918201910161069991905b8082111561079d576000808255600182015560020161067f565b50505091909060005260206000209060020201600050604080518082018252428082526000868103602093840181905291855560019485019190915533600160a060020a03811682526009909252919091208054859003905561027892509083905b600160a060020a03831660009081526008602052604081205460068054919291839081101561000257600160a060020a0387168352600960205260409092205460079092027ff652222313e28459528d920b65115c16c04f3efc82aaedc97be59f3f377c0d4481019290925550600080516020610ad0833981519152018215610a2f576003810180548501905560008490036001820155610a41565b90508091505b5090565b8030600160a060020a03163110156107b857610002565b6107c133610372565b81131561062557610002565b600160a060020a038216600090815260056020908152604080832060019081905560068054600890945291909320829055918101808355828183801582901161087d57600083905261087d906007908102600080516020610ad0833981519152908101918402015b8082111561079d578054600160a060020a0319168155600060018201819055600282018190556003820181905560048201819055600582018190556006820155600701610835565b50505060009283525060208083206040805160e0810182523380825281850187905242828401819052606083018890526080830188905260a0830188905260c090920188905260079586029093018054600160a060020a03191690931783556001838101879055600284019190915560038301869055600483018690556005830186905560069290920195909555600160a060020a03959095168352600990529181205580549091019055565b610002565b8095505b5050505050919050565b50600254840230600160a060020a03163181131561092f5730600160a060020a0316319550610933565b5033600160a060020a03166000908152600960205260409020545b90565b33600160a060020a03166000908152600a6020526040902080546001810180835582818380158290116109d1576002028160020283600052602060002091820191016109d1919061067f565b5050506000928352506020808320604080518082018252428082523491850182905260029590950290920193845560019390930181905533600160a060020a038116855260099092529183208054830190556104f8929091906106fb565b60048101805485019055600181018490555b426002820155600680548291908490811015610002576000918252600702600080516020610ad083398151915201905081548154600160a060020a031916600160a060020a03919091161781556001828101549082015560028281015490820155600382810154908201556004828101549082015560058281015490820155600691820154910155505050505056f652222313e28459528d920b65115c16c04f3efc82aaedc97be59f3f377c0d3f",
    address: "0x5f5d8bfe2ff491a2ae8b38fdb6ec4cb28b905942",
    generated_with: "2.0.9",
    contract_name: "MountainFactory"
  };

  function Contract() {
    if (Contract.Pudding == null) {
      throw new Error("MountainFactory error: Please call load() first before creating new instance of this contract.");
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
      throw new Error("MountainFactory error: Please call load() first before calling new().");
    }

    return Contract.Pudding.new.apply(Contract, arguments);
  };

  Contract.at = function() {
    if (Contract.Pudding == null) {
      throw new Error("MountainFactory error: Please call load() first before calling at().");
    }

    return Contract.Pudding.at.apply(Contract, arguments);
  };

  Contract.deployed = function() {
    if (Contract.Pudding == null) {
      throw new Error("MountainFactory error: Please call load() first before calling deployed().");
    }

    return Contract.Pudding.deployed.apply(Contract, arguments);
  };

  if (typeof module != "undefined" && typeof module.exports != "undefined") {
    module.exports = Contract;
  } else {
    // There will only be one version of Pudding in the browser,
    // and we can use that.
    window.MountainFactory = Contract;
  }

})();
