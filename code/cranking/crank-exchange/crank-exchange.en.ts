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
let CRANK_EXCHANGE_INTERVAL = 5000;
let CRANK_EXCHANGE_THROTTLE_MS = 1000;
let DISPLAY_STATE_INTERVAL = 3000;
let crankingMarkets = new Array(constants.ACTIVE_MARKETS - 1).fill(false);

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

  // Crank all markets.
  setInterval(async function () {
    assetList.map(async (asset) => {
      await crankExchange(asset, true);
      // Use this instead of `crankExchange` if you wish to throttle your cranking.
      /*
              await crankExchangeThrottled(
                asset,
                true,
                CRANK_EXCHANGE_THROTTLE_MS
              );
              */
    });
  }, CRANK_EXCHANGE_INTERVAL);
}

/**
 * Retrieves the markets to be cranked for a given asset.
 * If the asset belongs to a perps-only group, returns the perp market for that asset.
 * Otherwise, returns the markets based on the specified criteria.
 * @param asset The asset for which markets are to be retrieved.
 * @param liveOnly If true, retrieves only tradeable markets; otherwise, retrieves all markets.
 * @returns An array of markets to be cranked.
 */

function getMarketsToCrank(asset: assets.Asset, liveOnly: boolean): Market[] {
  if (Exchange.getZetaGroup(asset).perpsOnly) {
    return [Exchange.getPerpMarket(asset)];
  }

  let marketsToCrank = [];

  if (liveOnly) {
    let liveExpiryIndices =
      Exchange.getZetaGroupMarkets(asset).getTradeableExpiryIndices();
    liveExpiryIndices.map(async (index) => {
      marketsToCrank.push(
        Exchange.getZetaGroupMarkets(asset).getMarketsByExpiryIndex(index)
      );
    });
    marketsToCrank = marketsToCrank.flat(1);
  } else {
    // Retrieve all markets for the asset.
    marketsToCrank = Exchange.getMarkets(asset);
  }
  return marketsToCrank;
}

/**
 * Cranks the serum dex event queue for each zeta market. This will process trades that consist of maker fills.
 * All other events are atomically processed at time of call such as taker fills and cancels.
 * Functionality here will keep track of markets that are currently being cranked, markets that have empty event queues
 * as well as allowing specification of whether only live markets are being cranked.
 * This will flush event queues completely upon call.
 * This function will poll all market event queues asynchronously so is quite expensive in terms of RPC requests per second.
 * Use crankExchangeThrottle if you are running into rate limit issues.
 */
async function crankExchange(asset: assets.Asset, liveOnly: boolean) {
  let marketsToCrank: Market[] = getMarketsToCrank(asset, liveOnly);
  marketsToCrank.map(async (market) => {
    let eventQueue = await market.serumMarket.loadEventQueue(
      Exchange.provider.connection
    );

    if (eventQueue.length > 0 && !crankingMarkets[market.marketIndex]) {
      crankingMarkets[market.marketIndex] = true;
      try {
        while (eventQueue.length != 0) {
          try {
            await utils.crankMarket(asset, market.marketIndex);
          } catch (e) {
            console.error(
              `Cranking failed on market ${market.marketIndex}, ${e}`
            );
          }

          let currLength = eventQueue.length;

          eventQueue = await market.serumMarket.loadEventQueue(
            Exchange.provider.connection
          );

          let numCranked = currLength - eventQueue.length;
          console.log(
            `[${assets.assetToName(
              asset
            )}] Cranked ${numCranked} events for market ${market.marketIndex}`
          );
        }
      } catch (e) {
        console.error(`${e}`);
      }
      crankingMarkets[market.marketIndex] = false;
    }
  });
}

/**
 * Iteratively cranks each market event queue.
 * Allows an optional argument for `throttleMs` which is the duration it will sleep after each market crank.
 */
async function crankExchangeThrottled(
  asset: assets.Asset,
  liveOnly: boolean,
  throttleMs: number
) {
  let marketsToCrank: Market[] = getMarketsToCrank(asset, liveOnly);
  for (var i = 0; i < marketsToCrank.length; i++) {
    let market = marketsToCrank[i];
    let eventQueue = await market.serumMarket.loadEventQueue(
      Exchange.provider.connection
    );
    if (eventQueue.length > 0 && !crankingMarkets[market.marketIndex]) {
      crankingMarkets[market.marketIndex] = true;
      try {
        while (eventQueue.length != 0) {
          try {
            await utils.crankMarket(asset, market.marketIndex);
          } catch (e) {
            console.error(
              `Cranking failed on market ${market.marketIndex}, ${e}`
            );
          }

          let currLength = eventQueue.length;

          eventQueue = await market.serumMarket.loadEventQueue(
            Exchange.provider.connection
          );

          let numCranked = currLength - eventQueue.length;
          console.log(
            `[${assets.assetToName(
              asset
            )}] Cranked ${numCranked} events for market ${market.marketIndex}`
          );
        }
      } catch (e) {
        console.error(`${e}`);
      }
      crankingMarkets[market.marketIndex] = false;
      await sleep(throttleMs);
    }
  }
}

main().catch(console.error.bind(console));
