import { Connection, PublicKey } from '@solana/web3.js';
import { Market } from '@openbook-dex/openbook';

let connection = new Connection('https://testnet.solana.com');
let marketAddress = new PublicKey('...');
let programAddress = new PublicKey('...');
let market = await Market.load(connection, marketAddress, {}, programAddress);

// Fetching orderbooks
let bids = await market.loadBids(connection);
let asks = await market.loadAsks(connection);

// L2 orderbook data
for (let [price, size] of bids.getL2(20)) {
  console.log(price, size);
}

// Full orderbook data
for (let order of asks) {
  console.log(
    order.orderId,
    order.price,
    order.size,
    order.side, // 'buy' or 'sell'
  );
}

