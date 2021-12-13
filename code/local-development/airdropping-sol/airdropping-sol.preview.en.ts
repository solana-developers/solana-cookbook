const airdropSignature = await connection.requestAirdrop(
    keypair.publicKey,
    LAMPORTS_PER_SOL,
);

await connection.confirmTransaction(airdropSignature);