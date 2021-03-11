
pragma solidity >=0.7.0 <0.8.0;


contract FL_simple{
    string data;

    function update(string memory _data) public{
        data=_data;
    }

    function retrieve() public view returns(string memory d) {
        return data;
    }
}