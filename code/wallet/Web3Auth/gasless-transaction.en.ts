(async()=>{
    const blockhash = (await conn.getRecentBlockhash("finalized")).blockhash;

    const destPublicKey = "<destination public key>"
    const TransactionInstruction = SystemProgram.transfer({
        fromPubkey: new PublicKey(publicKey),
        toPubkey: new PublicKey(destPublicKey),
        lamports: 0.1 * LAMPORTS_PER_SOL
    });
    const gaslessPublicKey = await torus.getGaslessPublicKey(); // scoped to application

    const transaction = new Transaction({
        recentBlockhash: blockhash,
        feePayer: new PublicKey(gaslessPublicKey)
        }).add(TransactionInstruction);

    const res = await torus.sendTransaction(transaction)
})();