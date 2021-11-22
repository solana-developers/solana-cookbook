import {Connection, Keypair, LAMPORTS_PER_SOL} from "@solana/web3.js";

(async () => {
  const keypair = Keypair.generate();

  const connection = new Connection(
    "http://127.0.0.1:8899",
    'confirmed',
  );

  const airdropSignature = await connection.requestAirdrop(
    keypair.publicKey,
    LAMPORTS_PER_SOL,
  );

  await connection.confirmTransaction(airdropSignature);
})();