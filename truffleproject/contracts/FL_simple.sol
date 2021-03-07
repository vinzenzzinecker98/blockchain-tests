
pragma solidity >=0.7.0 <0.8.0;


contract FL_simple{
    uint public data;

    function update(uint _data) public{
        data=_data;
    }

    function retrieve() public view returns(uint d) {
        return data;
    }
}