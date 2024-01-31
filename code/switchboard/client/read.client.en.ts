import {
  clusterApiUrl,
  Connection,
  Keypair,
  LAMPORTS_PER_SOL,
} from "@solana/web3.js";
import { loadSwitchboardProgram, AggregatorAccount } from "@switchboard-xyz/switchboard-v2";

const main = async () => {
  try {
    const payer = Keypair.generate();
    const connection = new Connection(clusterApiUrl("devnet"));
    const program = await loadSwitchboardProgram("devnet", connection, payer);
    const airdropSignature = await connection.requestAirdrop(
      payer.publicKey,
      LAMPORTS_PER_SOL
    );

    await connection.confirmTransaction(airdropSignature);
    console.log("Airdrop confirmed");
    const aggregatorAccount = new AggregatorAccount({
      program: program,
      publicKey: aggregatorKey,
    });
 const result = await aggregatorAccount.getLatestValue();
 console.log("Latest value:", result.toNumber());
  } catch (error) {
    console.error("Error:", error);
  }
};
