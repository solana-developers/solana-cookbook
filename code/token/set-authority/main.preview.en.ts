const feePayer = Keypair.fromSecretKey(bs58.decode(""));
const mint = new PublicKey("");
const oriAuth = Keypair.fromSecretKey(bs58.decode(""));
const newAuth = new PublicKey("");

let tx = new Transaction().add(
  Token.createSetAuthorityInstruction(
    TOKEN_PROGRAM_ID, // always TOKEN_PROGRAM_ID
    mint, // mint acocunt || token account
    newAuth, // new auth (you can pass `null` to close it)
    "MintTokens", // authority type, there are 4 types => 'MintTokens' | 'FreezeAccount' | 'AccountOwner' | 'CloseAccount'
    oriAuth.publicKey, // original auth
    [] // for multisig
  )
);

await connection.sendTransaction(tx, [feePayer, oriAuth]);
