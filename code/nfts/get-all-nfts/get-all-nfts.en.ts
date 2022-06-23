import { Connection } from "@metaplex/js";
import { Metadata } from "@metaplex-foundation/mpl-token-metadata";
import { PublicKey } from "@solana/web3.js";

(async () => {
  const connection = new Connection("mainnet-beta");
  const ownerPublickey = "OWNER_PUBLIC_KEY";
  const nftsmetadata = await Metadata.findDataByOwner(
    connection,
    ownerPublickey
  );

  console.log(nftsmetadata);
  /*
  {
    0: MetadataData {
      collection: undefined
      data: MetadataDataData {
        creators: Array(1)
          0: Creator
          address: "6FVxrqH9FFtEFo643pYx8w5GqfYRS8uWA5hZMUn1VNFr"
          share: 100
          verified: 1
          length: 1
        name: "Crimson Matt"
        sellerFeeBasisPoints: 1000
        symbol: ""
        uri: "https://arweave.net/DCGABWBYFHctLR5iWVEFhCaR3EW_AHyvk-WJV0DZ78Q"
      } 
      editionNonce: 255
      isMutable: 0
      key: 4
      mint: "HV91gRBArNUcR7fMUUuHJXbM4MaKcq3kJB89woHXyz6T"
      primarySaleHappened: 0
      tokenStandard: 3
      updateAuthority: "6FVxrqH9FFtEFo643pYx8w5GqfYRS8uWA5hZMUn1VNFr"
      uses: undefined
    },

    1: MetadataData {
      collection: undefined
      data: MetadataDataData {
        creators: Array(1)
          0: Creator
          address: "6FVxrqH9FFtEFo643pYx8w5GqfYRS8uWA5hZMUn1VNFr"
          share: 100
          verified: 1
          length: 1
        name: "Crimson Matt"
        sellerFeeBasisPoints: 1000
        symbol: ""
        uri: "https://arweave.net/DCGABWBYFHctLR5iWVEFhCaR3EW_AHyvk-WJV0DZ78Q"
      } 
      editionNonce: 255
      isMutable: 0
      key: 4
      mint: "4EK5YJRuqxiQEtrTQQZBZfnsFFza8atDxUViw6KSWA8L"
      primarySaleHappened: 0
      tokenStandard: 3
      updateAuthority: "6FVxrqH9FFtEFo643pYx8w5GqfYRS8uWA5hZMUn1VNFr"
      uses: undefined
    }
  }
  */
})();
