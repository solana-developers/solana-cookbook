import { performReverseLookup } from "@bonfida/spl-name-service";
import { PublicKey, Connection, clusterApiUrl } from "@solana/web3.js";

async () => {
  const connection = new Connection(clusterApiUrl("mainnet-beta"));
  // Public key of bonfida.sol
  const domainKey = new PublicKey(
    "Crf8hzfthWGbGbLTVCiqRqV5MVnbpHB1L9KQMd6gsinb"
  );

  const domainName = await performReverseLookup(connection, domainKey); // bonfida
};
