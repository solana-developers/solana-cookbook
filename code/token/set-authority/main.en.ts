import { clusterApiUrl, Connection, PublicKey, Keypair, Transaction } from "@solana/web3.js";
import { AuthorityType, createSetAuthorityInstruction, setAuthority, TOKEN_PROGRAM_ID } from "@solana/spl-token";
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

  const randomGuy = Keypair.generate();
  console.log(`random guy: ${randomGuy.publicKey.toBase58()}`);

  const mintPubkey = new PublicKey("8mAKLjGGmjKTnmcXeyr3pr7iX13xXVjJJiL6RujDbSPV");

  // authority type

  // 1) for mint account
  // AuthorityType.MintTokens
  // AuthorityType.FreezeAccount

  // 2) for token account
  // AuthorityType.AccountOwner
  // AuthorityType.CloseAccount

  // 1) use build-in function
  {
    let txhash = await setAuthority(
      connection, // connection
      feePayer, // payer
      mintPubkey, // mint acocunt || token account
      alice, // current authority
      AuthorityType.MintTokens, // authority type
      randomGuy.publicKey // new authority (you can pass `null` to close it)
    );
    console.log(`txhash: ${txhash}`);
  }

  // or

  // 2) compose by yourself
  {
    let tx = new Transaction().add(
      createSetAuthorityInstruction(
        mintPubkey, // mint acocunt || token account
        alice.publicKey, // current auth
        AuthorityType.MintTokens, // authority type
        feePayer.publicKey // new auth (you can pass `null` to close it)
      )
    );
    console.log(`txhash: ${await connection.sendTransaction(tx, [feePayer, alice /* fee payer + origin auth */])}`);
  }
})();
