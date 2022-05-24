import {
  clusterApiUrl,
  Connection,
  Keypair,
  LAMPORTS_PER_SOL,
  PublicKey,
  SystemProgram,
  SYSVAR_CLOCK_PUBKEY,
  Transaction,
  TransactionInstruction,
} from "@solana/web3.js";

(async () => {
  const programId = new PublicKey(
    "77ezihTV6mTh2Uf3ggwbYF2NyGJJ5HHah1GrdowWJVD3"
  );

  const connection = new Connection(clusterApiUrl("devnet"), "confirmed");

  // Airdropping 1 SOL
  const feePayer = Keypair.generate();
  await connection.confirmTransaction(
    await connection.requestAirdrop(feePayer.publicKey, LAMPORTS_PER_SOL)
  );

  // Hello state account
  const helloAccount = Keypair.generate();

  const accountSpace = 1; // because there exists just one boolean variable
  const rentRequired = await connection.getMinimumBalanceForRentExemption(
    accountSpace
  );

  // Allocating space for hello state account
  const allocateHelloAccountIx = SystemProgram.createAccount({
    fromPubkey: feePayer.publicKey,
    lamports: rentRequired,
    newAccountPubkey: helloAccount.publicKey,
    programId: programId,
    space: accountSpace,
  });

  // Passing Clock Sys Var
  const passClockIx = new TransactionInstruction({
    programId: programId,
    keys: [
      {
        isSigner: true,
        isWritable: true,
        pubkey: feePayer.publicKey,
      },
      {
        isSigner: false,
        isWritable: true,
        pubkey: helloAccount.publicKey,
      },
      {
        isSigner: false,
        isWritable: false,
        pubkey: SYSVAR_CLOCK_PUBKEY,
      },
    ],
  });

  const transaction = new Transaction();
  transaction.add(allocateHelloAccountIx, passClockIx);

  const txHash = await connection.sendTransaction(transaction, [
    feePayer,
    helloAccount,
  ]);

  console.log(`Transaction succeeded. TxHash: ${txHash}`);
})();
