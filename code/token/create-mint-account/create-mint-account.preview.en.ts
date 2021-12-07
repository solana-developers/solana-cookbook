const feePayer = Keypair.fromSecretKey(bs58.decode(""));
const mint = Keypair.fromSecretKey(bs58.decode("")); // or Keypair.generate();
const decimals = 8;
const mintAuthPubkey = new PublicKey("");
const freezeAuthPubkey = new PublicKey(""); // or null

let tx = new Transaction().add(
  // create mint account
  SystemProgram.createAccount({
    fromPubkey: feePayer.publicKey,
    newAccountPubkey: mint.publicKey,
    space: MintLayout.span,
    lamports: await Token.getMinBalanceRentForExemptMint(connection),
    programId: TOKEN_PROGRAM_ID,
  }),
  // init mint account
  Token.createInitMintInstruction(
    TOKEN_PROGRAM_ID, // always TOKEN_PROGRAM_ID
    mint.publicKey, // mint pubkey
    decimals, // decimals
    mintAuthPubkey, // mint authority
    freezeAuthPubkey // freeze authority (if you don't need it, you can set `null`)
  )
);

await connection.sendTransaction(tx, [feePayer, mint]);
