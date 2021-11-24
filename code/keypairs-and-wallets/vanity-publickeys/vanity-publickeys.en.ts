import { Keypair } from "@solana/web3.js";

(async () => {
  let keypair = Keypair.generate();
  while(!keypair.publicKey.toBase58().startsWith("elv1s")) {
    keypair = Keypair.generate();
  }
})();