# Programs (Programlar)

## Facts (Özet Bilgiler)

**Bilgi Tablosu**
- Programlar, hem son kullanıcılardan hem de diğer programlardan gelen [talimatları](./transactions) işler.
- Tüm programlar stateless’dır(durumsuzdur): etkileşime girdikleri tüm veriler, talimatlar yoluyla iletilen ayrı [account'larda](./accounts.md) saklanır.
- Programlar `executable (yürütülebilir)` olarak işaretlenmiş account'larda saklanır.
- Tüm programlar [BPF Loader](https://docs.solana.com/developing/runtime-facilities/programs#bpf-loader)'a aittir ve [Solana Runtime](https://docs.solana.com/developing/programming-model/runtime) tarafından yürütülür.
- Geliştiriciler en yaygın olarak Rust veya C++'da programlar yazarlar, ancak [LLVM](https://llvm.org/)'nin [BPF](https://en.wikipedia.org/wiki/Berkeley_Packet_Filter) arka ucunu hedefleyen herhangi bir dili seçebilirler.
- Tüm programların, talimat işlemenin gerçekleştiği tek bir giriş noktası vardır. 
(`process_instruction`); parametreler her zaman şunları içerir:
    - `program_id`: `pubkey`
    - `accounts`: `array`, 
    - `instruction_data`: `byte array`

## Deep Dive (Derinlemesine Bakış)

Diğer birçok blockchainden farklı olarak Solana, kodu verilerden tamamen ayırır. Programların etkileşimde bulunduğu tüm veriler ayrı account'larda saklanır ve talimatlar aracılığıyla referans olarak iletilir. Bu model, tek bir genel programın ek dağıtımlar gerektirmeden çeşitli account'larda çalışmasına izin verir. Bu kalıbın yaygın örnekleri, Native(yerel) ve SPL Programlarında görülür.

### Native Program’lar & Solana Program Library (SPL)

Solana, on-chain etkileşimler için temel yapı taşları olarak hizmet eden bir dizi programla donatılmış olarak gelir. Bu programlar Native Programlar ve Solana Program Library (SPL) Programları olarak ikiye ayrılır.

Native Program’lar, validator’leri çalıştırmak için gereken temel işlevleri sağlar. Bu programlar arasında en çok bilineni, yeni account’ların yönetilmesinden ve iki taraf arasında SOL transferinden sorumlu olan Sistem Programıdır.

SPL Programları, token oluşturma, takas etme ve ödünç vermenin yanı sıra stake pool (hisse havuzu) oluşturma ve on-chain name service dahil olmak üzere bir dizi on-chain etkinliği destekler. SPL Token Programı doğrudan CLI aracılığıyla çağrılabilirken, [Associated Token Account Program](https://spl.solana.com/associated-token-account) gibi diğerleri genellikle özel programlardan oluşur.

### Writing Programs (Program Yazma)

Programlar en yaygın olarak Rust veya C++ ile geliştirilir, ancak LLVM'nin BPF arka ucunu hedefleyen herhangi bir dille geliştirilebilir. [Neon Labs](https://neon-labs.org/) ve [Solang](https://solang.readthedocs.io/en/latest/)'ın son girişimleri, [EVM](https://ethereum.org/en/developers/docs/evm/) uyumluluğunu mümkün kılar ve geliştiricilerin Solidity'de programlar yazmasına olanak tanır.

Rust tabanlı programların çoğu aşağıdaki mimariye uyar:

| Dosya             | Açıklama                                             |
|-------------------|------------------------------------------------------|
| lib.rs            | Modüllerin kaydedilmesi                              |
| entrypoint.rs     | Programa başlangıç                                   |
| instruction.rs    | Program API'si, komut verilerini (de)serialize etme  |
| processor.rs      | Program mantığının bulunduğu bölüm                   |
| state.rs          | Program nesneleri, durumu (de) serialize etme        |
| error.rs          | Programa özgü hatalar                                |

Son zamanlarda, [Anchor](https://github.com/coral-xyz/anchor) program geliştirmek için popüler bir framework olarak ortaya çıkmıştır. Anchor, Ruby on Rails'e benzeyen, Rust tabanlı geliştirme için (de)serialization sürecini kolaylaştıran, üzerinde düşünülmüş bir frameworktür.


Programlar genellikle *Testnet* veya *Mainnet*'e dağıtılmadan önce *Localhost* ve *Devnet* geliştirilir ve test edilir. Solana aşağıdaki ortamları destekler:

| Cluster Environmen        | RPC Connection URL                                                        |
|---------------------------|---------------------------------------------------------------------------|
| Mainnet-beta              | https://api.mainnet-beta.solana.com                                       |
| Testnet                   | https://api.testnet.solana.com                                            |
| Devnet                    | https://api.devnet.solana.com                                             |
| Localhost                 | Default port: 8899 (e.g. http://localhost:8899, http://192.168.1.88:8899) |

Bir ortamda deploy edildikten sonra Client’lar ilgili cluster'la olan [RPC bağlantıları](https://docs.solana.com/developing/clients/jsonrpc-api) aracılığıyla on-chain programlarla etkileşime girebilir.

### Deploying Programs (Programları Çalıştırma)

Geliştiriciler programlarını [CLI](https://docs.solana.com/cli/deploy-a-program) aracılığıyla çalıştırabilir:

```bash
solana program deploy <PROGRAM_FILEPATH>
```

Bir program çalıştığında, bir [ELF](https://en.wikipedia.org/wiki/Executable_and_Linkable_Format) shared object’e (BPF bayt kodu içeren) derlenir ve Solana cluster’a yüklenir. Programlar account’larda yaşar (Solana'daki diğer her şey gibi), ancak bu account'lar `executable` olarak işaretlenir ve BPF Loader’a atanır. Bu account’ın adresi `program_id` olarak adlandırılır ve gelecekteki tüm işlemlerde programa başvurmak için kullanılır.

Solana, Upgradable BPF Loader da dahil olmak üzere birden fazla BPF Loader’ı destekler. BPF Loader, programın account’ını yönetmekten ve `program_id` aracılığıyla client’lara (client’lara) sunmaktan sorumludur. Tüm programlarda instruction işlemenin gerçekleştiği tek bir giriş noktası vardır (`proses_instruction`) ve parametreler her zaman şunları içerir:
- `program_id`: `pubkey`
- `accounts`: `array`, 
- `instruction_data`: `byte array`

Çağrıldıklarında programlar Solana Runtime tarafından yürütülür.

## Other Resources (Diğer Kaynaklar)

- [Official Documentation](https://docs.solana.com/developing/on-chain-programs/overview)
- [SPL Documentation](https://spl.solana.com/)
- [Program Deploys by Justin Starry](https://jstarry.notion.site/Program-deploys-29780c48794c47308d5f138074dd9838)
- [Solana Starter Kit by Iron Addicted Dog](https://book.solmeet.dev/notes/solana-starter-kit)
- [Programming on Solana by Paulx](https://paulx.dev/blog/2021/01/14/programming-on-solana-an-introduction/)
- [An Introduction to the Solana Blockchain by Hana](https://2501babe.github.io/posts/solana101.html)
- [Anchor](https://github.com/coral-xyz/anchor)
