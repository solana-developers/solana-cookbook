import { Connection, PublicKey } from "@solana/web3.js";
import { Metaplex } from "@metaplex-foundation/js";

const insertItems = async () => {
  const connection = new Connection(
    "https://api.devnet.solana.com/",
    "confirmed"
  );
  const metaplex = new Metaplex(connection);
  const candyMachineId = new PublicKey(
    "HSZxtWx6vgGWGsWu9SouXkHA2bAKCMtMZyMKzF2dvhrR"
  );

  await metaplex.candyMachines().insertItems({
    candyMachineId,
    items: [
      { name: "My NFT #1", uri: "https://example.com/nft1" },
      { name: "My NFT #2", uri: "https://example.com/nft2" },
      { name: "My NFT #3", uri: "https://example.com/nft3" },
    ],
  });
};

insertItems();
