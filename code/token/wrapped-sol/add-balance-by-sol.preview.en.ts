const feePayer = Keypair.fromSecretKey(bs58.decode(""));
const funder = Keypair.fromSecretKey(bs58.decode(""));
const wrappedSOLTokenAccountPubkey = new PublicKey("");
const amount = 1 * 1e9; /* Wrapped SOL's decimals is 9 */

let tx = new Transaction().add(
  // trasnfer SOL
  SystemProgram.transfer({
    fromPubkey: funder.publicKey,
    toPubkey: wrappedSOLTokenAccountPubkey,
    lamports: amount,
  }),
  // Sync Native instruction. @solana/spl-token will release it soon. Here use the raw instruction temporally.
  new TransactionInstruction({
    keys: [
      {
        pubkey: wrappedSOLTokenAccountPubkey,
        isSigner: false,
        isWritable: true,
      },
    ],
    data: Buffer.from(new Uint8Array([17])),
    programId: TOKEN_PROGRAM_ID,
  })
);
await connection.sendTransaction(tx, [feePayer, funder]);
