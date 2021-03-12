const FL_simulation = artifacts.require("FL_simulation");
const FL_simple = artifacts.require("FL_simple");
const CryptoJS = require("crypto-js");



const rounds = 1;
const numberaccounts = 1;

var realanswer="seed"
for (i = 0; i < rounds; i++) {
  for (account = 0; account < numberaccounts; account++) {
    realanswer=CryptoJS.SHA256(realanswer).toString(CryptoJS.enc.Hex);
    
  }
}

contract('FL_simple', (accounts) => {
  it('FL Run', async () => {

    const FLInstance = await FL_simple.deployed();
    var i;
    var account;
    var answer;
    //initiate:
    await FLInstance.update("seed", { from: accounts[0] });

    for (i = 0; i < rounds; i++) {
      for (account = 0; account < numberaccounts; account++) {
        answer = await FLInstance.retrieve()

        answer = CryptoJS.SHA256(answer).toString(CryptoJS.enc.Hex)
        
        await FLInstance.update(answer, { from: accounts[account] });

      }
    }

   
    assert.equal(answer, realanswer, "test failed")
  });
});
