import { clusterApiUrl, Connection, PublicKey, Keypair, Transaction, SystemProgram } from "@solana/web3.js";
import { Token, TOKEN_PROGRAM_ID, AccountLayout, NATIVE_MINT, ASSOCIATED_TOKEN_PROGRAM_ID } from "@solana/spl-token";
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

  // remember to create ATA first
  let ata = await Token.getAssociatedTokenAddress(
    ASSOCIATED_TOKEN_PROGRAM_ID,
    TOKEN_PROGRAM_ID,
    NATIVE_MINT,
    alice.publicKey
  );

  let auxAccount = Keypair.generate();
  let amount = 1 * 1e9; /* Wrapped SOL's decimals is 9 */

  let tx = new Transaction().add(
    // create token account
    SystemProgram.createAccount({
      fromPubkey: alice.publicKey,
      newAccountPubkey: auxAccount.publicKey,
      space: AccountLayout.span,
      lamports: (await Token.getMinBalanceRentForExemptAccount(connection)) + amount, // rent + amount
      programId: TOKEN_PROGRAM_ID,
    }),
    // init token account
    Token.createInitAccountInstruction(TOKEN_PROGRAM_ID, NATIVE_MINT, auxAccount.publicKey, alice.publicKey),
    // transfer WSOL
    Token.createTransferInstruction(TOKEN_PROGRAM_ID, auxAccount.publicKey, ata, alice.publicKey, [], amount),
    // close aux account
    Token.createCloseAccountInstruction(TOKEN_PROGRAM_ID, auxAccount.publicKey, alice.publicKey, alice.publicKey, [])
  );
  console.log(`txhash: ${await connection.sendTransaction(tx, [feePayer, auxAccount, alice])}`);
})();
