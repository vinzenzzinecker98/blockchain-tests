const FL_simulation = artifacts.require("FL_simulation");

contract('FL_simulation', (accounts) => {

  it('should display initial weights', async () => {
    const FLInstance = await FL_simulation.deployed();
    const w = await FLInstance.getweights();

    assert.equal(w.valueOf(), 0, "initial value was not 0");
  });

  it('should call the update weights function and then retrieve the updated weights', async () => {
    const FLInstance = await FL_simulation.deployed();
    weights=12345;
    const returncode = (await FLInstance.updateweights.call(weights));

    const retrieve = (await FLInstance.getweights.call().toNumber());

    assert.equal(retrieve, weights, 'retrieved weights do not equal the weights that were put in');
  });
 
});
