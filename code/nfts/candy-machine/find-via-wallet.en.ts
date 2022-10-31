import { Connection, PublicKey } from "@solana/web3.js";
import { Metaplex } from "@metaplex-foundation/js";

const findCandyMachineViaWallet = async () => {
  const connection = new Connection(
    "https://api.devnet.solana.com/",
    "confirmed"
  );
  const metaplex = new Metaplex(connection);
  const wallet = new PublicKey("9pr8wNxphx2PhBRbHKuH7YhPs5zbDuxx62UcDiayXxrw");

  const candyMachines = await metaplex.candyMachinesV2().findAllBy({
    type: "wallet",
    publicKey: wallet,
  });

  candyMachines.map((candyMachine, index) => {
    console.log(`#${index + 1} Candy Machine ID - ${candyMachine.address}`);
  });

  /**
   * #1 Candy Machine ID - HSZxtWx6vgGWGsWu9SouXkHA2bAKCMtMZyMKzF2dvhrR
   */
};

findCandyMachineViaWallet();
