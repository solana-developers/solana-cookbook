// Once deactivated, we can withdraw our SOL back to our main wallet
const withdrawTx = StakeProgram.withdraw({
  stakePubkey: stakeAccount.publicKey,
  authorizedPubkey: wallet.publicKey,
  toPubkey: wallet.publicKey,
  lamports: stakeBalance, // Withdraw the full balance at the time of the transaction
});

const withdrawTxId = await sendAndConfirmTransaction(connection, withdrawTx, [
  wallet,
]);
console.log(`Stake account withdrawn. Tx Id: ${withdrawTxId}`);

// Confirm that our stake account balance is now 0
stakeBalance = await connection.getBalance(stakeAccount.publicKey);
console.log(`Stake account balance: ${stakeBalance / LAMPORTS_PER_SOL} SOL`);
