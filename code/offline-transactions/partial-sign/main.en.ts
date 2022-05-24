import {
  createTransferCheckedInstruction,
  getAssociatedTokenAddress,
  getMint,
  getOrCreateAssociatedTokenAccount,
} from "@solana/spl-token";
import {
  clusterApiUrl,
  Connection,
  Keypair,
  LAMPORTS_PER_SOL,
  PublicKey,
  SystemProgram,
  Transaction,
} from "@solana/web3.js";
import base58 from "bs58";

/* The transaction:
 * - sends 0.01 SOL from Alice to Bob
 * - sends 1 token from Bob to Alice
 * - is partially signed by Bob, so Alice can approve + send it
 */

(async () => {
  const connection = new Connection(clusterApiUrl("devnet"), "confirmed");

  const alicePublicKey = new PublicKey(
    "5YNmS1R9nNSCDzb5a7mMJ1dwK9uHeAAF4CmPEwKgVWr8"
  );
  const bobKeypair = Keypair.fromSecretKey(
    base58.decode(
      "4NMwxzmYj2uvHuq8xoqhY8RXg63KSVJM1DXkpbmkUY7YQWuoyQgFnnzn6yo3CMnqZasnNPNuAT2TLwQsCaKkUddp"
    )
  );
  const tokenAddress = new PublicKey(
    "Gh9ZwEmdLJ8DscKNTkTqPbNwLNNBjuSzaG9Vp2KGtKJr"
  );
  const bobTokenAddress = await getAssociatedTokenAddress(
    tokenAddress,
    bobKeypair.publicKey
  );

  // Alice may not have a token account, so Bob creates one if not
  const aliceTokenAccount = await getOrCreateAssociatedTokenAccount(
    connection,
    bobKeypair, // Bob pays the fee to create it
    tokenAddress, // which token the account is for
    alicePublicKey // who the token account is for
  );

  // Get the details about the token mint
  const tokenMint = await getMint(connection, tokenAddress);

  // Get a recent blockhash to include in the transaction
  const { blockhash } = await connection.getLatestBlockhash("finalized");

  const transaction = new Transaction({
    recentBlockhash: blockhash,
    // Alice pays the transaction fee
    feePayer: alicePublicKey,
  });

  // Transfer 0.01 SOL from Alice -> Bob
  transaction.add(
    SystemProgram.transfer({
      fromPubkey: alicePublicKey,
      toPubkey: bobKeypair.publicKey,
      lamports: 0.01 * LAMPORTS_PER_SOL,
    })
  );

  // Transfer 1 token from Bob -> Alice
  transaction.add(
    createTransferCheckedInstruction(
      bobTokenAddress, // source
      tokenAddress, // mint
      aliceTokenAccount.address, // destination
      bobKeypair.publicKey, // owner of source account
      1 * 10 ** tokenMint.decimals, // amount to transfer
      tokenMint.decimals // decimals of token
    )
  );

  // Partial sign as Bob
  transaction.partialSign(bobKeypair);

  // Serialize the transaction and convert to base64 to return it
  const serializedTransaction = transaction.serialize({
    // We will need Alice to deserialize and sign the transaction
    requireAllSignatures: false,
  });
  const transactionBase64 = serializedTransaction.toString("base64");
  return transactionBase64;

  // The caller of this can convert it back to a transaction object:
  const recoveredTransaction = Transaction.from(
    Buffer.from(transactionBase64, "base64")
  );
})();
