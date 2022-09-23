import {
  getHashedName,
  getNameAccountKey,
  NameRegistryState,
} from "@bonfida/spl-name-service";

import { Connection, clusterApiUrl, PublicKey } from "@solana/web3.js";

(async () => {
  const domain = "levi.sol";
  const hashedName = await getHashedName(domain.replace(".sol", ""));
  const nameAccountKey = await getNameAccountKey(
    hashedName,
    undefined,
    new PublicKey("58PwtjSDuFHuUkYjH9BYnnQKHfwo9reZhC2zMJv9JPkx") // SOL TLD Authority
  );
  const owner = await NameRegistryState.retrieve(
    new Connection(clusterApiUrl("mainnet-beta")),
    nameAccountKey
  );
  console.log(owner.registry.owner.toBase58());
  // JUskoxS2PTiaBpxfGaAPgf3cUNhdeYFGMKdL6mZKKfR
})();
