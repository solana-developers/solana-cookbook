const signature = await vrfAccount.requestRandomness({
  authority,
  payer: payerTokenWallet,
  payerAuthority: payer,
});
