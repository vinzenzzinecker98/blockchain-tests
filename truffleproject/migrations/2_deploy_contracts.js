const FL_simulation = artifacts.require("FL_simulation");
const FL_simple = artifacts.require("FL_simple");

module.exports = function(deployer) {
  deployer.deploy(FL_simulation);
  deployer.deploy(FL_simple)
};
