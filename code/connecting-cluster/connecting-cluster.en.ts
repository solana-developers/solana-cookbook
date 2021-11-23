import {clusterApiUrl, Connection} from "@solana/web3.js";

(async () => {
  const connection = new Connection(clusterApiUrl('mainnet-beta'), 'confirmed');
})();