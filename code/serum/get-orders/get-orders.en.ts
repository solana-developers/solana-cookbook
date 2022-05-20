import { Connection, PublicKey } from "@solana/web3.js";
import { Market } from "@project-serum/serum";

(async () => {
  let trader = new PublicKey("CuieVDEDtLo7FypA9SbLM9saXFdb1dsshEkyErMqkRQq");
  let marketAddress = new PublicKey(
    "9wFFyRfZBsuAha4YcuxcXLKwMxJR43S7fPfQLusDBzvT"
  );
  let programAddress = new PublicKey(
    "9xQeWvG816bUx9EPjHmaT23yvVM2ZWbrrpZb9PusVFin"
  );
  let connection = new Connection("https://ssc-dao.genesysgo.net", "confirmed");

  let market = await Market.load(connection, marketAddress, {}, programAddress);

  const orders = await market.loadOrdersForOwner(connection, trader);
  for (let order of orders) {
    console.log(order);
  }
})();
