let totalStakeBalance = 0;
// fetch all stake account for this wallet
const allStakeAccounts = await connection.getParsedProgramAccounts(
  StakeProgram.programId,
  {
    filters: [
      {
        memcmp: {
          offset: 12, // number of bytes
          bytes: wallet.publicKey.toBase58(), // base58 encoded string
        },
      },
    ],
  }
);
console.log(`Stake accounts for wallet ${wallet.publicKey}: `);
console.log(
  `Total number of stake account for ${wallet.publicKey} is: ${allStakeAccounts.length}`
);
if (allStakeAccounts.length)
  console.log(`Sample stake account:`, JSON.stringify(allStakeAccounts[0]));
// calculating total stake amount
for (const account of allStakeAccounts) {
  totalStakeBalance += account.account.lamports;
}
// total stake amount
console.log(`Stake amount for this wallet in lamports: ${totalStakeBalance}`);
