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
    const orcaSolFarm = orca.getFarm(OrcaFarmConfig.ORCA_SOL_AQ);
    const farmBalance = await orcaSolFarm.getFarmBalance(owner.publicKey); // withdraw the entire balance
    const farmWithdrawPayload = await orcaSolFarm.withdraw(owner, farmBalance);
    const farmWithdrawTxId = await farmWithdrawPayload.execute();
  } catch (error) {
    console.warn(error);
  }
})();
