import { Connection, PublicKey } from "@solana/web3.js";
import { Market } from "@project-serum/serum";

(async () => {
  const marketAddress = new PublicKey(
    "9wFFyRfZBsuAha4YcuxcXLKwMxJR43S7fPfQLusDBzvT"
  );
  const programAddress = new PublicKey(
    "9xQeWvG816bUx9EPjHmaT23yvVM2ZWbrrpZb9PusVFin"
  );
  const connection = new Connection(
    "https://ssc-dao.genesysgo.net",
    "confirmed"
  );

  const market = await Market.load(
    connection,
    marketAddress,
    {},
    programAddress
  );
})();
