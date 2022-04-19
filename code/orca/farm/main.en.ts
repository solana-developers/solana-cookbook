import { getOrca, OrcaFarmConfig, OrcaPoolConfig } from "@orca-so/sdk";
import { Connection, Keypair } from "@solana/web3.js";
import { readFile } from "mz/fs";
import Decimal from "decimal.js";

(async () => {
  const secretKeyString = await readFile(
    "/Users/scuba/my-wallet/my-keypair.json",
    {
      encoding: "utf8",
    }
  );
  const secretKey = Uint8Array.from(JSON.parse(secretKeyString));
  const owner = Keypair.fromSecretKey(secretKey);

  const connection = new Connection(
    "https://api.mainnet-beta.solana.com",
    "singleGossip"
  );
  const orca = getOrca(connection);
  try {
    const orcaSolPool = orca.getPool(OrcaPoolConfig.ORCA_SOL);
    const lpBalance = await orcaSolPool.getLPBalance(owner.publicKey);
    const orcaSolFarm = orca.getFarm(OrcaFarmConfig.ORCA_SOL_AQ);
    const farmDepositPayload = await orcaSolFarm.deposit(owner, lpBalance);
    const farmDepositTxId = await farmDepositPayload.execute();
  } catch (error) {
    console.warn(error);
  }
})();
