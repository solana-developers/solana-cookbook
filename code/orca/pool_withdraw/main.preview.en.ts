const orcaSolPool = orca.getPool(OrcaPoolConfig.ORCA_SOL);
const withdrawTokenAmount = await orcaSolPool.getLPBalance(owner.publicKey);
const withdrawTokenMint = orcaSolPool.getPoolTokenMint();
const { maxPoolTokenAmountIn, minTokenAOut, minTokenBOut } =
  await orcaSolPool.getWithdrawQuote(withdrawTokenAmount, withdrawTokenMint);
const poolWithdrawPayload = await orcaSolPool.withdraw(
  owner,
  maxPoolTokenAmountIn,
  minTokenAOut,
  minTokenBOut
);
const poolWithdrawTxId = await poolWithdrawPayload.execute();
