// 1. Upload image to Arweave
const data = fs.readFileSync("./code/nfts/arweave-upload/lowres-dog.png");

const transaction = await arweave.createTransaction({
  data: data,
});

transaction.addTag("Content-Type", "image/png");

const wallet = JSON.parse(fs.readFileSync("wallet.json", "utf-8"))
await arweave.transactions.sign(transaction, wallet);

const response = await arweave.transactions.post(transaction);
console.log(response);

const id = transaction.id;
const imageUrl = id ? `https://arweave.net/${id}` : undefined;

// 2. Upload metadata to Arweave

const metadataRequest = JSON.stringify(metadata);

const metadataTransaction = await arweave.createTransaction({
  data: metadataRequest,
});

metadataTransaction.addTag("Content-Type", "application/json");

await arweave.transactions.sign(metadataTransaction, wallet);

await arweave.transactions.post(metadataTransaction);
