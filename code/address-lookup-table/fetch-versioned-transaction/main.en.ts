import { Connection } from "@solana/web3.js";

// connection
const connection = new Connection("https://api.devnet.solana.com");

(async () => {
  let tx = await connection.getParsedTransaction(
    "4zZBQVkkJUKbASJoKStzsnLh8ifA8ywMXS6GqWBZeGghBiedM3ve7ujaTKniRGVekZ5DUvkVzbhxTLfCRWr3Z29N",
    { maxSupportedTransactionVersion: 0 }
  );
  console.log(JSON.stringify(tx, null, 2));
})();
