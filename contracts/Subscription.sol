/*
   Subscription service contract with ETH/USD price ticker oracle.
   The contract is designed to be used by a corresponding dApp for managing 
   subscription update reminders
   This contract keeps in storage an updated ETH/USD price used for charging
   subscriptions at current ETHUSD rate, which is updated by the oracle
   every ~60 seconds
*/
pragma solidity ^0.4.24;

contract Subscription {
  // Contract owner
  address public owner;
  // current conversion rate
  uint public priceETHUSD;


  // event
  event PriceQuery();
  event Price(uint price);
  event Registered(string email, uint priceETHUSD, uint blockNumber, uint blockTimestamp);


  constructor() public {
      owner = msg.sender;
      update();
  }


  // used by oracle to send in current conversion rate priceETHUSD
  function callback(uint result) public {
      priceETHUSD = result;
      emit Price(priceETHUSD);
  }

  function update(t) public {
      // trigger event
      emit PriceQuery();
  }

  function getPrice() public view returns (uint) {
      return priceETHUSD;
  }


  function subscribe(string email) public payable{
      // <TBD>
      //require(msg.value && msg.value >= subscriptionPrice);
      //add subscriptionPrice to account balance 
      //if(msg.value > subscriptionPrice refund msg.value-subscriptionPrice
      //Thus need address of client

      // trigger event
      emit Registered(email, priceETHUSD, block.number, block.timestamp);
  }

  function kill() external {
      require(msg.sender == owner, 'only contract owner can kill the contract');
      selfdestruct(owner);
  }

}
