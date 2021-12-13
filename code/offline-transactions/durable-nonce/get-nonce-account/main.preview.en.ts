let accountInfo = await connection.getAccountInfo(nonceAccountPubkey);
let nonceAccount = NonceAccount.fromAccountData(accountInfo.data);
