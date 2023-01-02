# Retrying Transactions (İşlemleri Yeniden Denemek)

Bazı durumlarda, görünüşte geçerli bir işlem, bir bloğa dahil edilmeden önce iptal edilebilir. Bu genellikle ağ tıkanıklığı dönemlerinde, bir RPC node’unun işlemi [leader](https://docs.solana.com/terminology#leader)’da ‘rebroadcast’ edemediğinde (yani duyuramadığında) meydana gelir. Bir son kullanıcıya, işlemleri tamamen ortadan kalkmış gibi görünebilir. RPC node’ları genel bir rebroadcasting algoritması ile donatılırken, uygulama geliştiricileri de kendi özel rebroadcasting mantığını geliştirebilir.

Facts (Özet Bilgiler)

:::Bilgi Tablosu

- RPC node’lar, genel bir algoritma kullanarak işlemleri rebroadcast etmeye çalışacaktır.
- Uygulama geliştiricileri kendi özel rebroadcasting mantığını uygulayabilir.
- Geliştiriciler, `sendTransaction` JSON-RPC yöntemindeki `maxRetries` parametresinden yararlanmalıdır.
- Geliştiriciler, işlemler gönderilmeden önce hataları ortaya çıkarmak için ön kontrol kontrollerini etkinleştirmelidir.
- Herhangi bir işlemi yeniden imzalamadan önce, ilk işlemin blockhash süresinin dolduğundan emin olmak çok önemlidir.

:::

## The Journey of a Transaction (Bir İşlemin Yolculuğu)

### How Clients Submit Transactions (Client’lar İşlemleri Nasıl Gönderir)

Solana'da bir mempool kavramı yoktur. İster programlı olarak ister son kullanıcı tarafından başlatılsın tüm işlemler, bir bloğa işlenebilmeleri için leaders’a verimli bir şekilde yönlendirilir. Bir işlemin leader’lara gönderilmesinin iki ana yolu vardır:

1. Bir RPC sunucusu ve [sendTransaction](https://docs.solana.com/developing/clients/jsonrpc-api#sendtransaction) JSON-RPC yöntemi aracılığıyla proxy ile gönderme
2. [TPU Client](https://docs.rs/solana-client/1.7.3/solana_client/tpu_client/index.html) aracılığıyla doğrudan leaders’a gönderme

Son kullanıcıların büyük çoğunluğu işlemleri bir RPC sunucusu aracılığıyla gönderecektir. Bir müşteri bir işlem gönderdiğinde, alıcı RPC node sırayla işlemi hem mevcut hem de sonraki leader’lara rebroadcast etmeye çalışır. İşlem bir leader tarafından işlenene kadar, Client’ın ve geçiş yapan RPC node’larının farkında olduğu dışında işlem kaydı yoktur. TPU Client’ı durumunda, rebroadcast ve leader yönlendirme tamamen client yazılımı tarafından gerçekleştirilir.

![Transaction Journey](./retrying-transactions/tx-journey.png)

### How RPC Nodes Broadcast Transactions (RPC Node’ları İşlemleri Nasıl Yayınlar)

Bir RPC node, `sendTransaction` aracılığıyla bir işlem aldıktan sonra, ilgili leader’lara iletmeden önce işlemi bir [UDP](https://en.wikipedia.org/wiki/User_Datagram_Protocol) paketine dönüştürür. UDP, doğrulayıcıların birbirleriyle hızlı bir şekilde iletişim kurmasına izin verir, ancak işlem teslimiyle ilgili herhangi bir garanti vermez.

Solana'nın leader programı her [epoch](https://docs.solana.com/terminology#epoch) (~2 gün) önceden bilindiğinden, bir RPC node işlemini doğrudan mevcut ve sonraki leader’lara yayınlayacaktır. Bu, işlemleri tüm ağda rastgele ve geniş bir şekilde yayan Ethereum gibi diğer protokollerinin aksine bir metoddur. Varsayılan olarak, RPC node’ları, işlem tamamlanana veya işlemin blockhash süresi dolana kadar (bu yazı yazıldığı sırada 150 blok veya ~1 dakika 19 saniye) iki saniyede bir işlemleri leader’lara iletmeye çalışır. Bekleyen rebroadcast kuyruğu boyutu [10,000](https://github.com/solana-labs/solana/blob/bfbbc53dac93b3a5c6be9b4b65f679fdb13e41d9/send-transaction-service/src/send_transaction_service.rs#L20) işlemden büyükse, yeni gönderilen işlemler bırakılır. Bu yeniden deneme mantığının varsayılan davranışını değiştirmek için RPC operatörlerinin ayarlayabileceği komut satırı [argümanları](https://github.com/solana-labs/solana/blob/bfbbc53dac93b3a5c6be9b4b65f679fdb13e41d9/validator/src/main.rs#L1172) vardır.

Bir RPC node, bir işlem yayınladığında, işlemi bir leader’ın İşlem İşleme Birimine ([Transaction Processing Unit (TPU)](https://github.com/solana-labs/solana/blob/cd6f931223181d5a1d47cba64e857785a175a760/core/src/validator.rs#L867)) iletmeye çalışır. TPU, işlemleri beş farklı aşamada işler:

- [Fetch Stage](https://github.com/solana-labs/solana/blob/cd6f931223181d5a1d47cba64e857785a175a760/core/src/fetch_stage.rs#L21)(Getirme Aşaması)
- [SigVerify Stage](https://github.com/solana-labs/solana/blob/cd6f931223181d5a1d47cba64e857785a175a760/core/src/tpu.rs#L91)(İmza Doğrulama Aşaması)
- [Banking Stage](https://github.com/solana-labs/solana/blob/cd6f931223181d5a1d47cba64e857785a175a760/core/src/banking_stage.rs#L249)(Bankacılık Aşaması)
- [Proof of History Service](https://github.com/solana-labs/solana/blob/cd6f931223181d5a1d47cba64e857785a175a760/poh/src/poh_service.rs)(‘Proof of History’ Hizmeti)
- [Broadcast Stage](https://github.com/solana-labs/solana/blob/cd6f931223181d5a1d47cba64e857785a175a760/core/src/tpu.rs#L136)(Yayınlama Aşaması)

![TPU Overview](./retrying-transactions/tpu-jito-labs.png)
<small style="display:block;text-align:center;">Image Courtesy of Jito Labs</small>


Bu beş aşamadan, Getirme Aşaması işlemleri almaktan sorumludur. Getirme Aşamasında, validator’ler gelen işlemleri üç bağlantı noktasına göre sınıflandırır:

- [tpu](https://github.com/solana-labs/solana/blob/cd6f931223181d5a1d47cba64e857785a175a760/gossip/src/contact_info.rs#L27), token transferleri, NFT mintleme ve program talimatları gibi düzenli işlemleri gerçekleştirir.
- [tpu_vote](https://github.com/solana-labs/solana/blob/cd6f931223181d5a1d47cba64e857785a175a760/gossip/src/contact_info.rs#L31) yalnızca oylama işlemlerine odaklanır
- [tpu_forwards](https://github.com/solana-labs/solana/blob/cd6f931223181d5a1d47cba64e857785a175a760/gossip/src/contact_info.rs#L29), mevcut leader tüm işlemleri gerçekleştiremiyorsa, işlenmemiş paketleri bir sonraki leader’a iletir.

TPU hakkında daha fazla bilgi için lütfen [Jito Labs](https://jito-labs.medium.com/solana-validator-101-transaction-processing-90bcdc271143).'ın bu mükemmel yazısına bakın.

## How Transactions Get Dropped (İşlemler Nasıl Düşer)

Bir işlemin yolculuğu boyunca, işlemin istemeden ağdan düşebileceği birkaç senaryo vardır.

### Before a transaction is processed (İşlem işlenmeden önce)

Ağ bir işlemi bırakırsa, büyük olasılıkla işlem bir leader tarafından işlenmeden önce bunu yapacaktır. UDP [paket kaybı](https://en.wikipedia.org/wiki/Packet_loss) ,bunun olmasının en basit nedenidir. Yoğun ağ yükü zamanlarında, validator’ların işleme için gereken çok sayıda transaction’dan bunalması da mümkündür. Validator’lar, fazla işlemleri `tpu_forwards` aracılığıyla iletmek için donatılmış olsa da,[iletilebilecek](https://github.com/solana-labs/solana/blob/master/core/src/banking_stage.rs#L389)  veri miktarının bir sınırı vardır. Ayrıca, her ileri validator arasında tek bir atlama ile sınırlıdır. Yani, `tpu_forwards` bağlantı noktasında alınan işlemler diğer validator’lara iletilmez.

Ayrıca, bir işlemin işlenmeden önce iptal edilmesinin daha az bilinen iki nedeni vardır. İlk senaryo, bir RPC havuzu aracılığıyla gönderilen işlemleri içerir. Bazen, RPC havuzunun bir kısmı havuzun geri kalanından yeterince önde olabilir. Bu, havuz içindeki node’ların birlikte çalışması gerektiğinde sorunlara neden olabilir. Bu örnekte, işlemin [recentBlockhash](https://docs.solana.com/developing/programming-model/transactions#recent-blockhash)'i havuzun gelişmiş kısmından sorgulanır (Arka Uç A). İşlem havuzun gecikmeli kısmına (Arka Uç B) gönderildiğinde, node’lar gelişmiş blockhash tanımayacak ve işlemi bırakacaktır. Geliştiriciler `sendTransaction`'da ön kontrol kontrollerini[preflight checks](https://docs.solana.com/developing/clients/jsonrpc-api#sendtransaction) etkinleştirirse, bu işlem gönderimi sırasında tespit edilebilir.

![Dropped via RPC Pool](./retrying-transactions/dropped-via-rpc-pool.png)

Geçici olarak network fork da transaction’ların düşmesine neden olabilir. Bir validator, Bankacılık Aşamasında bloklarını tekrar oynatmak için yavaşsa, bir minority fork oluşturabilir. Bir müşteri bir işlem oluşturduğunda, işlemin yalnızca minority fork var olan bir `recentBlockhash`'e başvurması mümkündür. İşlem gönderildikten sonra, işlem işlenmeden önce cluster minority fork’tan geçebilir. Bu senaryoda, blockhash bulunamadığı için işlem bırakılır.

![Dropped due to Minority Fork (Before Processed)](./retrying-transactions/dropped-minority-fork-pre-process.png)

### After a transaction is processed and before it is finalized (İşlem işlendikten sonra ama sonuçlanmadan önce)

Bir işlemin bir minority fork’tan yeni bir Blockhash'e atıfta bulunması durumunda, işlemin işlenmesi hala mümkündür. Ancak bu durumda, leader tarafından minority fork’ta işlenir. Bu leader, işlenmiş işlemlerini ağın geri kalanıyla paylaşmaya çalıştığında, minority fork’u tanımayan doğrulayıcıların çoğunluğu ile fikir birliğine varamaz. Şu anda, işlem tamamlanamadan iptal edilecektir.

![Dropped due to Minority Fork (After Processed)](./retrying-transactions/dropped-minority-fork-post-process.png)


## Handling Dropped Transactions (Düşen İşlemleri Yönetme)

RPC node’lar işlemleri yeniden yayınlamaya çalışacak olsa da, kullandıkları algoritma geneldir ve genellikle belirli uygulamaların ihtiyaçları için uygun değildir. Ağ tıkanıklığı zamanlarına hazırlanmak için uygulama geliştiricilerin kendi yeniden yayın mantığını özelleştirmesi gerekir.
An In-Depth Look at sendTransaction (sendTransaction’a Derinden Bakış)

### An In-Depth Look at sendTransaction (sendTransaction’a Derinden Bakış)
İşlem gönderme söz konusu olduğunda, `sendTransaction` RPC yöntemi, geliştiricilerin kullanabileceği birincil araçtır. `sendTransaction`, yalnızca bir işlemi bir client’dan bir RPC node’a geçirmekten sorumludur. Node transaction’ı alırsa, `sendTransaction` transaction’ı izlemek için kullanılabilecek transaction id döndürür. Başarılı bir yanıt, işlemin cluster tarafından işlenip işlenmeyeceğini veya sonlandırılacağını göstermez.

:::İPUCU

#### Parametreleri Çağırmak

- `transaction`: `string` - encoded string olarak tam imzalı İşlem
- (optional) `configuration object`(yapılandırma nesnesi): `object`
    - `skipPreflight`: `boolean` - true ise, ön kontrol işlem kontrollerini atlayın (varsayılan: false)
    - (optional) `preflightCommitment`: `string` - Bank slotuna karşı ön kontrol simülasyonları için kullanılacak [Commitment](https://docs.solana.com/developing/clients/jsonrpc-api#configuring-state-commitment)(taahhüt) seviyesi (varsayılan: "kesinleşmiş").
    - (optional) `encoding`: `string`- İşlem verileri için kullanılan kodlama. Ya "base58" (yavaş) ya da "base64". (varsayılan: "base58").
    - (optional) `maxRetries`: `usize` - RPC node’un işlemi leader'a göndermeyi yeniden denemesi için maksimum sayı. Bu parametre sağlanmazsa, RPC node, tamamlanıncaya veya blockhash süresi dolana kadar işlemi yeniden deneyecektir.

#### Response

- `transaction id`: `string` - Temel 58 kodlu string olarak işleme gömülü ilk işlem imzası. Bu işlem kimliği, durum güncellemelerini yoklamak için [getSignatureStatuses](https://docs.solana.com/developing/clients/jsonrpc-api#getsignaturestatuses) ile kullanılabilir.
:::

## Customizing Rebroadcast Logic (Rebroadcast Logic Özelleştirme)

Geliştiriciler, kendi rebroadcasting logic’ini geliştirmek için `sendTransaction`'ın `maxRetries` parametresinden yararlanmalıdır. Sağlanırsa, `maxRetries`, bir RPC nodu’nun varsayılan yeniden deneme mantığını geçersiz kılarak geliştiricilerin yeniden deneme sürecini [makul sınırlar](https://github.com/solana-labs/solana/blob/98707baec2385a4f7114d2167ef6dfb1406f954f/validator/src/main.rs#L1258-L1274). içinde manuel olarak kontrol etmesine olanak tanır.

İşlemleri manuel olarak yeniden denemek için yaygın bir kalıp, [getLatestBlockhash](https://docs.solana.com/developing/clients/jsonrpc-api#getlatestblockhash)'ten gelen `lastValidBlockHeight`'ın geçici olarak depolanmasını içerir. Bir uygulama saklandıktan sonra [kümenin blok yüksekliğin](https://docs.solana.com/developing/clients/jsonrpc-api#getblockheight) sorguayabilir ve işlemi uygun bir aralıkta manuel olarak yeniden deneyebilir. Ağ tıkanıklığı zamanlarında, `maxRetries`'i 0'a ayarlamak ve özel bir algoritma aracılığıyla manuel olarak yeniden yayınlamak avantajlıdır. Bazı uygulamalar [üstel bir geri alma](https://en.wikipedia.org/wiki/Exponential_backoff) algoritması kullanabilirken, [Mango](https://www.mango.markets/) gibi diğerleri, belirli bir zaman aşımı gerçekleşene kadar işlemleri sabit bir aralıkta sürekli olarak [yeniden göndermeyi](https://github.com/blockworks-foundation/mango-ui/blob/b6abfc6c13b71fc17ebbe766f50b8215fa1ec54f/src/utils/send.tsx#L713) tercih eder.

```
while (blockheight < lastValidBlockHeight) {
  connection.sendRawTransaction(rawTransaction, {
    skipPreflight: true,
  });
  await sleep(500);
  blockheight = await connection.getBlockHeight();
}

```

`getLatestBlockhash` aracılığıyla seçim yaparken, uygulamalar amaçlanan [commitment](https://docs.solana.com/developing/clients/jsonrpc-api#configuring-state-commitment) seviyelerini belirtmelidir. Bir uygulama, `confirmed`(oylandı) veya `finalized` (`onaylandıktan` sonra ~30 blok) taahhüdünü belirleyerek, bir minority fork’tan bir blockhash yoklamaktan kaçınabilir.

Bir uygulamanın bir yük dengeleyicinin arkasındaki RPC node’lara erişimi varsa, iş yükünü belirli node’lar arasında bölmeyi de seçebilir. [getProgramAccounts](./get-program-accounts.md) gibi veri yoğun isteklere hizmet eden RPC node’lar, geride kalmaya eğilimli olabilir ve ayrıca işlemleri yönlendirmek için uygun olmayabilir. Zamana duyarlı işlemleri işleyen uygulamalar için, yalnızca `sendTransaction`'ı işleyen özel node’lara sahip olmak akıllıca olabilir.

### The Cost of Skipping Preflight (Ön Kontrolü Atlamanın Maliyeti)

Varsayılan olarak, `sendTransaction` bir işlemi göndermeden önce üç ön kontrol gerçekleştirecektir. Özellikle, `sendTransaction`:

- Tüm imzaların geçerli olduğunu doğrulayın
- Başvurulan blockhash’in son 150 blok içinde olup olmadığını kontrol edin
- `preflightCommitment` tarafından belirtilen banka yuvasına karşı işlemi simüle edin

Bu üç ön kontrol kontrolünden herhangi birinin başarısız olması durumunda, `sendTransaction` işlemi göndermeden önce bir hata verecektir. Ön kontrol kontrolleri, genellikle bir işlemi kaybetmek ile bir müşterinin bir hatayı zarif bir şekilde ele almasına izin vermek arasındaki fark olabilir. Bu yaygın hataların dikkate alındığından emin olmak için geliştiricilerin `skipPreflight`'ı `false` olarak ayarlaması önerilir.

### When to Re-Sign Transactions (İşlemler Ne Zaman Yeniden İmzalanmalı)

Tüm yeniden yayınlama girişimlerine rağmen, müşterinin bir işlemi yeniden imzalamasının gerekli olduğu zamanlar olabilir. Herhangi bir işlemi yeniden imzalamadan önce, ilk işlemin blockhash süresinin dolduğundan emin olmak çok önemlidir. İlk blockhash hala geçerliyse, her iki işlemin de ağ tarafından kabul edilmesi mümkündür. Bir son kullanıcıya bu, istemeden aynı işlemi iki kez göndermiş gibi görünebilir.

Solana'da, referans verdiği blockhash değeri `getLatestBlockhash`'ten alınan `lastValidBlockHeight` değerinden daha eski olduğunda, bırakılan bir işlem güvenli bir şekilde atılabilir. Geliştiriciler, [`getEpochInfo`](https://docs.solana.com/developing/clients/jsonrpc-api#getepochinfo)'yu sorgulayarak ve yanıtta `blockHeight` ile karşılaştırarak bu `lastValidBlockHeight`'ı takip etmelidir. Bir blockhash geçersiz kılındığında, müşteriler yeni sorgulanan bir blockhash ile yeniden imzalayabilirler.

## Acknowledgements (Teşekkürler)

İncelemeleri ve geri bildirimleri için Trent Nelson, [Jacob Creech](https://twitter.com/jacobvcreech), White Tiger, Le Yafo, [Buffalu](https://twitter.com/buffalu__) ve [Jito Labs](https://twitter.com/jito_labs)'a çok teşekkürler.
