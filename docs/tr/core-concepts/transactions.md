# Transactions (İşlemler)

Client’lar, bir cluster’a bir transaction (işlem) göndererek [programları](./programs.md) çağırabilir. Tek bir işlem, her biri kendi programını hedefleyen birden fazla talimat içerebilir. Bir işlem gönderildiğinde, Solana [Runtime](https://docs.solana.com/developing/programming-model/runtime) talimatlarını sırayla ve atomik olarak işleyecektir. Bir talimatın herhangi bir kısmı başarısız olursa, tüm işlem başarısız olur.

## Facts (Özet Bilgiler)

**Bilgi Tablosu**
- Instruction’lar(talimatlar) Solana'daki en temel operasyonel birimdir.
- Her instruction şunları içerir:
    - Amaçlanan programın `program_id`'si
    - Okumak veya yazmak istediği tüm `account`’ların array’i
    - Amaçlanan programa özel bir `instruction_data` byte array’i
- Birden fazla talimat tek bir transaction’da(işlemde) toplanabilir.
- Her işlem şunları içerir:
    - Okumak veya yazmak istediği tüm `account`’ların array’i
    - Bir veya daha fazla `instruction`
    - Yakın zamanda bir `blockhash`
    - Bir veya daha fazla `signature`(imza)
- Instruction’lar sırayla ve atomik olarak işlenir.
- Bir instruction’ın herhangi bir kısmı başarısız olursa, transaction’ın tamamı başarısız olur.
- Transaction’lar 1232 bayt ile sınırlıdır.


## Deep Dive (Derinlemesine Bakış)

Solana Runtime, okumak veya yazmak istedikleri tüm account’ların bir listesini belirtmek için hem instructions hem de transactions gerektirir. Bu account’ları önceden talep ederek, çalışma zamanı tüm transaction’larda yürütmeyi paralel hale getirebilir.

Bir transaction bir kümeye gönderildiğinde, çalışma zamanı instruction’larını sırayla ve atomik olarak işleyecektir. Her talimat için, alıcı program kendi veri dizisini yorumlayacak ve belirtilen account’ları üzerinde çalışacaktır. Program ya başarılı bir şekilde ya da bir hata koduyla dönecektir. Bir hata döndürülürse, tüm işlem hemen başarısız olur.

Bir account’ı borçlandırmayı veya verilerini değiştirmeyi amaçlayan herhangi bir transaction, account sahibinin imzasını gerektirir. Değiştirilecek herhangi bir account `writable`(yazılabilir) olarak işaretlenir. Transaction ücretini ödeyen kişi, gerekli rent ve transaction ücretlerini karşıladığı sürece, sahibinin izni olmadan bir account’a kredi verilebilir.

Gönderilmeden önce, tüm transaction’lar son bir blockhash’e referans vermelidir. Blockhash, tekrarları önlemek ve eski transaction’ları ortadan kaldırmak için kullanılır. Bir işlemin blockhash’inin maksimum yaşı 150 blok veya bu yazının yazıldığı zaman itibariyle yaklaşık ~1 dakika 19 saniyedir.

### Fees (Ücretler)

Solana ağı iki tür ücret toplar:
- Yayılan işlemler için [transaction ücreti](https://docs.solana.com/transaction_fees) ("gaz ücretleri" olarak da bilinir) 
- Zincir üzerinde veri depolamak için [rent ücreti](https://docs.solana.com/developing/programming-model/accounts#rent)

Solana'da işlem ücretleri belirlidir: Kullanıcıların bir sonraki bloğa dahil olma şanslarını artırmak için daha yüksek ücretler ödeyebilecekleri bir ücret piyasası kavramı yoktur. Bu yazının yazıldığı tarihte, işlem ücretleri kullanılan kaynak miktarına göre değil, yalnızca gereken imza sayısına (`lamports_per_signature`) göre belirlenir. Bunun nedeni, şu anda tüm işlemlerde 1232 baytlık bir sabit sınır bulunmasıdır.

Tüm işlemler, işlemi imzalamak için en az bir writable account(yazılabilir hesap) gerektirir. Gönderildikten sonra, ilk olarak seri hale getirilen writable signer account ücreti ödeyen kişi olacaktır. Bu account, işlemin başarılı veya başarısız olmasına bakılmaksızın işlem maliyetini ödeyecektir. Ücret ödeyen kişinin işlem ücretini ödemek için yeterli bakiyesi yoksa işlem düşer.

Bu yazının yazıldığı sırada, tüm işlem ücretlerinin %50'si bloğu üreten validator(doğrulayıcı) tarafından alınırken, kalan %50'si yakılır(burn). Bu yapı, validator’leri leader programı sırasında mümkün olduğunca çok işlemi işlemeye teşvik etmek için çalışır.

## Other Resources (Diğer Kaynaklar)

- [Official Documentation](https://docs.solana.com/developing/programming-model/transactions)
- [Transaction Structure](https://solana.wiki/docs/solidity-guide/transactions/#solana-transaction-structure)
- [Transaction Fees by Justin Starry](https://jstarry.notion.site/Transaction-Fees-f09387e6a8d84287aa16a34ecb58e239)
- [An Introduction to Solana by Hana](https://2501babe.github.io/posts/solana101.html)
- [Transaction Processing by Jito Labs](https://jito-labs.medium.com/solana-validator-101-transaction-processing-90bcdc271143)
- [Solana Transaction in Depth by Alex Miller](https://medium.com/@asmiller1989/solana-transactions-in-depth-1f7f7fe06ac2)
