# Non Fungible Tokens (NFTs)

## How to create an NFT (NFT oluşturma)

Bir NFT oluşturmak için yapmanız gerekenler:

1. Resmi bir IPFS'e yükleyin (Arweave gibi)
2. Json meta verilerini IPFS'ye yükleyin (Arweave gibi)
3. NFT için bir account oluşturmak üzere metaplex'i çağırın (call)

### Upload to Arweave (Arwave’e yükleme)

```ts
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

```

### Mint the NFT (NFT Mint)
Resim ve meta veri yüklediğinizde, NFT'yi aşağıdaki kodla mint edebilirsiniz(basabilirsiniz).

```ts
const mintNFTResponse = await metaplex.nfts().create({
  uri: "https://ffaaqinzhkt4ukhbohixfliubnvpjgyedi3f2iccrq4efh3s.arweave.net/KUAIIbk6p8oo4XHRcq0U__C2r0mwQaNl0gQow4Qp9yk",
  maxSupply: 1,
});
```

::: Not
Cüzdanınızdan farklı bir içerik oluşturucu ile NFT basamazsınız. İçerik oluşturucu sorunlarıyla karşılaşırsanız meta verilerinizin sizi içerik oluşturucu olarak listelediğinden emin olun.
:::

## How to get NFT Metadata (NFT Metadata’yı getirme)

Metaplex NFT'ler, Arweave'de depolanan meta verilere sahiptir. Arweave meta verilerini almak için Metaplex PDA'yı almanız ve account verilerini decode etmeniz gerekir.

```ts
const connection = new Connection(clusterApiUrl("mainnet-beta"));
const keypair = Keypair.generate();

const metaplex = new Metaplex(connection);
metaplex.use(keypairIdentity(keypair));

const mint = new PublicKey("Ay1U9DWphDgc7hq58Yj1yHabt91zTzvV2YJbAWkPNbaK");

const nft = await metaplex.nfts().findByMint(mint);

console.log(nft.metadata);

```

## How to get the owner of an NFT (Bir NFT’nin sahibini getirme)

Bir NFT'nin mint anahtarına sahipseniz, o mint anahtarı için en büyük token account'ına göz atarak mevcut sahibini bulabilirsiniz.

NFT'lerin tek arzı olduğunu ve bölünemez olduklarını unutmayın; bu, herhangi bir zamanda yalnızca bir token account'ının o token’ı tutacağı ve bu mint anahtarı için diğer tüm token account'larının 0 bakiyesi olacağı anlamına gelir.

En büyük token account'ı belirlendiğinde, sahibini alabiliriz.

```ts
const connection = new Connection("https://api.mainnet-beta.solana.com");
const tokenMint = "9ARngHhVaCtH5JFieRdSS5Y8cdZk2TMF4tfGSWFB9iSK";
const largestAccounts = await connection.getTokenLargestAccounts(
  new PublicKey(tokenMint)
);
const largestAccountInfo = await connection.getParsedAccountInfo(
  largestAccounts.value[0].address
);
console.log(largestAccountInfo.value.data.parsed.info.owner);
```

## How to get NFT Mint Addresses (NFT Mint Adres’lerini getirme)

Candy Machine’in public key’ini biliyorsanız, aşağıdaki kodu kullanarak o Candy Machine’den üretilen tüm NFT mint adreslerinin listesini alabilirsiniz. Aşağıdaki `memcmp` filtresini kullanabileceğimizi unutmayın, çünkü v1'de ilk oluşturucu her zaman Candy Machine'in adresidir.

### Candy Machine V1

```ts
const getMintAddresses = async (firstCreatorAddress: PublicKey) => {
  const metadataAccounts = await connection.getProgramAccounts(
    TOKEN_METADATA_PROGRAM,
    {
      // The mint address is located at byte 33 and lasts for 32 bytes.
      dataSlice: { offset: 33, length: 32 },

      filters: [
        // Only get Metadata accounts.
        { dataSize: MAX_METADATA_LEN },

        // Filter using the first creator.
        {
          memcmp: {
            offset: CREATOR_ARRAY_START,
            bytes: firstCreatorAddress.toBase58(),
          },
        },
      ],
    }
  );

  return metadataAccounts.map((metadataAccountInfo) =>
    bs58.encode(metadataAccountInfo.account.data)
  );
};

getMintAddresses(candyMachineId);

```

### Candy Machine V2

Bir Candy Machine v2 kullanıyorsanız, öncelikle `candy_machine` kullanan basit bir PDA olan "Candy Machine Creator" adresine ve seed olarak Candy Machine v2 adresine erişmeniz gerekir. İçerik oluşturucu adresini aldıktan sonra, onu v1'de kullandığımız şekilde kullanabilirsiniz.

```ts
const getCandyMachineCreator = async (
  candyMachine: PublicKey
): Promise<[PublicKey, number]> =>
  PublicKey.findProgramAddress(
    [Buffer.from("candy_machine"), candyMachine.toBuffer()],
    CANDY_MACHINE_V2_PROGRAM
  );

const candyMachineCreator = await getCandyMachineCreator(candyMachineId);
getMintAddresses(candyMachineCreator[0]);

```

## How to get all NFTs from a wallet? (Bir cüzdandan tüm NFT’leri alma)
Bir cüzdandan tüm NFT'leri alırken, tüm token account'larını almanız ve ardından hangilerinin NFT olduğunu ayrıştırmanız gerekir. Bunların hepsi Metaplex js kitaplığındaki [`findDataByOwner`](https://github.com/metaplex-foundation/js/blob/248b61baf89a69b88f9a461e32b1cbd54a9b0a18/src/programs/metadata/accounts/Metadata.ts#L220-L236) kullanılarak yapılabilir.

```ts
const connection = new Connection(clusterApiUrl("mainnet-beta"), "confirmed");
const keypair = Keypair.generate();

const metaplex = new Metaplex(connection);
metaplex.use(keypairIdentity(keypair));

const owner = new PublicKey("2R4bHmSBHkHAskerTHE6GE1Fxbn31kaD5gHqpsPySVd7");
const allNFTs = await metaplex.nfts().findAllByOwner(owner);

console.log(allNFTs);
```
