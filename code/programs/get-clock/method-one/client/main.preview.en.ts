(async () => {
  const programId = new PublicKey(
    "77ezihTV6mTh2Uf3ggwbYF2NyGJJ5HHah1GrdowWJVD3"
  );

  // Passing Clock Sys Var
  const passClockIx = new TransactionInstruction({
    programId: programId,
    keys: [
      {
        isSigner: false,
        isWritable: true,
        pubkey: helloAccount.publicKey,
      },
      {
        is_signer: false,
        is_writable: false,
        pubkey: SYSVAR_CLOCK_PUBKEY,
      },
    ],
  });

  const transaction = new Transaction();
  transaction.add(passClockIx);

  const txHash = await connection.sendTransaction(transaction, [
    feePayer,
    helloAccount,
  ]);

  console.log(`Transaction succeeded. TxHash: ${txHash}`);
})();
