// SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.7.0 <0.8.0;
import "truffle/Assert.sol";
import "../contracts/FL_simulation.sol";

contract FLtest {
   
   
    FL_simulation ToTest;
    function beforeAll () public {
        ToTest = new FL_simulation();
    }
    
    function checkWeightUpdate () public {
        ToTest.updateweights(uint(12345));
        Assert.equal(ToTest.getweights(), uint(12345), "should return correct weights");
        
    }
    
}


