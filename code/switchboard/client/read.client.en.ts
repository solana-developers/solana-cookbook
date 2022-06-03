import {
  clusterApiUrl,
  Connection,
  Keypair,
  PublicKey,
  LAMPORTS_PER_SOL,
} from "@solana/web3.js";
import * as switchboard from "@switchboard-xyz/switchboard-v2";
async () => {
  const payer = Keypair.generate();
  const connection = new Connection(clusterApiUrl("devnet"));
  const program = await switchboard.loadSwitchboardProgram(
    "devnet",
    connection,
    payer
  );
  const airdropSignature = await connection.requestAirdrop(
    payer.publicKey,
    LAMPORTS_PER_SOL
  );

  await connection.confirmTransaction(airdropSignature);
  console.log("here");
  const aggregatorAccount = new switchboard.AggregatorAccount({
    program: program,
    publicKey: aggregatorKey,
  });
  const result: any = await aggregatorAccount.getLatestValue();

  console.log(result.toNumber());
};
