const feePayer = Keypair.fromSecretKey(bs58.decode(""));
const mintPubkey = new PublicKey("");

// generate a new keypair for token account
const tokenAccount = Keypair.fromSecretKey(bs58.decode("")); // or Keypair.generate();

let tx = new Transaction().add(
  // create token account
  SystemProgram.createAccount({
    fromPubkey: feePayer.publicKey,
    newAccountPubkey: tokenAccount.publicKey,
    space: AccountLayout.span,
    lamports: await Token.getMinBalanceRentForExemptAccount(connection),
    programId: TOKEN_PROGRAM_ID,
  }),
  // init mint account
  Token.createInitAccountInstruction(
    TOKEN_PROGRAM_ID, // always TOKEN_PROGRAM_ID
    mintPubkey, // mint
    tokenAccount.publicKey, // token account
    alice.publicKey // owner of token account
  )
);

await connection.sendTransaction(tx, [feePayer, tokenAccount]);
