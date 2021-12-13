import { PublicKey } from "@solana/web3.js";

(async () => {
  const programId = new PublicKey("G1DCNUQTSGHehwdLCAmRyAG8hf51eCHrLNUqkgGKYASj");

  let pda = await PublicKey.createProgramAddress([Buffer.from("test")], programId);
  console.log(pda.toBase58());

  // *failed because the result is on curve
  //     let pda = await PublicKey.createProgramAddress([Buffer.from("config")], programId);
  //     console.log(pda.toBase58());
})();
