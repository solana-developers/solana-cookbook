import { Connection, PublicKey } from "@solana/web3.js";
import { Market } from "@project-serum/serum";
import {
  IDS,
  MangoClient,
  Config,
  getSpotMarketByBaseSymbol,
} from "@blockworks-foundation/mango-client";

(async () => {
  const cluster = "devnet";
  const group = "devnet.3";

  const config = new Config(IDS);
  const groupConfig = config.getGroup(cluster, group);
  if (!groupConfig) {
    throw new Error("unable to get mango group config");
  }

  const clusterUrl = IDS.cluster_urls[cluster];
  const connection = new Connection(clusterUrl, "singleGossip");
  const marketConfig = getSpotMarketByBaseSymbol(groupConfig, "SOL");
  const market = await Market.load(
    connection,
    marketConfig.publicKey,
    {},
    groupConfig.serumProgramId
  );
  const asks = await market.loadBids(connection);
})();
