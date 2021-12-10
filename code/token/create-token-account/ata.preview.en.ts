// calculate ATA
let ata = await Token.getAssociatedTokenAddress(
  ASSOCIATED_TOKEN_PROGRAM_ID, // always ASSOCIATED_TOKEN_PROGRAM_ID
  TOKEN_PROGRAM_ID, // always TOKEN_PROGRAM_ID
  mintPubkey, // mint
  alice.publicKey // owner
);
console.log(`ATA: ${ata.toBase58()}`);

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
console.log(`txhash: ${await connection.sendTransaction(tx, [feePayer])}`);
