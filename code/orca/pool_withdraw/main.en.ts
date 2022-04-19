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
    const withdrawTokenAmount = await orcaSolPool.getLPBalance(owner.publicKey);
    const withdrawTokenMint = orcaSolPool.getPoolTokenMint();
    const { maxPoolTokenAmountIn, minTokenAOut, minTokenBOut } =
      await orcaSolPool.getWithdrawQuote(
        withdrawTokenAmount,
        withdrawTokenMint
      );
    const poolWithdrawPayload = await orcaSolPool.withdraw(
      owner,
      maxPoolTokenAmountIn,
      minTokenAOut,
      minTokenBOut
    );
    const poolWithdrawTxId = await poolWithdrawPayload.execute();
  } catch (error) {
    console.warn(error);
  }
})();
