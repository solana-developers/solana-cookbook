const feePayer = Keypair.fromSecretKey(bs58.decode(""));
const fromPukbey = new PublicKey("");
const toPubkey = new PublicKey("");
const mintPubkey = new PublicKey("");
const ownerOfFrom = Keypair.fromSecretKey(bs58.decode(""));

let tx = new Transaction().add(
  Token.createTransferCheckedInstruction(
    TOKEN_PROGRAM_ID, // always TOKEN_PROGRAM_ID
    fromPukbey, // from (should be a token account)
    mintPubkey, // mint
    toPubkey, // to (should be a token account)
    ownerOfFrom.publicKey, // owner of from
    [], // for multisig account, leave empty.
    1e8, // amount, if your deciamls is 8, send 10^8 for 1 token
    8 // decimals
  )
);

await connection.sendTransaction(tx, [feePayer, ownerOfFrom]);
