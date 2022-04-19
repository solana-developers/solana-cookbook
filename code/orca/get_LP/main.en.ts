import { getOrca, OrcaFarmConfig, OrcaPoolConfig } from "@orca-so/sdk";
import { Connection, Keypair } from "@solana/web3.js";
import { readFile } from "mz/fs";
import Decimal from "decimal.js";

const main = async () => {
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
    const solToken = orcaSolPool.getTokenB();
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
    console.log("Pool deposited:", poolDepositTxId, "\n");
  } catch (error) {
    console.warn(error);
  }
};
