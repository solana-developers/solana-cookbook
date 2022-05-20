import { Connection, PublicKey } from "@solana/web3.js";
import { Market } from "@project-serum/serum";

(async () => {
  let marketAddress = new PublicKey(
    "9wFFyRfZBsuAha4YcuxcXLKwMxJR43S7fPfQLusDBzvT"
  );
  let programAddress = new PublicKey(
    "9xQeWvG816bUx9EPjHmaT23yvVM2ZWbrrpZb9PusVFin"
  );
  let connection = new Connection("https://ssc-dao.genesysgo.net", "confirmed");

  let market = await Market.load(connection, marketAddress, {}, programAddress);

  let bids = await market.loadBids(connection);
  for (let [price, size] of bids.getL2(20)) {
    console.log(price, size);
  }

  let asks = await market.loadAsks(connection);
  for (let [price, size] of asks.getL2(20)) {
    console.log(price, size);
  }
})();
