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

// ---------------------------------------------------------------------------
// getStakeActivation() was removed from the Solana RPC in validator v1.18.
// This helper replicates the same result by reading stake account data
// directly. See: https://github.com/solana-developers/solana-cookbook/issues/620
// ---------------------------------------------------------------------------
async function getStakeActivation(
  connection: Connection,
  stakeAccountPubkey: PublicKey
): Promise<{ state: string }> {
  const [epochInfo, accountInfo] = await Promise.all([
    connection.getEpochInfo(),
    connection.getParsedAccountInfo(stakeAccountPubkey),
  ]);
  const currentEpoch = BigInt(epochInfo.epoch);
  const parsed = (accountInfo.value?.data as any)?.parsed;
  if (!parsed || parsed.type === "uninitialized") return { state: "inactive" };
  const delegation = parsed.info?.stake?.delegation;
  if (!delegation) return { state: "inactive" };
  const activationEpoch = BigInt(delegation.activationEpoch);
  const deactivationEpoch = BigInt(delegation.deactivationEpoch);
  if (deactivationEpoch < currentEpoch) return { state: "inactive" };
  if (deactivationEpoch === currentEpoch) return { state: "deactivating" };
  if (activationEpoch >= currentEpoch) return { state: "activating" };
  return { state: "active" };
}


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
  let stakeStatus = await getStakeActivation(connection, stakeAccount.publicKey);
  console.log(`Stake account status: ${stakeStatus.state}`);
})();
