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
stakeStatus = await getStakeActivation(connection, stakeAccount.publicKey) // see full source for getStakeActivation() helper;
console.log(`Stake account status: ${stakeStatus.state}`);
