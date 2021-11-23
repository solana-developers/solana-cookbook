import {
    SystemProgram,
    Keypair,
    Transaction,
    sendAndConfirmTransaction,
    Connection,
    clusterApiUrl,
    LAMPORTS_PER_SOL
} from "@solana/web3.js";

(async () => {
    const connection = new Connection(clusterApiUrl('devnet'), 'confirmed');
    const fromPubkey = Keypair.generate();

    // Airdrop SOL for transferring lamports to the created account
    const airdropSignature = await connection.requestAirdrop(
        fromPubkey.publicKey,
        LAMPORTS_PER_SOL,
    );
    await connection.confirmTransaction(airdropSignature);

    const newAccountPubkey = Keypair.generate();
    const createAccountParams = {
        fromPubkey: fromPubkey.publicKey,
        newAccountPubkey: newAccountPubkey.publicKey,
        lamports: LAMPORTS_PER_SOL / 100, // Seed the created account with lamports for rent exemption
        space: 0, // amount of space to reserve for the account
        programId: SystemProgram.programId,
    };

    const createAccountTransaction = new Transaction().add(
        SystemProgram.createAccount(createAccountParams),
    );

    await sendAndConfirmTransaction(connection, createAccountTransaction, [fromPubkey, newAccountPubkey])
})();