import {
    Connection,
    Keypair,
    PublicKey,
    SystemProgram,
    SYSVAR_RENT_PUBKEY, Transaction,
    TransactionInstruction
} from "@solana/web3.js"
import {createTransferInstruction} from "@solana/spl-token";
import fs from "fs";

export const SPL_ASSOCIATED_TOKEN_ACCOUNT_PROGRAM_ID = new PublicKey(
    'ATokenGPvbdGVxr1b2hvZbsiqW5xWH25efTNsLJA8knL',
);
export const TOKEN_PROGRAM_ID = new PublicKey(
    'TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA',
);

export function transferInstruction(source: PublicKey, destination: PublicKey, owner: PublicKey): TransactionInstruction {
    return createTransferInstruction(
        source,
        destination,
        owner,
        1,
        [],
        TOKEN_PROGRAM_ID
    )
}

export function createAssociatedTokenAccountInstruction(
    associatedTokenAddress: PublicKey,
    payer: PublicKey,
    walletAddress: PublicKey,
    splTokenMintAddress: PublicKey,
) {
    const keys = [
        {
            pubkey: payer,
            isSigner: true,
            isWritable: true,
        },
        {
            pubkey: associatedTokenAddress,
            isSigner: false,
            isWritable: true,
        },
        {
            pubkey: walletAddress,
            isSigner: false,
            isWritable: false,
        },
        {
            pubkey: splTokenMintAddress,
            isSigner: false,
            isWritable: false,
        },
        {
            pubkey: SystemProgram.programId,
            isSigner: false,
            isWritable: false,
        },
        {
            pubkey: TOKEN_PROGRAM_ID,
            isSigner: false,
            isWritable: false,
        },
        {
            pubkey: SYSVAR_RENT_PUBKEY,
            isSigner: false,
            isWritable: false,
        },
    ];
    return new TransactionInstruction({
        keys,
        programId: SPL_ASSOCIATED_TOKEN_ACCOUNT_PROGRAM_ID,
        data: Buffer.from([]),
    });
}

export function loadWalletKey(keypair: string): Keypair {
    if (!keypair || keypair == '') {
        throw new Error('Keypair is required!');
    }
    const loaded = Keypair.fromSecretKey(
        new Uint8Array(JSON.parse(fs.readFileSync(keypair).toString())),
    );
    console.log(`wallet public key: ${loaded.publicKey}`);
    return loaded;
}

export const getAtaForMint = async (
    mint: PublicKey,
    buyer: PublicKey,
): Promise<PublicKey> => {
    return (await PublicKey.findProgramAddress(
        [buyer.toBuffer(), TOKEN_PROGRAM_ID.toBuffer(), mint.toBuffer()],
        SPL_ASSOCIATED_TOKEN_ACCOUNT_PROGRAM_ID,
    ))[0];
};


export async function returnNftInstructions(source: PublicKey, destination: PublicKey, mint: PublicKey, connection: Connection): Promise<TransactionInstruction[]> {
    const instructions = []
    const tokenAccountKey = await getAtaForMint(mint, destination);
    const accountInfo = await connection.getParsedAccountInfo(tokenAccountKey);
    if (accountInfo.value === null) {
        instructions.push(createAssociatedTokenAccountInstruction(tokenAccountKey, source, destination, mint));
    }
    instructions.push(await transferNftInstructions(mint, source, destination));
    return instructions;
}

export async function approveTransaction(authKeys: Keypair, instructions: TransactionInstruction[], connection: Connection): Promise<string> {
    let tx = new Transaction();
    instructions.map(i => tx.add(i));
    const recent = await connection.getRecentBlockhash();
    tx.recentBlockhash = recent.blockhash;
    tx.feePayer = authKeys.publicKey;
    tx.sign(authKeys);
    return await connection.sendRawTransaction(tx.serialize());
}

export async function transferNftInstructions(mint: PublicKey, source: PublicKey, destination: PublicKey): Promise<TransactionInstruction> {
    const authTokenAccountKey = await getAtaForMint(mint, source);
    const returnTokenAccountKey = await getAtaForMint(mint, destination);
    return transferInstruction(authTokenAccountKey, returnTokenAccountKey, source);
}

const connection = new Connection("https://api.mainnet-beta.solana.com");
const from = loadWalletKey("");
const to = new PublicKey("");
const mint = new PublicKey("");
const instructions = await returnNftInstructions(from.publicKey, to, mint, connection);
const txn = await approveTransaction(from, instructions, connection);
