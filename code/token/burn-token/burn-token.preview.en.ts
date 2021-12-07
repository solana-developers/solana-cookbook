const feePayer = Keypair.fromSecretKey(bs58.decode(""));
const mint = new PublicKey("");
const tokenAccount = new PublicKey("");
const tokenAccountOwner = Keypair.fromSecretKey(bs58.decode(""));

let tx = new Transaction().add(
  Token.createBurnInstruction(
    TOKEN_PROGRAM_ID, // always TOKEN_PROGRAM_ID
    mint, // mint
    tokenAccount, // from (should be a token account)
    tokenAccountOwner.publicKey, // owner of token account
    [], // for multisig account, leave empty.
    1e8 // amount, if your deciamls is 8, 10^8 for 1 token
  )
);

await connection.sendTransaction(tx, [feePayer, tokenAccountOwner]);
