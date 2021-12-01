import { clusterApiUrl, Connection } from "@solana/web3.js";

(async () => {
  const connection = new Connection(clusterApiUrl("devnet"), "confirmed");

  // Get all validators, categorized by current (i.e. active) and deliquent (i.e. inactive)
  const { current, delinquent } = await connection.getVoteAccounts();
  console.log("current validators: ", current);
  console.log("all validators: ", current.concat(delinquent));
})();
