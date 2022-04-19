const orcaSolFarm = orca.getFarm(OrcaFarmConfig.ORCA_SOL_AQ);
const farmBalance = await orcaSolFarm.getFarmBalance(owner.publicKey); // withdraw the entire balance
const farmWithdrawPayload = await orcaSolFarm.withdraw(owner, farmBalance);
const farmWithdrawTxId = await farmWithdrawPayload.execute();
