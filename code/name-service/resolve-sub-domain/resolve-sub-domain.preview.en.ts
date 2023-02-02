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
