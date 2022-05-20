await client.deposit(
  mangoGroup,
  mangoAccount,
  wallet?.adapter,
  mangoGroup.tokens[tokenIndex].rootBank,
  mangoGroup.rootBankAccounts[tokenIndex].nodeBankAccounts[0].publicKey,
  mangoGroup.rootBankAccounts[tokenIndex].nodeBankAccounts[0].vault,
  tokenAccount.publicKey,
  Number(4)
);
