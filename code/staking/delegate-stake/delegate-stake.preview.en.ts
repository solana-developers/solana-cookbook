// With a validator selected, we can now setup a transaction that delegates our stake to their vote account.
const delegateTx = StakeProgram.delegate({
  stakePubkey: stakeAccount.publicKey,
  authorizedPubkey: wallet.publicKey,
  votePubkey: selectedValidatorPubkey,
});

const delegateTxId = await sendAndConfirmTransaction(connection, delegateTx, [
  wallet,
]);
console.log(
  `Stake account delegated to ${selectedValidatorPubkey}. Tx Id: ${delegateTxId}`
);

// Check in on our stake account. It should now be activating.
// Note: connection.getStakeActivation() was removed in Agave 2.0.
// Use the client-side alternative from @anza-xyz/solana-rpc-get-stake-activation-v1 instead.
stakeStatus = await getStakeActivation(connection, stakeAccount.publicKey);
console.log(`Stake account status: ${stakeStatus.status}`);
