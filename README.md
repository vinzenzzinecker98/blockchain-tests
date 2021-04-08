# Evaluation of Blockchain Solutions for federated learning

## SETUP for Ubuntu 18.04
### install go-ethereum
`sudo add-apt-repository -y ppa:ethereum/ethereum`
`sudo apt-get updated`
`sudo apt-get install ethereum`

### install truffle
`sudo apt install nodejs`
`sudo apt install npm`
`sudo npm i -g --unsafe-perm=true --allow-root truffle`


`mkdir node01 node02`

### blockchain setup
make the initial accounts, however many you need by running
`geth --datadir "/home/ubuntu/workspace/node01/" account new` for each node.
Write down the public keys.

Make sure the genesis.json file is correct (allocate enough ether for all nodes that you want to make transactions from. The value given is in Gwei, not Ether, so add many zeros :=).
Then initialize the nodes by executing
`geth --datadir "/home/ubuntu/workspace/node01/" init /home/ubuntu/workspace/genesis.json` for each node.
Now you can startup a bootstrap node, this node is the "anchor" for other nodes joining the network.
Execute inside a tmux session (replace IP address):
`geth --datadir "/home/ubuntu/workspace/node01/" --networkid 15 --nat extip:193.196.38.45 --netrestrict 193.196.36.0/22 
--rpc --rpcport 30301 --rpcaddr 193.196.38.45 --rpccorsdomain "*" --rpcapi "eth,net,web3,personal,miner" --allow-insecure-unlock`

Then get bootstrap code from the JS console by running
`geth attach /home/ubuntu/workspace/node01/geth.ipc --exec admin.nodeInfo.enr` and copy it

To start node 2 inside tmux #2, replace the "enr" code with the output of the last step.
`geth --datadir "/home/ubuntu/workspace/node02/" --networkid 15 --port 30305 --bootnodes "enr:-J24QJ3JqkOL3Cw_zyJB3nc1JLPK_Ua0jaqG8eBdWlasvYxcayf-ALODzwF8a4KcL3GIjUjgHZ4D68o1jO-8tGDD16kBg2V0aMfGhBKAVMaAgmlkgnY0gmlwhMHEJi2Jc2VjcDI1NmsxoQKArwiL117MB2ExY2cMgo4pNWDYhfm9o0tAN9fQ0JMabYRzbmFwwIN0Y3CCdl-DdWRwgnZf"`

To check whether linking worked you can check admin.oeers:
`geth attach /home/ubuntu/workspace/node01/geth.ipc --exec admin.peers`

To start node 1 as signer (singning node has to be defined in the extradata field of the genesis block!):
Start the nodes JS Console by using `geth attach --datadir "/home/ubuntu/workspace/node01/geth.ipc`, then run `eth.accounts`, `eth.coinbase` and
`clique.getSnapshot()`  to compare the public addresses and see whether the signing node is defined correctly and then unlock the account for mining by running
`personal.unlockAccount(eth.accounts[0], "<password>", 0)` and start the mining process with
`miner.start()`.
Inside the tmux session of the corresponding node the minig process can be seen.




## truffle tests
Make sure the network configuration in truffle-config.js is correct. The network configuration can be inspected in the JS console by running `admin.nodeInfo` Then simply run `truffle migrate` to deploy the smart contracts and then `truffle test` to run the tests.
Important: all accounts that are used to create transactions have to be unlocked using `personal.unlockAccount` like done for node 1.

