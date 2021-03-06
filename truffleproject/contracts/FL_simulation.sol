
pragma solidity >=0.7.0 <0.8.0;



contract FL_simulation {
    
    struct Weights{
        uint ID;
        address initiator;
        uint data;
    }

    uint public ID_newestweights;
    
    Weights[] public allweights;
    constructor() {
        ID_newestweights=1;
    }


	function updateweights(uint _data) public returns(bool sufficient) {
        ID_newestweights=ID_newestweights+1;
        allweights[ID_newestweights]=Weights(
            {
                ID:ID_newestweights,
                initiator:msg.sender,
                data:_data
            }
        );
        return true;
	}

	function getweights() public view returns(uint){
		return allweights[ID_newestweights].data;
	}
}
