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

### make accounts
`geth --datadir "/home/ubuntu/workspace/node01/" account new`
`geth --datadir "/home/ubuntu/workspace/node02/" account new`


start here after reset (delete all /geth files)
### initialize nodes
geth --datadir "/home/ubuntu/workspace/node01/" init /home/ubuntu/workspace/genesis.json
geth --datadir "/home/ubuntu/workspace/node02/" init /home/ubuntu/workspace/genesis.json

### startup bootstrap node (inside tmux #1)
`geth --datadir "/home/ubuntu/workspace/node01/" --networkid 15 --nat extip:193.196.38.45 --netrestrict 193.196.36.0/22 
--rpc --rpcport 30301 --rpcaddr 193.196.38.45 --rpccorsdomain "*" --rpcapi "eth,net,web3,personal,miner" --allow-insecure-unlock`

### get bootstrap code, copy it
`geth attach /home/ubuntu/workspace/node01/geth.ipc --exec admin.nodeInfo.enr`

### start node 2 (inside tmux #2) (same for any additional node!)
`geth --datadir "/home/ubuntu/workspace/node02/" --networkid 15 --port 30305 --bootnodes "enr:-J24QJ3JqkOL3Cw_zyJB3nc1JLPK_Ua0jaqG8eBdWlasvYxcayf-ALODzwF8a4KcL3GIjUjgHZ4D68o1jO-8tGDD16kBg2V0aMfGhBKAVMaAgmlkgnY0gmlwhMHEJi2Jc2VjcDI1NmsxoQKArwiL117MB2ExY2cMgo4pNWDYhfm9o0tAN9fQ0JMabYRzbmFwwIN0Y3CCdl-DdWRwgnZf"`

### to check whether linking worked
`geth attach /home/ubuntu/workspace/node02/geth.ipc --exec admin.peers`

### start node 1 as signer (singning node has to be defined in the extradata field of the genesis block!)
Start JS Console by using `geth attach --datadir "/home/ubuntu/workspace/node01/`, then run 
`clique.getSnapshot()` to see whether the signing node is defined correctly and then unlock the account
`personal.unlockAccount(eth.accounts[0], "<password>", 0)` and start the mining process
`miner.start()`
inside the tmux session the minig process can be seen.




## truffle tests
Make sure the network configuration in truffle-config.js is correct. The network configuration can be inspected in the JS console by running `admin.nodeInfo` Then simply run `truffle migrate` and then `truffle test`.

