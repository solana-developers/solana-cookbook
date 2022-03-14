const connection = new Connection("https://api.mainnet-beta.solana.com");
const from = loadWalletKey("");
const to = new PublicKey("");
const mint = new PublicKey("");
const instructions = await returnNftInstructions(from.publicKey, to, mint, connection);
const txn = await approveTransaction(from, instructions, connection);