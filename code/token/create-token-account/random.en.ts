import { clusterApiUrl, Connection, PublicKey, Keypair, Transaction, SystemProgram } from "@solana/web3.js";
import { Token, TOKEN_PROGRAM_ID, AccountLayout } from "@solana/spl-token";
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

  const mintPubkey = new PublicKey("54dQ8cfHsW1YfKYpmdVZhWpb9iSi6Pac82Nf7sg3bVb");

  // generate a new keypair for token account
  const tokenAccount = Keypair.generate();
  console.log(`token account: ${tokenAccount.publicKey.toBase58()}`);

  let tx = new Transaction().add(
    // create token account
    SystemProgram.createAccount({
      fromPubkey: feePayer.publicKey,
      newAccountPubkey: tokenAccount.publicKey,
      space: AccountLayout.span,
      lamports: await Token.getMinBalanceRentForExemptAccount(connection),
      programId: TOKEN_PROGRAM_ID,
    }),
    // init mint account
    Token.createInitAccountInstruction(
      TOKEN_PROGRAM_ID, // always TOKEN_PROGRAM_ID
      mintPubkey, // mint
      tokenAccount.publicKey, // token account
      alice.publicKey // owner of token account
    )
  );
  console.log(`txhash: ${await connection.sendTransaction(tx, [feePayer, tokenAccount])}`);
})();
