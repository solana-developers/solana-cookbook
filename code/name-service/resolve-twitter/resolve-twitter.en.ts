import { PublicKey, clusterApiUrl, Connection } from "@solana/web3.js";
import { getHandleAndRegistryKey } from "@bonfida/spl-name-service";

async () => {
  const connection = new Connection(clusterApiUrl("mainnet-beta"));
  // Pubkey of the wallet you want to retrieve the Twitter handle
  const pubkey = new PublicKey("FidaeBkZkvDqi1GXNEwB8uWmj9Ngx2HXSS5nyGRuVFcZ");

  const [handle, registryKey] = await getHandleAndRegistryKey(
    connection,
    pubkey
  );
};
