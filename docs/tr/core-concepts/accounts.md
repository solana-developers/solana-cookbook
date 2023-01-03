# Accounts (Account’lar)

Solana içindeki account’lar (hesaplar), durumu saklamak için kullanılır. Account, Solana'da gelişme yapmak için önemli bir yapı taşıdır.

## Facts (Özet Bilgiler)

**Bilgi tablosu**

- Account’lar veri depolamak için kullanılır.
- Her account'ın benzersiz bir adresi vardır.
- Account’ların maksimum boyutu 10 MB (10 Mega Bayt)’dır.
- PDA account'larının maksimum boyutu 10 KB (10 Kilo Bayt)’dır.
- PDA account'ları, bir program adına imzalamak için kullanılabilir.
- Account boyutu oluşturma sırasında sabitlenir, ancak realloc kullanılarak ayarlanabilir.
- Account veri depolaması rent ile ödenir.
- Varsayılan account sahibi Sistem Programıdır.

## Deep Dive (Derinlemesine Bakış)

### Account Model (Account Modeli)

Solana'da 3 çeşit account vardır:

- Veri account'ları, verileri depolar.
- Program account'ları, executable programları depolar.
- System, Stake ve Vote gibi yerel programları gösteren yerel account'lar bulunur.

Veri account'larının 2 türü bulunur:

- Sisteme ait account'lar
- PDA (Program Derived Address/Programdan Türetilmiş Adres) account'ları


Her account'ın bir adresi (genellikle bir public key) ve bir sahibi (bir program account'ının adresi) vardır. Bir account'ın depoladığı tam alan listesi aşağıda bulunur.

| Alan        | Açıklaması                                                    |
| ------------| --------------------------------------------------------------|
| lamports    | Hesaba ait "lamport" sayısı                                   |
| owner       | Account sahibi                                                |
| executable  | Hesabın talimatları işleyip işleyemeyeceği bilgisi            |
| data        | Account tarafından depolanan ham veri byte array              |
| rent_epoch  | Bu account'ın rent borcu olacağı bir sonraki epoch            |

Birkaç önemli sahiplik kuralı vardır:

- Yalnızca bir data account'ının sahibi, lamports verilerini ve borç bilgisini değiştirebilir.
- Herhangi birinin bir data account'ına Lamports kredisi vermesine izin verilir.
- Hesabın verileri sıfırlanırsa, bir account'ın sahibi yeni bir sahip atayabilir.
- Program account'ları durumu saklamaz.


Örneğin, bir sayacı artırmanıza izin veren bir sayaç programınız varsa, biri program kodunu depolamak için diğeri de sayacı depolamak için iki account oluşturmanız gerekir.

![](./account_example.jpeg)

Bir account'ın silinmesini önlemek için rent ödemeniz gerekir.

### Rent

Hesaplarda veri depolamanın bakımı SOL gerektirir ve rent(kira) ile finanse edilir. Bir account'ta en az 2 yıllık rent ödemesine eşdeğer bir bakiyeniz varsa, account'ınız rent ödemekten muaf tutulacaktır. Hesabı kapatarak ve Lamport'ları cüzdanınıza geri göndererek rent’i geri alabilirsiniz.

Rent iki farklı zamanlamada ödenir:

1. Bir işlem tarafından referans alındığında
2. Her bir epoch(döngü)’da

Hesaplar tarafından toplanan rent’in belirli bir bölümü yok edilirken geri kalanı her slotun sonunda vote account'larına dağıtılır.

Hesabın rent ödemesi için yeterli olmaması durumunda, account serbest bırakılır ve veriler silinir.

Yeni account'ların rent ödemesinden muaf olması gerektiğini de belirtmek önemlidir.

## Other Resources (Diğer Kaynaklar)

- [Solana Hesap Modeli](https://solana.wiki/zh-cn/docs/account-model/#account-storage)
- [Resmi Dokümantasyon](https://docs.solana.com/developing/programming-model/accounts)
- [Pencilflip Account Threadi](https://twitter.com/pencilflip/status/1452402100470644739)

### Referans

Bu bilgiler Pencilflip tarafından yazıldı, kendisini [Twitter](https://twitter.com/intent/user?screen_name=pencilflip)’dan takip edebilirsiniz.
