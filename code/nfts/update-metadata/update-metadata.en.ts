import {
    Commitment,
    Connection,
    Keypair,
    PublicKey,
    SignatureResult,
    Transaction,
    TransactionInstruction
} from '@solana/web3.js';
import {Metadata, MetadataDataData, UpdateMetadata } from '@metaplex-foundation/mpl-token-metadata';

interface UpdateMetadataParams {
    connection: Connection;
    keypair: Keypair;
    mint: PublicKey;
    instructions: TransactionInstruction[];
    newUri: string;
    commitment: Commitment;
}

async function updateMetadataApproveTransaction(authKeys: Keypair, tx: Transaction, connection: Connection, instructions: TransactionInstruction[], commitment: Commitment): Promise<string> {
    instructions.map(i => tx.add(i));
    let recent;
    try {
        recent = await connection.getLatestBlockhash();
    } catch (e: any) {
        recent = await connection.getRecentBlockhash();
    }
    tx.recentBlockhash = recent.blockhash;
    tx.feePayer = authKeys.publicKey;
    tx.sign(authKeys);
    return await connection.sendRawTransaction(tx.serialize(), {
        maxRetries: 3,
        preflightCommitment: commitment,
        skipPreflight: false
    });
}

export const updateMetadata = async (props: UpdateMetadataParams): Promise<{ result: SignatureResult, txn: string }> => {
    const metadata = await Metadata.getPDA(props.mint);
    const metadatadata = await Metadata.load(props.connection, metadata);
    let newMetadataData:  MetadataDataData = metadatadata.data.data;
    newMetadataData.uri = props.newUri;

    const updateTx = new UpdateMetadata(
        { feePayer: props.keypair.publicKey },
        {
            metadata,
            updateAuthority: props.keypair.publicKey,
            metadataData: newMetadataData
        }
    );
    const txnHash = await updateMetadataApproveTransaction(props.keypair, updateTx, props.connection, props.instructions, props.commitment);
    const result = await props.connection.confirmTransaction(txnHash, props.commitment);
    return { result: result.value, txn: txnHash }
};
