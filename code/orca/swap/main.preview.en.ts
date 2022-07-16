const orcaSolPool = orca.getPool(OrcaPoolConfig.ORCA_SOL);
const solToken = orcaSolPool.getTokenB();
const solAmount = new Decimal(0.1);
const quote = await orcaSolPool.getQuote(solToken, solAmount);
const orcaAmount = quote.getMinOutputAmount();

const swapPayload = await orcaSolPool.swap(
  owner,
  solToken,
  solAmount,
  orcaAmount
);
const swapTxId = await swapPayload.execute();
