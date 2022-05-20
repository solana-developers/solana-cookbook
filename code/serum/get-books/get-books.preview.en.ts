let bids = await market.loadBids(connection);
for (let [price, size] of bids.getL2(20)) {
  console.log(price, size);
}

let asks = await market.loadAsks(connection);
for (let [price, size] of asks.getL2(20)) {
  console.log(price, size);
}
