import {
  clusterApiUrl,
  Connection,
  Keypair,
  LAMPORTS_PER_SOL,
  PublicKey,
  SystemProgram,
  Transaction,
  TransactionInstruction,
} from "@solana/web3.js";

(async () => {
  const programId = new PublicKey(
    "4ZEdbCtb5UyCSiAMHV5eSHfyjq3QwbG3yXb6oHD7RYjk"
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

  const initIx = new TransactionInstruction({
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
    ],
  });

  const transaction = new Transaction();
  transaction.add(allocateHelloAccountIx, initIx);

  const txHash = await connection.sendTransaction(transaction, [
    feePayer,
    helloAccount,
  ]);

  console.log(`Transaction succeeded. TxHash: ${txHash}`);
})();
