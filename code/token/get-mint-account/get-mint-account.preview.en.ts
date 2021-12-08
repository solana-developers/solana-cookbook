// 1. use getParsedAccountInfo
{
  let accountInfo = await connection.getParsedAccountInfo(mint);
}

// 2. use getAccountInfo then deserialize data
{
  let accountInfo = await connection.getAccountInfo(mint);
}
