const queueAccount = new OracleQueueAccount({
  program,
  publicKey: queuePubkey,
});

const aggregatorAccount = await AggregatorAccount.create(program, {
  name: Buffer.from("MY SOL/USD Feed"),
  batchSize: 1,
  minRequiredOracleResults: 1,
  minRequiredJobResults: 1,
  minUpdateDelaySeconds: 10,
  queueAccount,
  authority: authority.publicKey,
});
console.log(aggregatorAccount.publicKey.toString());
