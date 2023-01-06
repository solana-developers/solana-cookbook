import { Connection, PublicKey } from "@solana/web3.js";
import { Metaplex } from "@metaplex-foundation/js";

const mintNft = async () => {
  const connection = new Connection(
    "https://api.devnet.solana.com/",
    "confirmed"
  );
  const metaplex = new Metaplex(connection);
  const candyMachineId = new PublicKey(
    "HSZxtWx6vgGWGsWu9SouXkHA2bAKCMtMZyMKzF2dvhrR"
  );

  // by default, the owner of the minted nft would be `metaplex.identity().publicKey`. if you want to mint the nft to some other wallet, pass that public key along with the `newOwner` parameter
  const candyMachine = await metaplex.candyMachinesV2().mint({
    candyMachine: candyMachineId,
    // newOwner: new PublicKey("some-other-public-key");
  });
};

mintNft();
