import {
  clusterApiUrl,
  Connection,
  Keypair,
  Transaction,
  SystemProgram,
  PublicKey,
  TransactionInstruction,
  LAMPORTS_PER_SOL,
  SYSVAR_RENT_PUBKEY,
} from "@solana/web3.js";

(async () => {
  // program id
  const programId = new PublicKey(
    "7ZP42kRwUQ2zgbqXoaXzAFaiQnDyp6swNktTSv8mNQGN"
  );

  // connection
  const connection = new Connection(clusterApiUrl("devnet"), "confirmed");

  // setup fee payer
  const feePayer = Keypair.generate();
  const feePayerAirdropSignature = await connection.requestAirdrop(
    feePayer.publicKey,
    LAMPORTS_PER_SOL
  );
  await connection.confirmTransaction(feePayerAirdropSignature);

  // setup pda
  let [pda, bump] = await PublicKey.findProgramAddress(
    [feePayer.publicKey.toBuffer()],
    programId
  );
  console.log(`bump: ${bump}, pubkey: ${pda.toBase58()}`);

  const data_size = 0;

  let tx = new Transaction().add(
    new TransactionInstruction({
      keys: [
        {
          pubkey: feePayer.publicKey,
          isSigner: true,
          isWritable: true,
        },
        {
          pubkey: pda,
          isSigner: false,
          isWritable: true,
        },
        {
          pubkey: SYSVAR_RENT_PUBKEY,
          isSigner: false,
          isWritable: false,
        },
        {
          pubkey: SystemProgram.programId,
          isSigner: false,
          isWritable: false,
        },
      ],
      data: Buffer.from(new Uint8Array([data_size, bump])),
      programId: programId,
    })
  );

  console.log(`txhash: ${await connection.sendTransaction(tx, [feePayer])}`);
})();
