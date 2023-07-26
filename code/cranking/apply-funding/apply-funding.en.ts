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
let APPLY_FUNDING_INTERVAL = 120000;
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

  // Apply funding to any users holding perp positions
  setInterval(
    async function () {
      await applyFunding();
    }.bind(this),
    APPLY_FUNDING_INTERVAL
  );
}

/**
 * Applies funding to margin accounts that have non-zero perp positions.
 * It fetches margin accounts and checks if they have non-zero perp positions.
 * If a margin account has a non-zero perp position, funding is applied to it.
 * Funding is applied separately for each asset.
 * This function breaks into multiple transactions if there are too many margin accounts to process.
 */

async function applyFunding() {
  let marginAccPubkeys: Array<any>;
  try {
    marginAccPubkeys = await utils.getAllProgramAccountAddresses(
      types.ProgramAccountType.MarginAccount
    );
  } catch (e) {
    throw Error("Account address fetch error on applyFunding()!");
  }
  for (
    let i = 0;
    i < marginAccPubkeys.length;
    i += constants.MAX_FUNDING_ACCOUNTS
  ) {
    // Grab set of margin accounts
    let marginAccounts: Array<any> = [];
    try {
      marginAccounts =
        await Exchange.program.account.marginAccount.fetchMultiple(
          marginAccPubkeys.slice(i, i + constants.MAX_FUNDING_ACCOUNTS)
        );
    } catch (e) {
      throw Error("Account data fetch error on applyFunding()!");
    }

    // In that set: Check if any have non-zero perp positions
    // If they do, apply funding on them
    let fundingAccounts = new Map<constants.Asset, PublicKey[]>();
    for (var asset of Exchange.assets) {
      fundingAccounts.set(asset, []);
    }

    for (let j = 0; j < marginAccounts.length; j++) {
      if (marginAccounts[j].perpProductLedger.position.size != 0) {
        fundingAccounts
          .get(assets.fromProgramAsset(marginAccounts[j].asset))
          .push(marginAccPubkeys[i + j]);
      }
    }

    // This will automatically break into multiple txs if there are too many
    for (var asset of Exchange.assets) {
      await utils.applyPerpFunding(asset, fundingAccounts.get(asset));
    }
  }
}

main().catch(console.error.bind(console));
