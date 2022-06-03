import { clusterApiUrl, Connection, Keypair, PublicKey } from "@solana/web3.js";
import * as switchboard from "@switchboard-xyz/switchboard-v2";

const payerKeypair = Keypair.generate();
const program = await switchboard.loadSwitchboardProgram(
  "devnet",
  new Connection(clusterApiUrl("devnet")),
  payerKeypair
);
const queueAccount = new switchboard.OracleQueueAccount({
  program: program,
  publicKey: new PublicKey("F8ce7MsckeZAbAGmxjJNetxYXQa9mKr9nnrC3qKubyYy"),
});

const aggregatorAccount = await switchboard.AggregatorAccount.create(program, {
  name: Buffer.from("FeedName"),
  batchSize: 6,
  minRequiredJobResults: 1,
  minRequiredOracleResults: 1,
  minUpdateDelaySeconds: 30,
  queueAccount,
});
console.log(aggregatorAccount.publicKey.toString());
