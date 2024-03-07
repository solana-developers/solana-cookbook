import { Account, Connection, PublicKey } from '@solana/web3.js';
import { Market } from '@openbook-dex/openbook';

let connection = new Connection('https://testnet.solana.com');
let marketAddress = new PublicKey('...');
let programAddress = new PublicKey('...');
let market = await Market.load(connection, marketAddress, {}, programAddress);
let owner = new Account('...');

// Retrieving fills
for (let fill of await market.loadFills(connection)) {
    console.log(fill.orderId, fill.price, fill.size, fill.side);
  }
  
  // Settle funds
  for (let openOrders of await market.findOpenOrdersAccountsForOwner(
    connection,
    owner.publicKey,
  )) {
    if (openOrders.baseTokenFree > 0 || openOrders.quoteTokenFree > 0) {
      // spl-token accounts to which to send the proceeds from trades
      let baseTokenAccount = new PublicKey('...');
      let quoteTokenAccount = new PublicKey('...');
  
      await market.settleFunds(
        connection,
        owner,
        openOrders,
        baseTokenAccount,
        quoteTokenAccount,
      );
    }
  }