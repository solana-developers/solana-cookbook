import { clusterApiUrl, Connection, PublicKey } from "@solana/web3.js";
import { TOKEN_PROGRAM_ID } from "@solana/spl-token";
import * as bs58 from "bs58";

(async () => {
  // connection
  const connection = new Connection(clusterApiUrl("devnet"), "confirmed");

  const owner = new PublicKey("G2FAbFQPFa5qKXCetoFZQEvF9BVvCKbvUZvodpVidnoY");
  const mint = new PublicKey("54dQ8cfHsW1YfKYpmdVZhWpb9iSi6Pac82Nf7sg3bVb");

  let response = await connection.getParsedTokenAccountsByOwner(owner, { mint: mint });

  response.value.forEach((accountInfo) => {
    console.log(`pubkey: ${accountInfo.pubkey.toBase58()}`);
    console.log(`mint: ${accountInfo.account.data["parsed"]["info"]["mint"]}`);
    console.log(`owner: ${accountInfo.account.data["parsed"]["info"]["owner"]}`);
    console.log(`decimals: ${accountInfo.account.data["parsed"]["info"]["tokenAmount"]["decimals"]}`);
    console.log(`amount: ${accountInfo.account.data["parsed"]["info"]["tokenAmount"]["amount"]}`);
    console.log("====================");
  });
})();
