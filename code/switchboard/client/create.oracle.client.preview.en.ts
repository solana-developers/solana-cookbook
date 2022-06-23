const queueAccount = new OracleQueueAccount({
  program,
  publicKey: queuePubkey,
});

// Create oracle
const oracleAccount = await OracleAccount.create(program, {
  name: Buffer.from("My Oracle"),
  queueAccount,
});
