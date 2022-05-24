// 1. Add an instruction to send the token from Bob to Alice
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

// 2. Bob partially signs the transaction
transaction.partialSign(bobKeypair);

// 3. Serialize the transaction without requiring all signatures
const serializedTransaction = transaction.serialize({
  requireAllSignatures: false,
});

// 4. Alice can deserialize the transaction
const recoveredTransaction = Transaction.from(
  Buffer.from(transactionBase64, "base64")
);
