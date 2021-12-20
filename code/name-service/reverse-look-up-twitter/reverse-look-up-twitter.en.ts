import { getTwitterRegistry } from "@bonfida/spl-name-service";
import { Connection, clusterApiUrl } from "@solana/web3.js";

async () => {
  const handle = "bonfida";
  const connection = new Connection(clusterApiUrl("mainnet-beta"));

  const registry = await getTwitterRegistry(connection, handle);
};
