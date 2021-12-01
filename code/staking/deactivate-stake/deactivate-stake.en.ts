import {
  clusterApiUrl,
  Connection,
  Keypair,
  LAMPORTS_PER_SOL,
  StakeProgram,
  Authorized,
  sendAndConfirmTransaction,
  Lockup,
  PublicKey,
} from "@solana/web3.js";

(async () => {
  // Setup our connection and wallet
  const connection = new Connection(clusterApiUrl("devnet"), "confirmed");
  const wallet = Keypair.generate();

  // Fund our wallet with 1 SOL
  const airdropSignature = await connection.requestAirdrop(
    wallet.publicKey,
    LAMPORTS_PER_SOL
  );
  await connection.confirmTransaction(airdropSignature);

  // Create a keypair for our stake account
  const stakeAccount = Keypair.generate();

  // Calculate how much we want to stake
  const minimumRent = await connection.getMinimumBalanceForRentExemption(
    StakeProgram.space
  );
  const amountUserWantsToStake = LAMPORTS_PER_SOL / 2; // This is can be user input. For now, we'll hardcode to 0.5 SOL
  const amountToStake = minimumRent + amountUserWantsToStake;

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

  // To delegate our stake, we first have to select a validator. Here we get all validators and select the first active one.
  const validators = await connection.getVoteAccounts();
  const selectedValidator = validators.current[0];
  const selectedValidatorPubkey = new PublicKey(selectedValidator.votePubkey);

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
  stakeStatus = await connection.getStakeActivation(stakeAccount.publicKey);
  console.log(`Stake account status: ${stakeStatus.state}`);

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
})();
