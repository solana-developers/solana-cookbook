const mintHashes: any = []

for (let index = 0; index < metadataAccounts.length; index++){
    const account = metadataAccounts[index];
    const accountInfo: any = await connection.getParsedAccountInfo(account.pubkey);
    const metadata = new Metadata(hash.toString(), accountInfo.value);
    mintHashes.push(metadata.data.mint)
    }
console.log(mintHashes)