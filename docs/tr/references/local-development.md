# Local Development (Yerel Geliştirme)

## Starting a local validator (Yerel validator başlatma)

Program kodunuzu yerel olarak test etmek, devnet'te test etmekten çok daha güvenilir olabilir ve onu devnet'te denemeden önce test etmenize yardımcı olabilir.

[solana tool suite](/getting-started/installation.md#install-cli) yükleyerek ve çalıştırarak yerel test doğrulayıcınızı kurabilirsiniz.

```console
solana-test-validator
```

Yerel test doğrulayıcı kullanmanın faydaları şunları içerir:

- RPC hız sınırı yoktur
- Airdrop limiti yoktur
- Doğrudan zincir üzerinde program dağıtımı yapılır (--bpf-program ...)
- Programlar da dahil olmak üzere genel bir kümeden account'ları klonlayabilirsiniz (--clone ...)
- Yapılandırılabilir işlem geçmişi saklarsınız (--limit-ledger-size ...)
- Epoch uzunluğu yapılandırılabilir (--slots-per-epoch ...)
- İsteğe bağlı bir slota atlayabilirsiniz (--warp-slot ...)

## Connecting to Environments (Ortamlara Bağlanma)

Solana geliştirme üzerinde çalışırken, belirli bir RPC API uç noktasına bağlanmanız gerekecektir. Solana'nın 3 genel geliştirme ortamı vardır:

- mainnet-beta https://api.mainnet-beta.solana.com
- devnet https://api.devnet.solana.com
- testnet https://api.testnet.solana.com

```ts
const connection = new Connection(clusterApiUrl("mainnet-beta"), "confirmed");

```

Son olarak, aşağıdakilerle yerel veya uzaktan çalışan özel bir kümeye de bağlanabilirsiniz:

```ts
const connection = new Connection("http://127.0.0.1:8899", "confirmed");
```

## Subscribing to Events (Event’lere Abone Olma)

Web yuvaları, belirli olayları dinleyebileceğiniz bir pub/sub arabirimi sağlar. Sık güncellemeler almak için belirli aralıklarla tipik bir HTTP uç noktasına ping atmak yerine, bu güncellemeleri yalnızca gerçekleştiğinde alabilirsiniz.

Solana'nın başlık altındaki web3 [`Connection`](https://solana-labs.github.io/solana-web3.js/classes/Connection.html)(bağlantıs)ı, bir websocket uç noktası oluşturur ve yeni bir `Connection` örneği oluşturduğunuzda bir websocket client’ı kaydeder ([burada](https://github.com/solana-labs/solana-web3.js/blob/45923ca00e4cc1ed079d8e55ecbee83e5b4dc174/src/connection.ts#L2100)ki kaynak koduna bakın).

Connection sınıfı, pub/sub yöntemlerini ortaya çıkarır - hepsi olay yayıcılar gibi on ile başlar. Bu dinleyici yöntemlerini çağırdığınızda, o Connection örneğinin websocket client’a yeni bir abonelik kaydeder. Aşağıda kullandığımız örnek pub/sub yöntemi [`onAccountChange`](https://solana-labs.github.io/solana-web3.js/classes/Connection.html#onAccountChange)'dir. Geri arama, güncellenmiş durum verilerini bağımsız değişkenler aracılığıyla sağlayacaktır (örnek olarak [`AccountChangeCallback`](https://solana-labs.github.io/solana-web3.js/modules.html#AccountChangeCallback)'e bakın).

```ts
// Establish new connect to devnet - websocket client connected to devnet will also be registered here
const connection = new Connection(clusterApiUrl("devnet"), "confirmed");

// Create a test wallet to listen to
const wallet = Keypair.generate();

// Register a callback to listen to the wallet (ws subscription)
connection.onAccountChange(
  wallet.publicKey(),
  (updatedAccountInfo, context) =>
    console.log("Updated account info: ", updatedAccountInfo),
  "confirmed"
);
```

## Getting Test SOL (Test SOL Edinme)

Yerel olarak çalışırken, işlem göndermek için biraz SOL'ye ihtiyacınız vardır. Mainnet olmayan ortamlarda, SOL'u adresinize airdropla göndererek alabilirsiniz.

```ts
const airdropSignature = await connection.requestAirdrop(
  keypair.publicKey,
  LAMPORTS_PER_SOL
);

await connection.confirmTransaction(airdropSignature);
```


## Using Mainnet Accounts and Programs (Mainnet Account ve Programlarını Kullanma)

Çoğu zaman, yerel testler yalnızca ana ağda bulunan programlara ve account'lara dayanır. Solana CLI her ikisine de izin verir:

* Programları ve Hesapları İndirin
* Programları ve Hesapları yerel bir doğrulayıcıya yükleyin

### How to load accounts from mainnet (Account’lar mainnet’ten nasıl yüklenir)

SRM token mint account’ını dosyaya indirmek mümkündür:

```
solana account -u m --output json-compact --output-file SRM_token.json SRMuApVNdxXokk5GT7XD5cUUgXMBCoAz2LHeuAoKWRt

```

Doğrulayıcıyı başlatırken account'ın dosya ve hedef adresini (yerel kümede) ileterek yerel ağınıza yükleme yapılır:

```
solana-test-validator --account SRMuApVNdxXokk5GT7XD5cUUgXMBCoAz2LHeuAoKWRt SRM_token.json --reset

```

### How to load programs from mainnet (Programlar mainnet’ten nasıl yüklenir)

Benzer şekilde Serum Dex v3 programını da indirmek mümkündür:

```
solana program dump -u m 9xQeWvG816bUx9EPjHmaT23yvVM2ZWbrrpZb9PusVFin serum_dex_v3.so

```

Yerel ağınıza yükleme, doğrulayıcıyı başlatırken programın dosya ve hedef adresini (yerel kümede) ileterek yapılır:

```
solana-test-validator --bpf-program 9xQeWvG816bUx9EPjHmaT23yvVM2ZWbrrpZb9PusVFin serum_dex_v3.so --reset

```

