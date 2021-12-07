const feePayer = Keypair.fromSecretKey(bs58.decode(""));
const tokenAccountPubkey = new PublicKey("");
const tokenAccountOwner = Keypair.fromSecretKey(bs58.decode(""));
const destinationPubkey = new PublicKey("");

let tx = new Transaction().add(
  Token.createCloseAccountInstruction(
    TOKEN_PROGRAM_ID, // always TOKEN_PROGRAM_ID
    tokenAccountPubkey, // token account which you want to close
    destinationPubkey, // destination
    tokenAccountOwner.publicKey, // owner of token account
    [] // for multisig
  )
);

await connection.sendTransaction(tx, [feePayer, tokenAccountOwner]);
