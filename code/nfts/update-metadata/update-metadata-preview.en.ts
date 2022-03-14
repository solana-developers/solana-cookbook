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
