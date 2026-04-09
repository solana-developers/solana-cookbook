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
// Note: connection.getStakeActivation() was removed in Agave 2.0.
// Use the client-side alternative from @anza-xyz/solana-rpc-get-stake-activation-v1 instead.
stakeStatus = await getStakeActivation(connection, stakeAccount.publicKey);
console.log(`Stake account status: ${stakeStatus.status}`);
