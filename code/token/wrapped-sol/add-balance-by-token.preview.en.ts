const feePayer = Keypair.fromSecretKey(bs58.decode(""));
const funder = Keypair.fromSecretKey(bs58.decode(""));
const wrappedSOLTokenAccountPubkey = new PublicKey("");
const amount = 1 * 1e9; /* Wrapped SOL's decimals is 9 */

let auxAccount = Keypair.generate();

let tx = new Transaction().add(
  // create token account
  SystemProgram.createAccount({
    fromPubkey: funder.publicKey,
    newAccountPubkey: auxAccount.publicKey,
    space: AccountLayout.span,
    lamports: (await Token.getMinBalanceRentForExemptAccount(connection)) + amount, // rent + amount
    programId: TOKEN_PROGRAM_ID,
  }),
  // init token account
  Token.createInitAccountInstruction(TOKEN_PROGRAM_ID, NATIVE_MINT, auxAccount.publicKey, funder.publicKey),
  // transfer WSOL
  Token.createTransferInstruction(TOKEN_PROGRAM_ID, auxAccount.publicKey, wrappedSOLTokenAccountPubkey, funder.publicKey, [], amount),
  // close aux account
  Token.createCloseAccountInstruction(TOKEN_PROGRAM_ID, auxAccount.publicKey, funder.publicKey, funder.publicKey, [])
);

await connection.sendTransaction(tx, [feePayer, auxAccount, funder]);
