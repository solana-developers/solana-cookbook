const connection = new Connection("mainnet-beta");
const ownerPublickey = "OWNER_PUBLICK_KEY";
const nftsmetadata = await Metadata.findDataByOwner(connection, ownerPublickey);
console.log(nftsmetadata);
