const connection = new Connection("https://api.mainnet-beta.solana.com");
const tokenMint = "9ARngHhVaCtH5JFieRdSS5Y8cdZk2TMF4tfGSWFB9iSK";
const largestAccounts = await connection.getTokenLargestAccounts(
  new PublicKey(tokenMint)
);
const largestAccountInfo = await connection.getParsedAccountInfo(
  largestAccounts.value[0].address
);
console.log(largestAccountInfo.value.data.parsed.info.owner);
