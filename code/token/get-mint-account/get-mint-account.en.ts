import { clusterApiUrl, Connection, PublicKey } from "@solana/web3.js";

(async () => {
  const connection = new Connection(clusterApiUrl("devnet"), "confirmed");

  const mint = new PublicKey("54dQ8cfHsW1YfKYpmdVZhWpb9iSi6Pac82Nf7sg3bVb");

  let accountInfo = await connection.getParsedAccountInfo(mint);
  console.log(`supply: ${accountInfo.value.data["parsed"]["info"]["supply"]}`);
  console.log(`decimals: ${accountInfo.value.data["parsed"]["info"]["decimals"]}`);
  console.log(`mintAuthority: ${accountInfo.value.data["parsed"]["info"]["mintAuthority"]}`);
  console.log(`freezeAuthority: ${accountInfo.value.data["parsed"]["info"]["freezeAuthority"]}`);
})();
