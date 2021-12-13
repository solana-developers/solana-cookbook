// 1. use getParsedAccountInfo
{
  let accountInfo = await connection.getParsedAccountInfo(tokenAccount);
}

// 2. use getAccountInfo then deserialize data
{
  let accountInfo = await connection.getAccountInfo(tokenAccount);
}
