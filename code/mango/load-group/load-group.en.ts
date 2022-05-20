import { Connection, PublicKey } from "@solana/web3.js";
import {
  IDS,
  MangoClient,
  Config,
  I80F48,
} from "@blockworks-foundation/mango-client";

(async () => {
  const cluster = "devnet";
  const group = "devnet.3";

  const config = new Config(IDS);
  const groupConfig = config.getGroup(cluster, group);
  if (!groupConfig) {
    throw new Error("unable to get mango group config");
  }
  const mangoGroupKey = groupConfig.publicKey;

  const clusterData = IDS.groups.find((g) => {
    return g.name == group && g.cluster == cluster;
  });
  const mangoProgramIdPk = new PublicKey(clusterData.mangoProgramId);

  const clusterUrl = IDS.cluster_urls[cluster];
  const connection = new Connection(clusterUrl, "singleGossip");
  const client = new MangoClient(connection, mangoProgramIdPk);
  const mangoGroup = await client.getMangoGroup(mangoGroupKey);
})();
