import { PublicKey, SystemProgram } from "@solana/web3.js";

(async () => {
  let basePubkey = new PublicKey(
    "G2FAbFQPFa5qKXCetoFZQEvF9BVvCKbvUZvodpVidnoY"
  );
  let seed = "robot001";
  let programId = SystemProgram.programId;

  console.log(
    `${(
      await PublicKey.createWithSeed(basePubkey, seed, programId)
    ).toBase58()}`
  );
})();
