const secretKeyString = await readFile(
  "/Users/scuba/my-wallet/my-keypair.json",
  {
    encoding: "utf8",
  }
);
const secretKey = Uint8Array.from(JSON.parse(secretKeyString));
const owner = Keypair.fromSecretKey(secretKey);

const connection = new Connection(
  "https://api.mainnet-beta.solana.com",
  "singleGossip"
);
const orca = getOrca(connection);
