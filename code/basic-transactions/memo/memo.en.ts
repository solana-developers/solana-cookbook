import {
  Connection,
  Keypair,
  SystemProgram,
  LAMPORTS_PER_SOL,
  PublicKey,
  Transaction,
  TransactionInstruction,
  sendAndConfirmTransaction
} from "@solana/web3.js";

(async () => {
  const fromKeypair = Keypair.generate();
  const toKeypair = Keypair.generate();

  const connection = new Connection(
    "https://api.devnet.solana.com",
    'confirmed',
  );

  const airdropSignature = await connection.requestAirdrop(
    fromKeypair.publicKey,
    LAMPORTS_PER_SOL,
  );

  await connection.confirmTransaction(airdropSignature);

  const lamportsToSend = 10;

  const transferTransaction = new Transaction()
    .add(SystemProgram.transfer({
      fromPubkey: fromKeypair.publicKey,
      toPubkey: toKeypair.publicKey,
      lamports: lamportsToSend
    }))

  await transferTransaction.add(
    new TransactionInstruction({
      keys: [{ pubkey: fromKeypair.publicKey, isSigner: true, isWritable: true }],
      data: Buffer.from('Data to send in transaction', 'utf-8'),
      programId: new PublicKey("MemoSq4gqABAXKb96qnH8TysNcWxMyWCqXgDLGmfcHr"),
    })
  )

  await sendAndConfirmTransaction(connection, transferTransaction, [fromKeypair]);
})();
