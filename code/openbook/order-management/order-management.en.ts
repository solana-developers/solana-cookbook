import { Account, Connection, PublicKey } from '@solana/web3.js';
import { Market } from '@openbook-dex/openbook';

let connection = new Connection('https://testnet.solana.com');
let marketAddress = new PublicKey('...');
let programAddress = new PublicKey('...');
let market = await Market.load(connection, marketAddress, {}, programAddress);

// Placing orders
let owner = new Account('...');
let payer = new PublicKey('...'); // spl-token account
await market.placeOrder(connection, {
  owner,
  payer,
  side: 'buy', // 'buy' or 'sell'
  price: 123.45,
  size: 17.0,
  orderType: 'limit', // 'limit', 'ioc', 'postOnly'
});

// Retrieving open orders by owner
let myOrders = await market.loadOrdersForOwner(connection, owner.publicKey);

// Cancelling orders
for (let order of myOrders) {
  await market.cancelOrder(connection, owner, order);
}