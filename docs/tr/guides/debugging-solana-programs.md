# Debugging Solana Programs (Solana Programlarında Hata Ayıklama)

Bir Solana programını test etmek ve hata ayıklamak için bir dizi seçenek ve destekleyici araç vardır.

## Facts (Özet Bilgiler)
:::Bilgi Tablosu

- Crate `solana-program-test`, programınızı etkileşimli olarak test edebileceğiniz ve hatalarını ayıklayabileceğiniz (örn. vscode’da) temel yerel çalışma zamanının kullanılmasını sağlar.
- Crate `solana-validator`, **yerel bir validator node**’da gerçekleşen daha sağlam testler için `solana-test-validator` uygulamasının kullanılmasını sağlar. Düzenleyiciden çalıştırabilirsiniz **ancak programdaki kesme noktaları yok sayılır**.
- CLI aracı `solana-test-validator` programınızı çalıştırır & yükler ve komut satırı Rust uygulamalarından veya web3 kullanan Javascript/Typescript uygulamalarından işlem yürütmeyi sağlar.
- Yukarıdaki tüm durumlar için, programınızda `msg!` makrosunun liberal bir şekilde kullanımı önerilir ve daha sonra test etme ve solid davranışı sağlama gerektiğinde bunları kaldırın. Unutmayın ki `msg!` Compute Units tüketir, bu nedenle Compute Unit bütçesi sınırlarını zorlayarak programınızı başarısızlığa uğratabilir.
:::

Aşağıdaki bölümlerdeki adımlar [solana-program-bpf-template](#resources) kullanır. Bunu makinenize klonlayın:

```bash
git clone git@github.com:mvines/solana-bpf-program-template.git
cd solana-bpf-program-template
code .
```

## Runtime Testing and Debugging in editor (Editörde Runtime Test ve Hata Ayıklama)

`src/lib.rs` dosyasını açın

1. `#[cfg(test)]` bölümüne gidin ve `Run Tests`'e tıklayın. Bu, programı oluşturacak ve ardından `async fn test_transaction()` testini yürütecektir. Kaynağın altındaki vscode terminalinde günlük mesajlarını (basitleştirilmiş) göreceksiniz.
```bash
running 1 test
"bpf_program_template" program loaded as native code
Program 4uQeVj5tqViQh7yWWGStvkEG1Zmhx6uasJtWCJziofM invoke [1]
Program log: process_instruction: 4uQeVj5tqViQh7yWWGStvkEG1Zmhx6uasJtWCJziofM: 1 accounts, data=[1, 2, 3]
Program 4uQeVj5tqViQh7yWWGStvkEG1Zmhx6uasJtWCJziofM success
test test::test_transaction ... ok
test result: ok. 1 passed; 0 failed; 0 ignored; 0 measured; 0 filtered out; finished in 33.41s
```

2. Programların msg! satırında bir kesme noktası ayarlayın (11)
3. Test modülüne geri dönün, `Debug`'a tıklayın ve saniyeler içinde hata ayıklayıcı kesme noktasında duracaktır ve şimdi verileri inceleyebilirsiniz, işlevler arasında adım adım, vb.

Bu testler ayrıca şu komut satırından yürütülür: `cargo test` veya `cargo test-bpf`. Elbette herhangi bir kesme noktası göz ardı edilecektir.

Harika gidiyorsun!

:::Not

Validator node kullanmadığınızı ve bu nedenle varsayılan programlar, blockhash vb.'nin temsil edilmediğini veya validator node çalışırken olduğu gibi davranmayacağınızı unutmayın. Bu yüzden Solana'da ekibi bize Local Validator Node testi verdi!
:::

## Local Validator Node Testing in editor (Düzenleyicide Yerel Doğrulayıcı Node Testi)

Yerel bir validator node’un programlı yüklenmesini kullanan entegrasyon testi, `tests/integration.rs` dosyasında tanımlanır.

Varsayılan olarak, şablon deposu entegrasyon testleri yalnızca `cargo test-bpf` kullanılarak komut satırından çalıştırılabilir. Aşağıdaki adımlar, düzenleyici içinde çalışmanıza ve programınızdan program doğrulayıcı günlüklerini ve `msg!` çıktılarını görüntülemenize olanak tanır:

1. Örnek programı oluşturmak için repo dizininde `cargo build-bpf` komutunu çalıştırın
2. Düzenleyicide, `tests/integration.rs` dosyasını açın
3. 1. satırı yorumlayın ->`// #![cfg(feature = "test-bpf")]`
4. 19. satırda şunu okuyun: `.add_program("target/deploy/bpf_program_template", program_id)`
5. Aşağıdakini 22. satıra yerleştirin: `solana_logger::setup_with_default("solana_runtime::message=debug");`
6. `test_validator_transaction()` işlevinin üzerindeki `Run Test`'e tıklayın

Bu, validator node’u yükleyecek ve ardından bir işlem (Rust yolu) oluşturmanıza ve `RcpClient`'i kullanarak node’a göndermenize izin verecektir.

Programın çıktısı da editör terminalinde yazdırılacaktır. Örneğin (basitleştirilmiş):
```bash
running 1 test
Waiting for fees to stabilize 1...
Waiting for fees to stabilize 2...
Program 4uQeVj5tqViQh7yWWGStvkEG1Zmhx6uasJtWCJziofM invoke [1]
Program log: process_instruction: 4uQeVj5tqViQh7yWWGStvkEG1Zmhx6uasJtWCJziofM: 1 accounts, data=[1, 2, 3]
Program 4uQeVj5tqViQh7yWWGStvkEG1Zmhx6uasJtWCJziofM consumed 13027 of 200000 compute units
Program 4uQeVj5tqViQh7yWWGStvkEG1Zmhx6uasJtWCJziofM success

test test_validator_transaction ... ok
test result: ok. 1 passed; 0 failed; 0 ignored; 0 measured; 0 filtered out; finished in 6.40s
```

Burada hata ayıklama, test gövdesinde kullanılan işlevler ve yöntemlerde hata ayıklamanıza izin verir ancak programınızda kesme noktası oluşturmaz.

Mükemmel değil mi?

## Local Validator Node Testing from Client Apps (Client Uygulamalarında Yerel Validator Node Testi)

Son olarak, yerel bir validator node’u başlatabilir ve komut satırından solana-test-validator kullanarak programınızı ve tüm account'larınızı yükleyebilirsiniz.

Bu yaklaşımda, ya Rust [RcpClient](#resources) kullanan ya da JavaScript veya TypeScript client'larında bir client uygulamasına ihtiyacınız olacak.

Daha fazla ayrıntı ve seçenek için `solana-test-validator --help` bölümüne [JavaScript veya Typescript clients](#resources)’larına bakın. Örnek program için kurulum burada:

1. Repo klasöründe bir terminal açın
2. Yapılandırmayı yerele işaret edecek şekilde ayarlamak için `solana config set -ul` komutunu çalıştırın
3. `solana-test-validator --bpf-program target/deploy/bpf_program_template-keypair.json target/deploy/bpf_program_template.so`'yu çalıştırın
4. Başka bir terminal açın ve günlük aktarıcıyı başlatmak için `solana logs`’u çalıştırın
5. Daha sonra client programınızı çalıştırabilir ve günlük aktarıcıyı başlattığınız terminalde program çıktısını gözlemleyebilirsiniz.

## Resources
[solana-program-bpf-template](https://github.com/mvines/solana-bpf-program-template)

[RcpClient](https://docs.rs/solana-client/latest/solana_client/rpc_client/struct.RpcClient.html)

[JavaScript/Typescript Library](https://solana-labs.github.io/solana-web3.js/)
