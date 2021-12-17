const connection = new Connection('mainnet-beta');
const tokenMint = '9ARngHhVaCtH5JFieRdSS5Y8cdZk2TMF4tfGSWFB9iSK';
const metadataPDA = await Metadata.getPDA(new PublicKey(tokenMint));
const tokenMetadata = await Metadata.load(connection, metadataPDA);
console.log(tokenMetadata.data);