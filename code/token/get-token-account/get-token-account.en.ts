import { clusterApiUrl, Connection, PublicKey } from "@solana/web3.js";

(async () => {
  const connection = new Connection(clusterApiUrl("devnet"), "confirmed");

  const tokenAccount = new PublicKey("FWZedVtyKQtP4CXhT7XDnLidRADrJknmZGA2qNjpTPg8");

  let accountInfo = await connection.getParsedAccountInfo(tokenAccount);
  console.log(`mint: ${accountInfo.value.data["parsed"]["info"]["mint"]}`);
  console.log(`owner: ${accountInfo.value.data["parsed"]["info"]["owner"]}`);
  console.log(`decimals: ${accountInfo.value.data["parsed"]["info"]["tokenAmount"]["decimals"]}`);
  console.log(`amount: ${accountInfo.value.data["parsed"]["info"]["tokenAmount"]["amount"]}`);
})();
