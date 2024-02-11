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
let REBALANCE_INSURANCE_VAULT_INTERVAL = 20000;
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
  // )
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

  // rebalanceInsuranceVault instruction moves funds between margin accounts and the insurance vault
  setInterval(
    async function () {
      assetList.map(async (asset) => {
        await rebalanceInsuranceVault(asset);
      });
    }.bind(this),
    REBALANCE_INSURANCE_VAULT_INTERVAL
  );
}

/**
 * Rebalances the zeta vault and the insurance vault to ensure consistent platform security.
 * Checks all margin accounts for non-zero rebalance amounts and rebalances them all.
 */
async function rebalanceInsuranceVault(asset: assets.Asset) {
  let marginAccPubkeys: PublicKey[];
  try {
    marginAccPubkeys = await utils.getAllProgramAccountAddresses(
      types.ProgramAccountType.MarginAccount,
      asset
    );
  } catch (e) {
    this.alert(
      "rebalanceInsuranceVault account address fetch error",
      `Asset=${assets.assetToName(asset)} Error=${e}`
    );
  }

  for (let i = 0; i < marginAccPubkeys.length; i += MAX_ACCOUNTS_TO_FETCH) {
    let marginAccs: any[];
    try {
      marginAccs = await Exchange.program.account.marginAccount.fetchMultiple(
        marginAccPubkeys.slice(i, i + MAX_ACCOUNTS_TO_FETCH)
      );
    } catch (e) {
      this.alert(
        "rebalanceInsuranceVault margin account fetch error",
        `Asset=${assets.assetToName(asset)}, Error=${e}`
      );
    }

    let remainingAccounts: any[] = new Array();
    for (let j = 0; j < marginAccs.length; j++) {
      if (marginAccs[j].rebalanceAmount.toNumber() != 0) {
        remainingAccounts.push({
          pubkey: marginAccPubkeys[i + j],
          isSigner: false,
          isWritable: true,
        });
      }
    }
    console.log(
      `[${assets.assetToName(asset)}] [REBALANCE INSURANCE VAULT] for ${
        remainingAccounts.length
      } accounts.`
    );
    try {
      await Exchange.rebalanceInsuranceVault(asset, remainingAccounts);
    } catch (e) {
      this.alert(
        "rebalanceInsuranceVault vault error on transaction",
        `Asset=${assets.assetToName(asset)} Error=${e}`
      );
    }
  }
}

main().catch(console.error.bind(console));
