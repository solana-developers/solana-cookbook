// Setup a transaction to create our stake account
// Note: `StakeProgram.createAccount` returns a `Transaction` preconfigured with the necessary `TransactionInstruction`s
const createStakeAccountTx = StakeProgram.createAccount({
  authorized: new Authorized(wallet.publicKey, wallet.publicKey), // Here we set two authorities: Stake Authority and Withdrawal Authority. Both are set to our wallet.
  fromPubkey: wallet.publicKey,
  lamports: amountToStake,
  lockup: new Lockup(0, 0, wallet.publicKey), // Optional. We'll set this to 0 for demonstration purposes.
  stakePubkey: stakeAccount.publicKey,
});

const createStakeAccountTxId = await sendAndConfirmTransaction(
  connection,
  createStakeAccountTx,
  [
    wallet,
    stakeAccount, // Since we're creating a new stake account, we have that account sign as well
  ]
);
console.log(`Stake account created. Tx Id: ${createStakeAccountTxId}`);

// Check our newly created stake account balance. This should be 0.5 SOL.
let stakeBalance = await connection.getBalance(stakeAccount.publicKey);
console.log(`Stake account balance: ${stakeBalance / LAMPORTS_PER_SOL} SOL`);

// Verify the status of our stake account. This will start as inactive and will take some time to activate.
let stakeStatus = await connection.getStakeActivation(stakeAccount.publicKey);
console.log(`Stake account status: ${stakeStatus.state}`);
