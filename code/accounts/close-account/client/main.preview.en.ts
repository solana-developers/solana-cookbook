// 1. create an account to your program
let createNewAccountTx = new Transaction().add(
  SystemProgram.createAccount({
    fromPubkey: feePayer.publicKey,
    newAccountPubkey: newAccountKeypair.publicKey,
    lamports: 1e8, // 0.1 SOL
    space: 10, // a random value
    programId: programId,
  })
);

// 2. close your account
let closeAccountTx = new Transaction().add(
  new TransactionInstruction({
    keys: [
      {
        pubkey: newAccountKeypair.publicKey,
        isSigner: false,
        isWritable: true,
      },
      {
        pubkey: feePayer.publicKey,
        isSigner: false,
        isWritable: true,
      },
    ],
    programId: programId,
  })
);
