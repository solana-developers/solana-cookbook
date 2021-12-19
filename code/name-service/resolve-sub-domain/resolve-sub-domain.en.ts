import {
  getHashedName,
  getNameAccountKey,
  NameRegistryState,
  getDNSRecordAddress,
} from "@bonfida/spl-name-service";
import { Connection, clusterApiUrl, PublicKey } from "@solana/web3.js";

async () => {
  const SOL_TLD_AUTHORITY = new PublicKey(
    "58PwtjSDuFHuUkYjH9BYnnQKHfwo9reZhC2zMJv9JPkx"
  );
  const connection = new Connection(clusterApiUrl("mainnet-beta"));

  // Resolution of demo.bonfida.sol

  const parentDomain = "bonfida";
  const subDomain = "demo";

  // Step 1
  const hashedParentDomain = await getHashedName(parentDomain);
  const parentDomainKey = await getNameAccountKey(
    hashedParentDomain,
    undefined,
    SOL_TLD_AUTHORITY
  );

  // Step 2
  const subDomainKey = await getDNSRecordAddress(parentDomainKey, subDomain);

  // Step 3
  const registry = await NameRegistryState.retrieve(connection, subDomainKey);
};
