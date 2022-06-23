let aggregatorKey: PublicKey;
let program: Program<Idl>;

const aggregatorAccount = new switchboard.AggregatorAccount({
  program: program,
  publicKey: aggregatorKey,
});
const result: any = await aggregatorAccount.getLatestValue();
