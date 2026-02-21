import {
  clusterApiUrl,
  Connection,
  Keypair,
  LAMPORTS_PER_SOL,
  PublicKey,
  StakeProgram,
  Authorized,
  sendAndConfirmTransaction,
  Lockup,
} from "@solana/web3.js";

// ---------------------------------------------------------------------------
// getStakeActivation() was removed from the Solana RPC in validator v1.18.
// This helper replicates the same result by reading stake account data
// directly via getParsedAccountInfo() and comparing epochs.
//
// Returns: { state: 'inactive' | 'activating' | 'active' | 'deactivating' }
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

  // Uninitialized or not found — treat as inactive
  if (!parsed || parsed.type === "uninitialized") {
    return { state: "inactive" };
  }

  const delegation = parsed.info?.stake?.delegation;

  // Account exists but has no delegation (e.g. just created, not yet delegated)
  if (!delegation) {
    return { state: "inactive" };
  }

  const activationEpoch = BigInt(delegation.activationEpoch);
  // deactivationEpoch is u64::MAX ("18446744073709551615") when not deactivated
  const deactivationEpoch = BigInt(delegation.deactivationEpoch);
  const U64_MAX = BigInt("18446744073709551615");

  if (deactivationEpoch < currentEpoch) {
    return { state: "inactive" };
  } else if (deactivationEpoch === currentEpoch) {
    return { state: "deactivating" };
  } else if (activationEpoch >= currentEpoch) {
    return { state: "activating" };
  } else {
    // activationEpoch < currentEpoch && deactivationEpoch === U64_MAX
    return { state: "active" };
  }
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
  const amountUserWantsToStake = LAMPORTS_PER_SOL / 2; // This can be user input. For now, we'll hardcode to 0.5 SOL
  const amountToStake = minimumRent + amountUserWantsToStake;

  // Setup a transaction to create our stake account
  // Note: `StakeProgram.createAccount` returns a `Transaction` preconfigured
  // with the necessary `TransactionInstruction`s
  const createStakeAccountTx = StakeProgram.createAccount({
    authorized: new Authorized(wallet.publicKey, wallet.publicKey),
    fromPubkey: wallet.publicKey,
    lamports: amountToStake,
    lockup: new Lockup(0, 0, wallet.publicKey),
    stakePubkey: stakeAccount.publicKey,
  });

  const createStakeAccountTxId = await sendAndConfirmTransaction(
    connection,
    createStakeAccountTx,
    [wallet, stakeAccount]
  );
  console.log(`Stake account created. Tx Id: ${createStakeAccountTxId}`);

  // Check our newly created stake account balance. This should be 0.5 SOL.
  const stakeBalance = await connection.getBalance(stakeAccount.publicKey);
  console.log(`Stake account balance: ${stakeBalance / LAMPORTS_PER_SOL} SOL`);

  // Verify the status of our stake account. This will start as inactive and
  // will take some time to activate.
  // Note: we use our own helper instead of the removed getStakeActivation() RPC method.
  const stakeStatus = await getStakeActivation(
    connection,
    stakeAccount.publicKey
  );
  console.log(`Stake account status: ${stakeStatus.state}`);

  // Fetch all stake accounts for this wallet
  const allStakeAccounts = await connection.getParsedProgramAccounts(
    StakeProgram.programId,
    {
      filters: [
        {
          memcmp: {
            offset: 12, // staker authority offset in stake account layout
            bytes: wallet.publicKey.toBase58(),
          },
        },
      ],
    }
  );

  console.log(
    `Total stake accounts for ${wallet.publicKey}: ${allStakeAccounts.length}`
  );

  if (allStakeAccounts.length) {
    console.log(`Sample:`, JSON.stringify(allStakeAccounts[0]));
  }

  // Sum total staked lamports across all accounts
  const totalStakeBalance = allStakeAccounts.reduce(
    (sum, acct) => sum + acct.account.lamports,
    0
  );
  console.log(`Total staked (lamports): ${totalStakeBalance}`);
})();
