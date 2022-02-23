import { clusterApiUrl, Connection, PublicKey, Keypair, Transaction } from "@solana/web3.js";
import { createTransferCheckedInstruction, TOKEN_PROGRAM_ID, transferChecked } from "@solana/spl-token";
import * as bs58 from "bs58";

(async () => {
  // connection
  const connection = new Connection(clusterApiUrl("devnet"), "confirmed");

  // 5YNmS1R9nNSCDzb5a7mMJ1dwK9uHeAAF4CmPEwKgVWr8
  const feePayer = Keypair.fromSecretKey(
    bs58.decode("588FU4PktJWfGfxtzpAAXywSNt74AvtroVzGfKkVN1LwRuvHwKGr851uH8czM5qm4iqLbs1kKoMKtMJG4ATR7Ld2")
  );

  // G2FAbFQPFa5qKXCetoFZQEvF9BVvCKbvUZvodpVidnoY
  const alice = Keypair.fromSecretKey(
    bs58.decode("4NMwxzmYj2uvHuq8xoqhY8RXg63KSVJM1DXkpbmkUY7YQWuoyQgFnnzn6yo3CMnqZasnNPNuAT2TLwQsCaKkUddp")
  );

  const mintPubkey = new PublicKey("8mAKLjGGmjKTnmcXeyr3pr7iX13xXVjJJiL6RujDbSPV");

  const tokenAccountXPubkey = new PublicKey("2XYiFjmU1pCXmC2QfEAghk6S7UADseupkNQdnRBXszD5");
  const tokenAccountYPubkey = new PublicKey("GMxZfDmpR1b3vdJYXHzdF5noVLQogZuUAsDHHQ3ytPfV");

  // 1) use build-in function
  {
    let txhash = await transferChecked(
      connection, // connection
      feePayer, // payer
      tokenAccountXPubkey, // from (should be a token account)
      mintPubkey, // mint
      tokenAccountYPubkey, // to (should be a token account)
      alice, // from's owner
      1e8, // amount, if your deciamls is 8, send 10^8 for 1 token
      8 // decimals
    );
    console.log(`txhash: ${txhash}`);
  }

  // or

  // 2) compose by yourself
  {
    let tx = new Transaction().add(
      createTransferCheckedInstruction(
        tokenAccountXPubkey, // from (should be a token account)
        mintPubkey, // mint
        tokenAccountYPubkey, // to (should be a token account)
        alice.publicKey, // from's owner
        1e8, // amount, if your deciamls is 8, send 10^8 for 1 token
        8 // decimals
      )
    );
    console.log(`txhash: ${await connection.sendTransaction(tx, [feePayer, alice /* fee payer + owner */])}`);
  }
})();
