// At anytime we can choose to deactivate our stake. Our stake account must be inactive before we can withdraw funds.
const deactivateTx = StakeProgram.deactivate({
  stakePubkey: stakeAccount.publicKey,
  authorizedPubkey: wallet.publicKey,
});
const deactivateTxId = await sendAndConfirmTransaction(
  connection,
  deactivateTx,
  [wallet]
);
console.log(`Stake account deactivated. Tx Id: ${deactivateTxId}`);

// Check in on our stake account. It should now be inactive.
stakeStatus = await connection.getStakeActivation(stakeAccount.publicKey);
console.log(`Stake account status: ${stakeStatus.state}`);
