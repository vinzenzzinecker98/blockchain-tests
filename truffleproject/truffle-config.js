module.exports = {
  // Uncommenting the defaults below 
  // provides for an easier quick-start with Ganache.
  // You can also follow this format for other networks;
  // see <http://truffleframework.com/docs/advanced/configuration>
  // for more details on how to specify configuration options!
  compilers: {
    solc: {
      version: "0.7.6"
    }
  },
  rpc: {
  host:"193.196.38.45",
  port:30301
  },
  networks: {
  //ganache test network
    development: {
      host: "193.196.38.45",
      port: 30301,
      network_id: "15",
      from:"0x7ceBe734fFe4921FbEcEec1fC5fEb4CbDf211D6B",
      gas:4600000,
      networkCheckTimeout: 10000000
    },
    //geth network (node01)
    goethereum: {
      host: "193.196.38.45",
      port: 30301,
      network_id: "15",
      from:"0x7ceBe734fFe4921FbEcEec1fC5fEb4CbDf211D6B",
      gas:4600000,
      networkCheckTimeout: 10000000
    }
  }
  
};
