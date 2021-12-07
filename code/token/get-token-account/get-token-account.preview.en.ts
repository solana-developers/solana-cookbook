const tokenAccount = new PublicKey("DRS5CSgPQp4uvPPcUA34tckfYFNUPNBJi77fVbnSfQHr");

// 1. use getParsedAccountInfo
{
  let accountInfo = await connection.getParsedAccountInfo(tokenAccount);
  console.log(`raw data: ${JSON.stringify(accountInfo.value.data["parsed"]["info"])}`);
}

// 2. use getAccountInfo then deserialize data
{
  let accountInfo = await connection.getAccountInfo(tokenAccount);
  console.log(`raw data: ${AccountLayout.decode(accountInfo.data)}`);
}
