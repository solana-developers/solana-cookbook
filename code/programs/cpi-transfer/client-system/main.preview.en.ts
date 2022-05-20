(async () => {
  const connection = new Connection(clusterApiUrl("devnet"), "confirmed");
  const programId = new PublicKey(
    "DkuQ5wsndkzXfgqDB6Lgf4sDjBi4gkLSak1dM5Mn2RuQ"
  );

  // Airdropping some SOL
  await connection.confirmTransaction(
    await connection.requestAirdrop(PAYER_KEYPAIR.publicKey, LAMPORTS_PER_SOL)
  );

  // Our program's CPI instruction (create_account)
  const creataAccountIx = new TransactionInstruction({
    programId: programId,
    data: ACCOUNT_SPACE_BUFFER,
    keys: [
      {
        isSigner: true,
        isWritable: true,
        pubkey: PAYER_KEYPAIR.publicKey,
      },
      {
        isSigner: true,
        isWritable: true,
        pubkey: GENERAL_STATE_KEYPAIR.publicKey,
      },
      {
        isSigner: false,
        isWritable: false,
        pubkey: SystemProgram.programId,
      },
    ],
  });

  const transaction = new Transaction();
  // Adding up all the above instructions
  transaction.add(creataAccountIx);

  const txHash = await connection.sendTransaction(transaction, [
    PAYER_KEYPAIR,
    GENERAL_STATE_KEYPAIR,
  ]);

  console.log(`Create Account CPI Success: ${txHash}`);
})();
