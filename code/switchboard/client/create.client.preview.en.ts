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
