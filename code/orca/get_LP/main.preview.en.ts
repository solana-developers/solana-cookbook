const orcaSolPool = orca.getPool(OrcaPoolConfig.ORCA_SOL);
const solAmount = new Decimal(0.1);
const quote = await orcaSolPool.getQuote(solToken, solAmount);
const orcaAmount = quote.getMinOutputAmount();

const { maxTokenAIn, maxTokenBIn, minPoolTokenAmountOut } =
  await orcaSolPool.getDepositQuote(orcaAmount, solAmount);
const poolDepositPayload = await orcaSolPool.deposit(
  owner,
  maxTokenAIn,
  maxTokenBIn,
  minPoolTokenAmountOut
);
const poolDepositTxId = await poolDepositPayload.execute();
