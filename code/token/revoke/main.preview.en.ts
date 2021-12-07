const feePayer = Keypair.fromSecretKey(bs58.decode(""));
const tokenAccount = new PublicKey("");
const tokenAccountOwner = Keypair.fromSecretKey(bs58.decode(""));

let tx = new Transaction().add(
  Token.createRevokeInstruction(
    TOKEN_PROGRAM_ID, // always TOKEN_PROGRAM_ID
    tokenAccount, // token account
    tokenAccountOwner.publicKey, // original auth
    [] // for multisig
  )
);

await connection.sendTransaction(tx, [feePayer, tokenAccountOwner]);
