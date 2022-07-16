const orcaSolPool = orca.getPool(OrcaPoolConfig.ORCA_SOL);
const lpBalance = await orcaSolPool.getLPBalance(owner.publicKey);
const orcaSolFarm = orca.getFarm(OrcaFarmConfig.ORCA_SOL_AQ);
const farmDepositPayload = await orcaSolFarm.deposit(owner, lpBalance);
const farmDepositTxId = await farmDepositPayload.execute();
