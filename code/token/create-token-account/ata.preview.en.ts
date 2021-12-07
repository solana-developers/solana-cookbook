const feePayer = Keypair.fromSecretKey(bs58.decode(""));
const mintPubkey = new PublicKey("");

// calculate ATA
let ata = await Token.getAssociatedTokenAddress(
  ASSOCIATED_TOKEN_PROGRAM_ID, // always ASSOCIATED_TOKEN_PROGRAM_ID
  TOKEN_PROGRAM_ID, // always TOKEN_PROGRAM_ID
  mintPubkey, // mint
  alice.publicKey // owner
);

let tx = new Transaction().add(
  Token.createAssociatedTokenAccountInstruction(
    ASSOCIATED_TOKEN_PROGRAM_ID, // always ASSOCIATED_TOKEN_PROGRAM_ID
    TOKEN_PROGRAM_ID, // always TOKEN_PROGRAM_ID
    mintPubkey, // mint
    ata, // ata
    alice.publicKey, // owner of token account
    feePayer.publicKey // fee payer
  )
);

await connection.sendTransaction(tx, [feePayer]);
