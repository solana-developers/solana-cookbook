import { Connection, PublicKey } from "@solana/web3.js";
import { Metaplex } from "@metaplex-foundation/js";

const findCandyMachineMintedNfts = async () => {
  const connection = new Connection(
    "https://api.devnet.solana.com/",
    "confirmed"
  );
  const metaplex = new Metaplex(connection);
  const candyMachineId = new PublicKey(
    "HSZxtWx6vgGWGsWu9SouXkHA2bAKCMtMZyMKzF2dvhrR"
  );

  const candyMachine = await metaplex.candyMachinesV2().findMintedNfts({
    candyMachine: candyMachineId,
  });
};

findCandyMachineMintedNfts();
