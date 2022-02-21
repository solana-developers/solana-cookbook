import { clusterApiUrl, Connection, PublicKey, Keypair, Transaction } from "@solana/web3.js";
import { createRevokeInstruction, revoke } from "@solana/spl-token";
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

  const tokenAccountPubkey = new PublicKey("DRS5CSgPQp4uvPPcUA34tckfYFNUPNBJi77fVbnSfQHr");

  // 1) use build-in function
  {
    let txhash = await revoke(
      connection, // connection
      feePayer, // payer
      tokenAccountPubkey, // token account
      alice // owner of token account
    );
    console.log(`txhash: ${txhash}`);
  }

  // or

  // 2) compose by yourself
  {
    let tx = new Transaction().add(
      createRevokeInstruction(
        tokenAccountPubkey, // token account
        alice.publicKey // owner of token account
      )
    );
    console.log(`txhash: ${await connection.sendTransaction(tx, [feePayer, alice /* fee payer + origin auth */])}`);
  }
})();
