(async () => {
  const programId = new PublicKey(
    "4ZEdbCtb5UyCSiAMHV5eSHfyjq3QwbG3yXb6oHD7RYjk"
  );

  // No more requirement to pass clock sys var key
  const initAccountIx = new TransactionInstruction({
    programId: programId,
    keys: [
      {
        isSigner: false,
        isWritable: true,
        pubkey: helloAccount.publicKey,
      },
    ],
  });

  const transaction = new Transaction();
  transaction.add(initAccountIx);

  const txHash = await connection.sendTransaction(transaction, [
    feePayer,
    helloAccount,
  ]);

  console.log(`Transaction succeeded. TxHash: ${txHash}`);
})();
