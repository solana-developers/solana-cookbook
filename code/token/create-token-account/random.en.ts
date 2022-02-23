import { clusterApiUrl, Connection, PublicKey, Keypair, Transaction, SystemProgram } from "@solana/web3.js";
import {
  TOKEN_PROGRAM_ID,
  createInitializeAccountInstruction,
  getMinimumBalanceForRentExemptAccount,
  ACCOUNT_SIZE,
  createAccount,
} from "@solana/spl-token";
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

  // 1) use build-in function
  {
    const tokenAccount = Keypair.generate();
    let tokenAccountPubkey = await createAccount(
      connection, // connection
      feePayer, // fee payer
      mintPubkey, // mint
      alice.publicKey, // owner
      tokenAccount // token account (if you don't pass it, it will use ATA for you)
    );
    console.log(`token account: ${tokenAccountPubkey.toBase58()}`);
  }

  // or

  // 2) compose by yourself
  {
    const tokenAccount = Keypair.generate();
    console.log(`token account: ${tokenAccount.publicKey.toBase58()}`);

    let tx = new Transaction().add(
      // create token account
      SystemProgram.createAccount({
        fromPubkey: feePayer.publicKey,
        newAccountPubkey: tokenAccount.publicKey,
        space: ACCOUNT_SIZE,
        lamports: await getMinimumBalanceForRentExemptAccount(connection),
        programId: TOKEN_PROGRAM_ID,
      }),
      // init mint account
      createInitializeAccountInstruction(
        tokenAccount.publicKey, // token account
        mintPubkey, // mint
        alice.publicKey // owner of token account
      )
    );
    console.log(`txhash: ${await connection.sendTransaction(tx, [feePayer, tokenAccount])}`);
  }
})();
