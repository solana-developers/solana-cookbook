const feePayer = Keypair.fromSecretKey(bs58.decode(""));
const tokenAccountPubkey = new PublicKey("");
const tokenAccountOwner = Keypair.fromSecretKey(bs58.decode(""));
const delegateToPubkey = new PublicKey("");
const amount = 1;

let tx = new Transaction().add(
  Token.createApproveInstruction(
    TOKEN_PROGRAM_ID, // always TOKEN_PROGRAM_ID
    tokenAccountPubkey, // token account
    delegateToPubkey, // delegate
    tokenAccountOwner.publicKey, // original auth
    [], // for multisig
    amount
  )
);

await connection.sendTransaction(tx, [feePayer, tokenAccountOwner]);
