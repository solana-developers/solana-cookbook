# Get Program Accounts

Bir programın sahip olduğu tüm account'ları döndüren bir RPC yöntemidir. Şu anda pagination desteklenmemektedir. getProgramAccounts requests, yanıt süresini iyileştirmek ve yalnızca amaçlanan sonuçları döndürmek için dataSlice ve/veya filters parametrelerini içermelidir.

## Facts (Özet Bilgiler)

:::Parametreler

- `programId`: `string` - Sorgulanacak programın public key’i, base58 kodlu bir string olarak sağlanır
- (isteğe bağlı) `configOrCommitment`: `object` - Aşağıdaki isteğe bağlı alanları içeren yapılandırma parametreleri:
    - (isteğe bağlı) `commitment`: `string` - [Durum Taahhüdü](https://docs.solana.com/developing/clients/jsonrpc-api#configuring-state-commitment)
    - (isteğe bağlı) `encoding`: `string` - Account verileri için encode: base58, base64 veya jsonParsed’dır. Web3js kullanıcılarının bunun yerine [getParsedProgramAccounts](https://solana-labs.github.io/solana-web3.js/classes/Connection.html#getParsedProgramAccounts) kullanması gerektiğini unutmayın.
    - (isteğe bağlı) `dataSlice`: `object` - Geri döndürülen account verilerini aşağıdakilere göre sınırlayın:
        - `offset`: `number` - Geri döndürmeye başlamak için account verisindeki bayt sayısı
        - `length`: `number` - Geri döndürülecek account verilerinin bayt sayısı
    - (isteğe bağlı) `filters`: `array` - Aşağıdaki filters nesnelerini kullanarak sonuçları filtreleyin:
        - `memcmp`: `object` - Bir dizi baytı account verileriyle eşleştirin:
            - `offset`: `number` - Karşılaştırmaya başlamak için account verilerinin bayt sayısı
            - `bytes`: `string` - 129 bayt ile sınırlı base58 kodlu string olarak eşleşecek veriler
        - `dataSize`: `number` - Account data uzunluğunu sağlanan veri boyutuyla karşılaştırır
    - (isteğe bağlı) `withContext`: `boolean` - Sonucu bir [RpcResponse JSON nesnesine sarmalayın](https://docs.solana.com/developing/clients/jsonrpc-api#rpcresponse-structure)

##### Response

Varsayılan olarak `getProgramAccounts`, aşağıdaki yapıya sahip bir dizi JSON nesnesi döndürür:

- `pubkey`: `string` - Base58 kodlu bir string olarak account'ın pubkeyi
- `account`: `object` - aşağıdaki alt alanlara sahip bir JSON nesnesi:
- `lamports`: `number`, account'a atanan lamport sayısı
- `owner`: `string`, Hesabın atandığı programın base58 kodlu yayın anahtarı
- `data`: `string` | `object` - account'la ilişkili veriler, sağlanan kodlama parametresine bağlı olarak kodlanmış binary data veya JSON formatıdır
- `executable`: `boolean`, Hesap bir program içerp içermediğinin göstergesi
- `rentEpoch`: `number`, Bu account'ın bir sonraki rent borcunun olacağı epoch
:::

## Deep Dive (Derinlemesine Bakış)

`getProgramAccounts`, bir programın sahip olduğu tüm account'ları döndüren çok yönlü bir RPC methodudur. `getProgramAccounts`'u aşağıdakileri bulmak gibi bir dizi yararlı sorgu için kullanabiliriz:

- Belirli bir cüzdan için tüm token account'ları
- Belirli bir mint için tüm token account'ları (tüm [SRM](https://www.projectserum.com/) sahipleri)
- Belirli bir program için tüm private account'lar (tüm [Mango](https://mango.markets/) kullanıcıları)

Kullanışlılığına rağmen, `getProgramAccounts`, mevcut kısıtlamaları nedeniyle genellikle yanlış anlaşılır. `getProgramAccounts` tarafından desteklenen sorguların çoğu, büyük veri kümelerini taramak için RPC node’larını gerektirir. Bu taramalar hem bellek hem de kaynak yoğundur. Sonuç olarak, çok sık veya çok geniş kapsamlı çağrılar bağlantı zaman aşımlarına neden olabilir. Ayrıca, bu yazının yazıldığı sırada `getProgramAccounts` uç noktası sayfalandırmayı desteklemez. Bir sorgunun sonuçları çok büyükse, yanıt kesilecektir.

Bu mevcut kısıtlamaları aşmak için `getProgramAccounts` bir dizi faydalı parametre sunar: `dataSlice`, `memcmp` ve `dataSize`, `filters` seçenekleri. Bu parametrelerin kombinasyonlarını sağlayarak sorgularımızın kapsamını yönetilebilir ve öngörülebilir boyutlara indirebiliriz.

Yaygın bir `getProgramAccounts` örneği, [SPL-Token Programı](https://spl.solana.com/token) ile etkileşimi içerir. Token Programının sahip olduğu tüm account'ları bir [basic call](../references/accounts.md#get-program-accounts) ile request etmek, çok büyük miktarda veri gerektirecektir. Ancak parametreleri sağlayarak, yalnızca kullanmayı düşündüğümüz verileri verimli bir şekilde request edebiliriz.

### `filters`

`getProgramAccounts` ile kullanılacak en yaygın parametre `filters` array’idir. Bu array, `dataSize` ve `memcmp` olmak üzere iki tür filtre kabul eder. Bu filtrelerden herhangi birini kullanmadan önce, request ettiğimiz verilerin nasıl düzenlendiğini ve serileştirildiğini bilmeliyiz.

#### `dataSize`

Token Programı için, [token account'larının 165 bayt uzunluğunda](https://github.com/solana-labs/solana-program-library/blob/08d9999f997a8bf38719679be9d572f119d0d960/token/program/src/state.rs#L86-L106) olduğunu görebiliriz. Spesifik olarak, bir belirteç account'ının her biri tahmin edilebilir sayıda bayt gerektiren sekiz farklı alanı vardır. Aşağıdaki çizimi kullanarak bu verilerin nasıl düzenlendiğini görselleştirebiliriz.

![Account Size](./get-program-accounts/account-size.png)

Cüzdan adresimize ait tüm token account'larını bulmak istiyorsak, sorgumuzun kapsamını tam olarak 165 bayt uzunluğundaki account'lara daraltmak için `filters` dizimize `{ dataSize: 165 }` ekleyebiliriz. Ancak bu tek başına yetersiz olacaktır. Ayrıca adresimize ait account'ları arayan bir filtre eklememiz gerekir. Bunu `memcmp` filtresiyle başarabiliriz

#### `memcmp`

`memcmp` filtresi veya "bellek karşılaştırma" filtresi, account'ımızda depolanan herhangi bir alandaki verileri karşılaştırmamıza olanak tanır. Spesifik olarak, yalnızca belirli bir konumda belirli bir bayt kümesiyle eşleşen account'ları sorgulayabiliriz. `memcmp` iki argüman gerektirir:

- `offset`: Verileri karşılaştırmaya başlayacağınız konum. Bu konum bayt cinsinden ölçülür ve bir tamsayı olarak ifade edilir.
- `bytes`: Hesabın verileriyle eşleşmesi gereken veriler. Bu, base-58 kodlu bir string olarak temsil edilir, 129 bayttan daha az ile sınırlandırılmalıdır.

`Memcmp`'nin yalnızca `bytes` ile tam olarak eşleşen sonuçları döndüreceğini unutmamak önemlidir. Şu anda, sağladığımız `bytes`’dan daha küçük veya daha büyük değerler için karşılaştırmaları desteklememektedir.

Token Programı örneğimize uygun olarak, sorgumuzu yalnızca cüzdan adresimize ait olan token account'larını döndürecek şekilde değiştirebiliriz. Bir belirteç account'ına baktığımızda, bir belirteç account'ında depolanan ilk iki alanın her ikisinin de pubkey olduğunu ve her bir pubkey'nin 32 bayt uzunluğunda olduğunu görebiliriz. `Owner`’ın ikinci alan olduğu göz önüne alındığında, `memcmp`'mize 32 baytlık bir `offset` ile başlamalıyız. Buradan, owner alanı cüzdan adresimizle eşleşen account'ları arayacağız.

![Account Size](./get-program-accounts/memcmp.png)

Bu sorguyu aşağıdaki örnek üzerinden çağırabiliriz:

```ts
import { TOKEN_PROGRAM_ID } from "@solana/spl-token";
import { clusterApiUrl, Connection } from "@solana/web3.js";

(async () => {
  const MY_WALLET_ADDRESS = "FriELggez2Dy3phZeHHAdpcoEXkKQVkv6tx3zDtCVP8T";
  const connection = new Connection(clusterApiUrl("devnet"), "confirmed");

  const accounts = await connection.getParsedProgramAccounts(
    TOKEN_PROGRAM_ID, // new PublicKey("TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA")
    {
      filters: [
        {
          dataSize: 165, // number of bytes
        },
        {
          memcmp: {
            offset: 32, // number of bytes
            bytes: MY_WALLET_ADDRESS, // base58 encoded string
          },
        },
      ],
    }
  );

  console.log(
    `Found ${accounts.length} token account(s) for wallet ${MY_WALLET_ADDRESS}: `
  );
  accounts.forEach((account, i) => {
    console.log(
      `-- Token Account Address ${i + 1}: ${account.pubkey.toString()} --`
    );
    console.log(`Mint: ${account.account.data["parsed"]["info"]["mint"]}`);
    console.log(
      `Amount: ${account.account.data["parsed"]["info"]["tokenAmount"]["uiAmount"]}`
    );
  });
  /*
    // Output

    Found 2 token account(s) for wallet FriELggez2Dy3phZeHHAdpcoEXkKQVkv6tx3zDtCVP8T: 
    -- Token Account Address 0:  H12yCcKLHFJFfohkeKiN8v3zgaLnUMwRcnJTyB4igAsy --
    Mint: CKKDsBT6KiT4GDKs3e39Ue9tDkhuGUKM3cC2a7pmV9YK
    Amount: 1
    -- Token Account Address 1:  Et3bNDxe2wP1yE5ao6mMvUByQUHg8nZTndpJNvfKLdCb --
    Mint: BUGuuhPsHpk8YZrL2GctsCtXGneL1gmT5zYb7eMHZDWf
    Amount: 3
  */
})();
```



### `dataSlice`

İki filtre parametresinin dışında, `getProgramAccounts` için en yaygın üçüncü parametre `dataSlice`'dır. `filters` parametresinin aksine  `dataSlice`, bir sorgu tarafından döndürülen account sayısını azaltmaz. Bunun yerine  `dataSlice`, her account için veri miktarını sınırlar.

`memcmp` gibi `dataSlice` iki argümanı kabul eder:
- `offset`: Verileri karşılaştırmaya başlayacağınız konum. 
- `length`: Döndürülmesi gereken bayt sayısı. 

`dataSlice`, özellikle büyük bir veri kümesinde sorgu çalıştırdığımızda, ancak aslında account verilerinin kendisiyle ilgilenmediğimizde kullanışlıdır. Bunun bir örneği, belirli bir token mint etmek(basmak) için token account'larının sayısını (token sahiplerinin sayısını) bulmak istiyorsak olabilir.

```ts
import { TOKEN_PROGRAM_ID } from "@solana/spl-token";
import { clusterApiUrl, Connection } from "@solana/web3.js";

(async () => {
  const MY_TOKEN_MINT_ADDRESS = "BUGuuhPsHpk8YZrL2GctsCtXGneL1gmT5zYb7eMHZDWf";
  const connection = new Connection(clusterApiUrl("devnet"), "confirmed");

  const accounts = await connection.getProgramAccounts(
    TOKEN_PROGRAM_ID, // new PublicKey("TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA")
    {
      dataSlice: {
        offset: 0, // number of bytes
        length: 0, // number of bytes
      },
      filters: [
        {
          dataSize: 165, // number of bytes
        },
        {
          memcmp: {
            offset: 0, // number of bytes
            bytes: MY_TOKEN_MINT_ADDRESS, // base58 encoded string
          },
        },
      ],
    }
  );
  console.log(
    `Found ${accounts.length} token account(s) for mint ${MY_TOKEN_MINT_ADDRESS}`
  );
  console.log(accounts);

  /*
  // Output (notice the empty <Buffer > at acccount.data)
  
  Found 3 token account(s) for mint BUGuuhPsHpk8YZrL2GctsCtXGneL1gmT5zYb7eMHZDWf
  [
    {
      account: {
        data: <Buffer >,
        executable: false,
        lamports: 2039280,
        owner: [PublicKey],
        rentEpoch: 228
      },
      pubkey: PublicKey {
        _bn: <BN: a8aca7a3132e74db2ca37bfcd66f4450f4631a5464b62fffbd83c48ef814d8d7>
      }
    },
    {
      account: {
        data: <Buffer >,
        executable: false,
        lamports: 2039280,
        owner: [PublicKey],
        rentEpoch: 228
      },
      pubkey: PublicKey {
        _bn: <BN: ce3b7b906c2ff6c6b62dc4798136ec017611078443918b2fad1cadff3c2e0448>
      }
    },
    {
      account: {
        data: <Buffer >,
        executable: false,
        lamports: 2039280,
        owner: [PublicKey],
        rentEpoch: 228
      },
      pubkey: PublicKey {
        _bn: <BN: d4560e42cb24472b0e1203ff4b0079d6452b19367b701643fa4ac33e0501cb1>
      }
    }
  ]
  */
})();
```

Üç parametrenin tümünü (`dataSlice`, `dataSize`, ve `memcmp`) birleştirerek sorgumuzun kapsamını sınırlayabilir ve yalnızca ilgilendiğimiz verileri verimli bir şekilde döndürebiliriz.

## Other Resources

- [RPC API Documentation](https://docs.solana.com/developing/clients/jsonrpc-api#getprogramaccounts)
- [Web3js Documentation](https://solana-labs.github.io/solana-web3.js/classes/Connection.html#getProgramAccounts)
- [JSON-parsed Web3js Documentation](https://solana-labs.github.io/solana-web3.js/classes/Connection.html#getParsedProgramAccounts)
