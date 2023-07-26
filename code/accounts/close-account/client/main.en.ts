import {
  Keypair,
  Connection,
  Transaction,
  SystemProgram,
  TransactionInstruction,
  PublicKey,
  clusterApiUrl,
  LAMPORTS_PER_SOL,
} from "@solana/web3.js";

(async function () {
  // connection
  const connection = new Connection(clusterApiUrl("devnet"), "confirmed");

  // setup fee payer
  const feePayer = Keypair.generate();
  const feePayerAirdropSignature = await connection.requestAirdrop(
    feePayer.publicKey,
    LAMPORTS_PER_SOL
  );
  await connection.confirmTransaction(feePayerAirdropSignature);

  // remember to deploy your program first
  const programId = new PublicKey(
    "An47uBJ8kY7hzKPzDyRoFSsDHkZFY9vkfUGpTViWqLFz"
  );

  // 1. create an account to your program
  let newAccountKeypair = Keypair.generate();
  console.log(`new account: ${newAccountKeypair.publicKey.toBase58()}`);

  let createNewAccountTx = new Transaction().add(
    SystemProgram.createAccount({
      fromPubkey: feePayer.publicKey,
      newAccountPubkey: newAccountKeypair.publicKey,
      lamports: 1e8, // 0.1 SOL
      space: 10, // a random value
      programId: programId,
    })
  );
  console.log(
    `create account txhash: ${await connection.sendTransaction(
      createNewAccountTx,
      [feePayer, newAccountKeypair]
    )}`
  );

  // 2. close your account
  let closeAccountTx = new Transaction().add(
    new TransactionInstruction({
      keys: [
        {
          pubkey: newAccountKeypair.publicKey,
          isSigner: false,
          isWritable: true,
        },
        {
          pubkey: feePayer.publicKey,
          isSigner: false,
          isWritable: true,
        },
      ],
      programId: programId,
    })
  );
  console.log(
    `close account txhash: ${await connection.sendTransaction(closeAccountTx, [
      feePayer,
    ])}`
  );
})();
