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

const PAYER_KEYPAIR = Keypair.generate();

(async () => {
  const connection = new Connection(clusterApiUrl("devnet"), "confirmed");
  const programId = new PublicKey(
    "6eW5nnSosr2LpkUGCdznsjRGDhVb26tLmiM1P8RV1QQp"
  );

  // Airdop to Payer
  await connection.confirmTransaction(
    await connection.requestAirdrop(PAYER_KEYPAIR.publicKey, LAMPORTS_PER_SOL)
  );

  const [pda, bump] = await PublicKey.findProgramAddress(
    [Buffer.from("customaddress"), PAYER_KEYPAIR.publicKey.toBuffer()],
    programId
  );

  console.log(`PDA Pubkey: ${pda.toString()}`);

  const createPDAIx = new TransactionInstruction({
    programId: programId,
    data: Buffer.from(Uint8Array.of(bump)),
    keys: [
      {
        isSigner: true,
        isWritable: true,
        pubkey: PAYER_KEYPAIR.publicKey,
      },
      {
        isSigner: false,
        isWritable: true,
        pubkey: pda,
      },
      {
        isSigner: false,
        isWritable: false,
        pubkey: SystemProgram.programId,
      },
    ],
  });

  const transaction = new Transaction();
  transaction.add(createPDAIx);

  const txHash = await connection.sendTransaction(transaction, [PAYER_KEYPAIR]);
  console.log(`Created PDA successfully. Tx Hash: ${txHash}`);
})();
