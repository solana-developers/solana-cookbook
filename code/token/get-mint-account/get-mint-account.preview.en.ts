const mint = new PublicKey("54dQ8cfHsW1YfKYpmdVZhWpb9iSi6Pac82Nf7sg3bVb");

// 1. use getParsedAccountInfo
{
  let accountInfo = await connection.getParsedAccountInfo(mint);
  console.log(`raw data: ${JSON.stringify(accountInfo.value.data["parsed"]["info"])}`);
}

// 2. use getAccountInfo then deserialize data
{
  let accountInfo = await connection.getAccountInfo(mint);
  console.log(`raw data: ${MintLayout.decode(accountInfo.data)}`);
}
