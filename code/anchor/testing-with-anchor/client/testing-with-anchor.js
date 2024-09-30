const anchor = require("@project-serum/anchor");

const { SystemProgram } = anchor.web3;

describe("testing-with-anchor", () => {
  let provider;
  let program;
  let baseAccount;

  before(async () => {
    provider = anchor.Provider.env();
    anchor.setProvider(provider);
    program = anchor.workspace.TestingWithAnchor;
    baseAccount = anchor.web3.Keypair.generate();
  });

  it("Is initialized!", async () => {
    try {
      let tx = await program.rpc.initialize(provider.wallet.publicKey, {
        accounts: {
          baseAccount: baseAccount.publicKey,
          user: provider.wallet.publicKey,
          systemProgram: SystemProgram.programId,
        },
        signers: [baseAccount],
      });
      console.log("Your transaction signature", tx);
    } catch (error) {
      console.error("Error initializing:", error);
      throw error;
    }
  });

  it("Is incrementing!", async () => {
    try {
      let account = await program.account.baseAccount.fetch(
        baseAccount.publicKey
      );
      console.log("Count is", account.count.toString());

      // Call increment!
      await program.rpc.increment({
        accounts: {
          baseAccount: baseAccount.publicKey,
          authority: provider.wallet.publicKey,
        },
      });

      let accountAfterIncrement = await program.account.baseAccount.fetch(
        baseAccount.publicKey
      );
      console.log("Count is", accountAfterIncrement.count.toString());
    } catch (error) {
      console.error("Error incrementing:", error);
      throw error;
    }
  });
});
