const FL_simulation = artifacts.require("FL_simulation");
const FL_simple = artifacts.require("FL_simple");



contract('FL_simple', (accounts) => {
  it('testing the simple contrract', async () => {

    const FLInstance = await FL_simple.deployed();

    await FLInstance.update(123, { from: accounts[0] });
    const answer = await FLInstance.retrieve()

    

    assert.equal(answer,123,"test failed")
 });

/* 


  it('should display initial weights', async () => {

    const FLInstance = await FL_simulation.deployed();
   const w = await FLInstance.updateweights(123, { from: accounts[0] });

    assert.equal(w.valueOf(), 0, "initial value was not 0"); 

    assert.equal(2,2,"test failed")
  });

  it('should call the update weights function and then retrieve the updated weights', async () => {

    const FLInstance = await FL_simulation.deployed();
    weights=12345;
    const returncode = (await FLInstance.updateweights.call(weights));

    const retrieve = (await FLInstance.getweights.call().toNumber());

    assert.equal(retrieve, weights, 'retrieved weights do not equal the weights that were put in'); 
    assert.equal(2,2,"test failed")
  }); */
 
});
