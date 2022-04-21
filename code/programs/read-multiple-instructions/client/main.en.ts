import * as anchor from "@project-serum/anchor";
import { Program } from "@project-serum/anchor";
import { Cookbook } from "../target/types/cookbook";

describe("cookbook", () => {
  // Configure the client to use the local cluster.
  anchor.setProvider(anchor.AnchorProvider.env());

  const program = anchor.workspace.Cookbook as Program<Cookbook>;

  it("read multiple instructions from a transaction", async () => {
    // Add your test here.
    const tx = new anchor.web3.Transaction();

    const printName_ix = await program.instruction.printName("Name", {
      accounts: {},
    });

    tx.add(printName_ix);

    const printTime_ix = await program.instruction.printTime({
      accounts: {},
    });

    tx.add(printTime_ix);

    const print_random_ix = await program.instruction.printRandom({
      accounts: {
        slotHashes: anchor.web3.SYSVAR_SLOT_HASHES_PUBKEY.toString(),
        authority: program.provider.wallet.publicKey.toString(),
      },
    });

    tx.add(print_random_ix);

    await program.provider.send(tx);
  });
});
