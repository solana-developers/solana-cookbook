const owner = new PublicKey("");
const mint = new PublicKey("");

let response = await connection.getParsedTokenAccountsByOwner(owner, { mint: mint });

response.value.forEach((accountInfo) => {
  console.log(`pubkey: ${accountInfo.pubkey.toBase58()}`);
  console.log(`mint: ${accountInfo.account.data["parsed"]["info"]["mint"]}`);
  console.log(`owner: ${accountInfo.account.data["parsed"]["info"]["owner"]}`);
  console.log(`decimals: ${accountInfo.account.data["parsed"]["info"]["tokenAmount"]["decimals"]}`);
  console.log(`amount: ${accountInfo.account.data["parsed"]["info"]["tokenAmount"]["amount"]}`);
  console.log("====================");
});
