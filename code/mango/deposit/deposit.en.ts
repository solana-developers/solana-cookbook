import { useWallet } from "@solana/wallet-adapter-react";
import { Connection, PublicKey } from "@solana/web3.js";
import {
  IDS,
  MangoClient,
  Config,
  getTokenAccountsByOwnerWithWrappedSol,
} from "@blockworks-foundation/mango-client";

(async () => {
  const { wallet } = useWallet();

  const cluster = "devnet";
  const group = "devnet.3";

  const config = new Config(IDS);
  const groupConfig = config.getGroup(cluster, group);
  if (!groupConfig) {
    throw new Error("unable to get mango group config");
  }
  const mangoGroupKey = groupConfig.publicKey;

  const clusterData = IDS.groups.find((g) => {
    return g.name == group && g.cluster == cluster;
  });
  const mangoProgramIdPk = new PublicKey(clusterData.mangoProgramId);

  const clusterUrl = IDS.cluster_urls[cluster];
  const connection = new Connection(clusterUrl, "singleGossip");
  const client = new MangoClient(connection, mangoProgramIdPk);
  const mangoGroup = await client.getMangoGroup(mangoGroupKey);
  const mangoAccount = await client.createMangoAccount(
    mangoGroup,
    wallet?.adapter,
    23
  );
  const tokenAccounts = await getTokenAccountsByOwnerWithWrappedSol(
    connection,
    wallet.adapter.publicKey
  );
  const tokenAccount = tokenAccounts.find((account) =>
    account.mint.equals(
      new PublicKey("EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v")
    )
  ); // USDC mint address
  const tokenIndex = mangoGroup.getTokenIndex(tokenAccount.mint);
  await client.deposit(
    mangoGroup,
    mangoAccount,
    wallet?.adapter,
    mangoGroup.tokens[tokenIndex].rootBank,
    mangoGroup.rootBankAccounts[tokenIndex].nodeBankAccounts[0].publicKey,
    mangoGroup.rootBankAccounts[tokenIndex].nodeBankAccounts[0].vault,
    tokenAccount.publicKey,
    Number(4)
  );
})();
