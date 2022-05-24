import { Connection } from "@metaplex/js";
import { Metadata } from "@metaplex-foundation/mpl-token-metadata";
import { PublicKey } from "@solana/web3.js";

(async () => {
  const connection = new Connection("mainnet-beta");
  const tokenMint = "9ARngHhVaCtH5JFieRdSS5Y8cdZk2TMF4tfGSWFB9iSK";
  const metadataPDA = await Metadata.getPDA(new PublicKey(tokenMint));
  const tokenMetadata = await Metadata.load(connection, metadataPDA);
  console.log(tokenMetadata.data);
  /*
    MetadataData {
      key: 4,
      updateAuthority: '9uBX3ASjxWvNBAD1xjbVaKA74mWGZys3RGSF7DdeDD3F',
      mint: '9ARngHhVaCtH5JFieRdSS5Y8cdZk2TMF4tfGSWFB9iSK',
      data: MetadataDataData {
        name: 'SMB #1355',
        symbol: 'SMB',
        uri: 'https://arweave.net/3wXyF1wvK6ARJ_9ue-O58CMuXrz5nyHEiPFQ6z5q02E',
        sellerFeeBasisPoints: 500,
        creators: [ [Creator] ]
      },
      primarySaleHappened: 1,
      isMutable: 1
    }
  */
})();
