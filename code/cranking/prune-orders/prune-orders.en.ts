import {
  Wallet,
  Exchange,
  Network,
  utils,
  programTypes,
  constants,
  Market,
  assets,
  types,
} from "@zetamarkets/sdk";
import { PublicKey, Connection, Keypair } from "@solana/web3.js";

let network = Network.DEVNET;
let network_url = "https://api.devnet.solana.com";
let PRUNE_EXPIRED_TIF_INTERVAL = 60000;
let DISPLAY_STATE_INTERVAL = 3000;

const NETWORK_URL = network_url!;
console.log(NETWORK_URL);
const assetList = [assets.Asset.BTC];

export async function sleep(ms: number) {
  await new Promise((resolve) => setTimeout(resolve, ms, undefined));
}

async function main() {
  // Generate a new keypair for wallet otherwise load from a private key.
  const userKey = Keypair.generate();
  const wallet = new Wallet(userKey);
  // you can load from private key if you stored key in .env file
  // Load from private_key stored in .env file.
  // const privateKey = Keypair.fromSecretKey(
  //   new Uint8Array(JSON.parse(Buffer.from(process.env.private_key).toString()))
  // );
  // const wallet = new Wallet(privateKey);
  // Create a solana web3 connection to devnet.
  const connection = new Connection(NETWORK_URL, "confirmed");
  // Airdropping SOL.
  // Only able to be done on localnet/devnet.
  // here we are using devnet
  if (network) {
    await connection.requestAirdrop(wallet.publicKey, 100000000);
  }

  const loadExchangeConfig = types.defaultLoadExchangeConfig(
    network,
    connection,
    assetList, // BTC assets in platform markets
    utils.defaultCommitment(),
    0, // ThrottleMs - increase if you are running into rate limit issues on startup.
    true
  );

  // We load the exchange with a valid wallet containing SOL to call permissionless zeta functions.
  await Exchange.load(loadExchangeConfig, wallet);

  // Display state of zeta markets
  setInterval(async function () {
    utils.displayState();
  }, DISPLAY_STATE_INTERVAL);

  // prune expires order
  setInterval(
    async function () {
      await pruneExpiredTIFOrders();
    }.bind(this),
    PRUNE_EXPIRED_TIF_INTERVAL
  );
}

/**
 * Prunes expired time-in-force (TIF) orders for all sub-exchanges.
 * It retrieves the sub-exchanges, determines the markets to prune orders from,
 * and calls the utility function to prune expired TIF orders for each market.
 */
async function pruneExpiredTIFOrders() {
  let subExchanges = Exchange.getAllSubExchanges();

  try {
    await Promise.all(
      subExchanges.map((se) => {
        return utils.pruneExpiredTIFOrders(se.asset, constants.PERP_INDEX);
      })
    );
    console.log("Pruned expired TIF orders.");
  } catch (e) {
    console.log("Failed to prune expired TIF orders.", `Error=${e}`);
  }
}

main().catch(console.error.bind(console));
