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
import { Connection, Keypair } from "@solana/web3.js";

let network = Network.DEVNET;
let network_url = "https://api.devnet.solana.com";
let UPDATE_PRICING_INTERVAL = 5000;
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

  // Update pricing on live markets
  setInterval(async function () {
    await updatePricing();
  }, UPDATE_PRICING_INTERVAL);
}

/**
 * This calls zeta's permissionless update pricing function through the Exchange object.
 * Cranks zeta's on-chain pricing ensuring all our greeks and theos are up-to-date.
 */
async function updatePricing() {
  // Get relevant expiry indices.
  for (var asset of assetList) {
    let indicesToCrank = [];
    if (!Exchange.getZetaGroup(asset).perpsOnly) {
      for (
        var i = 0;
        i < Exchange.getZetaGroupMarkets(asset).expirySeries.length;
        i++
      ) {
        let expirySeries = Exchange.getZetaGroupMarkets(asset).expirySeries[i];
        if (
          Exchange.clockTimestamp <= expirySeries.expiryTs &&
          expirySeries.strikesInitialized &&
          !expirySeries.dirty
        ) {
          indicesToCrank.push(i);
        }
      }
    } else {
      indicesToCrank.push(0);
    }
    await Promise.all(
      indicesToCrank.map(async (index) => {
        try {
          console.log(
            `[${assets.assetToName(asset)}] Update pricing index ${index}`
          );
          await Exchange.updatePricing(asset, index);
        } catch (e) {
          console.error(
            `[${assets.assetToName(
              asset
            )}] Index ${index}: Update pricing failed. ${e}`
          );
        }
      })
    );
  }
}

main().catch(console.error.bind(console));
