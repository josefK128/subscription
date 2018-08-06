var OracleContract = require('./build/contracts/Subscription.json')
var contract = require('truffle-contract')
var Web3 = require('web3');
var web3 = new Web3(new Web3.providers.HttpProvider('http://localhost:7545'));


// Truffle abstraction to interact with our
// deployed contract
var oracleContract = contract(OracleContract)
oracleContract.setProvider(web3.currentProvider)

// Dirty hack for web3@1.0.0 support for localhost testrpc
// see https://github.com/trufflesuite/truffle-contract/issues/56#issuecomment-331084530
if (typeof oracleContract.currentProvider.sendAsync !== "function") {
  oracleContract.currentProvider.sendAsync = function() {
    return oracleContract.currentProvider.send.apply(
      oracleContract.currentProvider, arguments
    );
  };
}

web3.eth.getAccounts((err, accounts) => {
  oracleContract.deployed()
  .then((subscriptionContract) => {
    // Our promises
    const oraclePromises = [
      subscriptionContract.getPrice(),  // Get currently stored BTC Cap
      subscriptionContract.update({from: accounts[0]})  // Request oracle to update the information
    ]

    // Map over all promises
    Promise.all(oraclePromises)
    .then((result) => {
        if(result[0] > 0){
          console.log('ETHUSD: ' + result[0])
          console.log('subscribing...');
          subscriptionContract.subscribe('jack@gmail.com', {from: accounts[1]});
        }else{
          console.log('Request Oracle to send ETHUSD rate and subscribe to contract service - run again...')
        }
    })
    .catch((err) => {
      console.log(err)
    })
  })
  .catch((err) => {
    console.log(err)
  })
})
