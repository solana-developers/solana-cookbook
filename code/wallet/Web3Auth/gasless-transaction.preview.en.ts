const gaslessPublicKey = await torus.getGaslessPublicKey(); // scoped to application

const transaction = new Transaction({
    recentBlockhash: blockhash,
    feePayer: new PublicKey(gaslessPublicKey)
    }).add(TransactionInstruction);

const res = await torus.sendTransaction(transaction)