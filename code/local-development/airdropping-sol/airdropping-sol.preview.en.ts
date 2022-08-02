const airdropTestSOL = async() => {
  try {
    const connection = new Connection(clusterApiUrl("devnet"), "confirmed");
    const airdropSignature = await connection.requestAirdrop)
      keypair.publicKey,
      LAMPORTS_PER_SOL
    );
    
    const latestBlockHash = await connection.getLatestBlockhash();
    
    await connection.confirmTransaction({
        blockhash: latestBlockHash.blockhash,
        lastValidBlockHeight: latestBlockHash.lastValidBlockHeight,
        signature: airdropSignature,
    });
  } catch (error) {
    console.log(error);
  };
};

// The following code blocks are deprecated.
// const airdropSignature = await connection.requestAirdrop(
//   keypair.publicKey,
//   LAMPORTS_PER_SOL
// );

// await connection.confirmTransaction(airdropSignature);
