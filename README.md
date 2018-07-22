### Subscription  
  
##### Setting up  
```  
download truffle ganache (test blockchain replaces test-rpc)  
npm install -g truffle   
choose parent directory for repo-clone - cd there      
git clone https://github.com/josefK128/subscription.git         
npm install   
// NOTE:as of July 20 2018 web3 1.0.0* fails to install?!   
// instead uses web3 ^0.20.6 - if necessary install 0.20.* by the following:  
// npm install web@^0.20.0    
// there is a package-web3-1.0.0beta24.json for later use of web3 ^1.0.0  
// NOTE: web3 ^1.0.0 supports websocket provider  
start ganache  
truffle compile  
truffle migrate  
(truffle test)  
```  
  
##### Run ETH/USD oracle (using CryptoCompare conversions API from https://min-api.cryptocompare.com) - when subscription is made the oracle receives a subscription.Registered event and simulates the start of a reminder service for current subscribers to renew their subscriptions  
```  
node oracle.js  
```  
  
##### Run client - shows current price ETH/USD and registers subscription(s)  
```  
node client.js  
```  
