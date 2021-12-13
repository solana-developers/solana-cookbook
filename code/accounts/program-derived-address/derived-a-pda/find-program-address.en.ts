import { PublicKey } from "@solana/web3.js";

(async () => {
  const programId = new PublicKey("G1DCNUQTSGHehwdLCAmRyAG8hf51eCHrLNUqkgGKYASj");

  let [pda, bump] = await PublicKey.findProgramAddress([Buffer.from("test")], programId);
  console.log(`bump: ${bump}, pubkey: ${pda.toBase58()}`);
  // you will find the result is different from `createProgramAddress`.
  // It is expected because the real seed we used to calculate is ["test" + bump]
})();
