# Feature Parity Testing (Özellik Parite Testi)

Programınızı test ederken, çeşitli kümelerde aynı şekilde çalışacağının güvencesi, hem kalite hem de beklenen sonuçların üretilmesi için esastır.

## Facts (Özet Bilgiler)
:::Bilgi Tablosu

Features, Solana doğrulayıcılarına sunulan ve kullanılması için etkinleştirme gerektiren yeteneklerdir.
Features bir kümede (ör. testnet) etkinleştirilebilir, ancak başka bir kümede (ör. ana ağ-beta) etkinleştirilemez.
Yine de; varsayılan solana-test-validator'ı yerel olarak çalıştırırken, Solana sürümünüzdeki mevcut tüm özellikler otomatik olarak etkinleştirilir. Sonuç olarak, yerel olarak test ederken, farklı bir kümede dağıtırken ve çalıştırırken testinizin yetenekleri ve sonuçları aynı olmayabilir!
:::
## Scenario (Senaryo)

Üç (3) talimat içeren bir işleminiz olduğunu ve her talimatın yaklaşık 100_000 İşlem Birimi (Compute Unit - CU) tükettiğini varsayalım. Bir Solana 1.8.x sürümünde çalışırken, talimat CU tüketiminizi aşağıdakine benzer şekilde gözlemlersiniz:


| Instruction | Starting CU | Execution | Remaining CU|
| - | - | - | - |
| 1 | 200_000 | -100_000| 100_000
| 2 | 200_000 | -100_000| 100_000
| 3 | 200_000 | -100_000| 100_000


Solana 1.9.2'de, bir işlemin varsayılan olarak 200_000 CU bütçesine sahip olduğu ve kapsüllenmiş talimatların bu işlem bütçesinden çekildiği 'transaction işlem sınırı' adı verilen bir özellik vardır. Yukarıda belirtildiği gibi aynı işlemi çalıştırmak çok farklı davranışlara sahip olacaktır:

| Instruction | Starting CU | Execution | Remaining CU|
| - | - | - | - |
| 1 | 200_000 | -100_000| 100_000
| 2 | 100_000 | -100_000| 0
| 3 | 0 | HATA!!! | HATA!!!


Evet! Bundan habersiz olsaydınız, talimat davranışınızda buna neden olacak bir değişiklik olmadığı için muhtemelen hayal kırıklığına uğrarsınız. Devnet'te iyi çalıştı, ancak yerel olarak başarısız mı oldu?!?

Örneğin 300_000 CU gibi genel İşlem bütçesini artırma ve akıl sağlığınızı koruma olanağı vardır, ancak bu, Feature Parity (Özellik Eşliği) ile testin neden herhangi bir karışıklığı önlemek için proaktif bir yol sağladığını gösterir.

## Feature Status (Özellik Durumu)
Solana feature status komutuyla belirli bir küme için hangi özelliklerin etkinleştirildiğini kontrol etmek oldukça kolaydır.

```console
solana feature status -ud   // Displays by feature status for devnet
solana feature status -ut   // Displays for testnet
solana feature status -um   // Displays for mainnet-beta
solana feature status -ul   // Displays for local, requires running solana-test-validator
```

Alternatif olarak, kümeler genelinde tüm özellik durumunu gözlemlemek için `solana-test-validator`'ın çalışmasını gerektirmeyen ve aşağıdaki ekranda gösterilen [scfsd](#resources) gibi bir araç kullanabilirsiniz:

<img src="./feature-parity-testing/scfsd.png" alt="Feature Status Heatmap">

## Parity Testing (Parite Testi)

Yukarıda belirtildiği gibi, `solana-test-validator`, **tüm** özellikleri otomatik olarak etkinleştirir. "Devnet, testnet ve hatta mainnet-beta ile paritesi olan bir ortamda yerel olarak nasıl test edebilirim?" sorusuna cevap verecek olursak:

Çözüm: Özelliklerin devre dışı bırakılmasına izin vermek için Solana 1.9.6'ya PR'ler eklendi:
```console
solana-test-validator --deactivate-feature <FEATURE_PUBKEY> ...
```

## Simple Demonstration (Basit Gösterim)

Aldığı verileri giriş noktasında kaydeden basit bir programınız olduğunu varsayalım. Ve programınız için iki (2) talimat ekleyen bir işlemi test ediyorsunuz.

### All features activated (Tüm özellikler aktifleştirildi)

1. Test doğrulayıcıyı bir terminalde başlatırsınız:

```console
solana config set -ul
solana-test-validator -l ./ledger --bpf-program ADDRESS target/deploy/PROGNAME.so --reset`
```

2. Başka bir terminalde günlük aktarıcıyı başlatırsınız:

```console
solana logs
```

3. Daha sonra işleminizi yürütürsünüz. Günlük terminalinde benzer bir şey görürsünüz (netlik için düzenlenmiştir):

```console
Program PWDnx8LkjJUn9bAVzG6Fp6BuvB41x7DkBZdo9YLMGcc invoke [1]
Program log: process_instruction: PWDnx8LkjJUn9bAVzG6Fp6BuvB41x7DkBZdo9YLMGcc: 0 accounts, data=[0]
Program PWDnx8LkjJUn9bAVzG6Fp6BuvB41x7DkBZdo9YLMGcc consumed 12843 of 200000 compute units
Program PWDnx8LkjJUn9bAVzG6Fp6BuvB41x7DkBZdo9YLMGcc success
Program PWDnx8LkjJUn9bAVzG6Fp6BuvB41x7DkBZdo9YLMGcc invoke [1]
Program log: process_instruction: PWDnx8LkjJUn9bAVzG6Fp6BuvB41x7DkBZdo9YLMGcc: 0 accounts, data=[1]
Program PWDnx8LkjJUn9bAVzG6Fp6BuvB41x7DkBZdo9YLMGcc consumed 12843 of 187157 compute units
Program PWDnx8LkjJUn9bAVzG6Fp6BuvB41x7DkBZdo9YLMGcc success[
```

'transaction işlem sınırı' özelliğimiz varsayılan olarak otomatik olarak etkinleştirildiğinden, her talimatın CU'yu başlangıç İşlem bütçesi olan 200_000 CU'dan aşağı çektiğini gözlemleriz.

### Selective features deactivated (Seçici özellikler devre dışı bırakıldı)

Bu çalıştırma için, CU bütçe davranışının devnet'te yürütülenle aynı olması için çalıştırmak istiyoruz. Feature Status’ta açıklanan araç(lar)ı kullanarak, işlem genelinde işlem üst sınırı public key’i izole eder ve test doğrulayıcı başlangıcında `--deactivate-feature` kullanırız.

```console
solana-test-validator -l ./ledger --deactivate-feature 5ekBxc8itEnPv4NzGJtr8BVVQLNMQuLMNQQj7pHoLNZ9 --bpf-program target/deploy/PROGNAME.so --reset`
```

Artık günlüklerimizde, talimatlarımızın şu anda tüm yukarı akış kümelerinde durum olan kendi 200_000 CU bütçesine (açıklık için düzenlenmiş) sahip olduğunu görüyoruz:

```console
Program PWDnx8LkjJUn9bAVzG6Fp6BuvB41x7DkBZdo9YLMGcc invoke [1]
Program log: process_instruction: PWDnx8LkjJUn9bAVzG6Fp6BuvB41x7DkBZdo9YLMGcc: 0 accounts, data=[0]
Program PWDnx8LkjJUn9bAVzG6Fp6BuvB41x7DkBZdo9YLMGcc consumed 12843 of 200000 compute units
Program PWDnx8LkjJUn9bAVzG6Fp6BuvB41x7DkBZdo9YLMGcc success
Program PWDnx8LkjJUn9bAVzG6Fp6BuvB41x7DkBZdo9YLMGcc invoke [1]
Program log: process_instruction: PWDnx8LkjJUn9bAVzG6Fp6BuvB41x7DkBZdo9YLMGcc: 0 accounts, data=[0]
Program PWDnx8LkjJUn9bAVzG6Fp6BuvB41x7DkBZdo9YLMGcc consumed 12843 of 200000 compute units
Program PWDnx8LkjJUn9bAVzG6Fp6BuvB41x7DkBZdo9YLMGcc success
```



Full Parity Testing (Tam Parite Testi)
Henüz etkinleştirilmemiş her bir özelliği tanımlayarak ve `solana-test-validator`'ı çağırırken her biri için bir `--deactivate-feature <FEATURE_PUBKEY>` ekleyerek belirli bir küme ile tam eşlilik içinde olabilirsiniz:

```console
solana-test-validator --deactivate-feature PUBKEY_1 --deactivate-feature PUBKEY_2 ...
```

Alternatif olarak, scfsd, bir kümenin doğrudan `solana-test-validator` başlangıcına beslenmesi için tüm devre dışı bırakılmış özellik setinin çıktısını almak için bir komut anahtarı sağlar:

```console
solana-test-validator -l ./.ledger $(scfsd -c devnet -k -t)
```

Doğrulayıcı çalışırken başka bir terminal açarsanız ve `solana feature status`’ın devnet'te devre dışı bulunan özelliklerin devre dışı olduğunu göreceksiniz.

## Full Parity Testing Programmatically (Programlı Olarak Tam Parite Testi)

Test doğrulayıcının kendi test kodu içinde çalıştırılmasını kontrol edenler için, TestValidatorGenesis kullanılarak test doğrulayıcı etkinleştirilen/devre dışı bırakılan özelliklerin değiştirilmesi mümkündür. Solana 1.9.6 ile bunu desteklemek için doğrulayıcı oluşturucuya bir işlev eklendi.

Program klasörünüzün kökünde, `tests` adlı yeni bir klasör oluşturun ve bir `parity_test.rs` dosyası ekleyin. İşte her test tarafından kullanılan bazı genel fonksiyonlar:
```rs
/// Setup the test validator passing features
/// you want to deactivate before running transactions
pub fn setup_validator(
    invalidate_features: Vec<Pubkey>,
) -> Result<(TestValidator, Keypair), Box<dyn error::Error>> {
    // Extend environment variable to include our program location
    std::env::set_var("BPF_OUT_DIR", PROG_PATH);
    // Instantiate the test validator
    let mut test_validator = TestValidatorGenesis::default();
    // Once instantiated, TestValidatorGenesis configuration functions follow
    // a builder pattern enabling chaining of settings function calls
    let (test_validator, kp) = test_validator
        // Set the ledger path and name
        // maps to `solana-test-validator --ledger <DIR>`
        .ledger_path(LEDGER_PATH)
        // Load our program. Ignored if reusing ledger
        // maps to `solana-test-validator --bpf-program <ADDRESS_OR_PATH BPF_PROGRAM.SO>`
        .add_program(PROG_NAME, PROG_KEY)
        // Identify features to deactivate. Ignored if reusing ledger
        // maps to `solana-test-validator --deactivate-feature <FEATURE_PUBKEY>`
        .deactivate_features(&invalidate_features)
        // Start the test validator
        .start();
    Ok((test_validator, kp))
}

/// Convenience function to remove existing ledger before TestValidatorGenesis setup
/// maps to `solana-test-validator ... --reset`
pub fn clean_ledger_setup_validator(
    invalidate_features: Vec<Pubkey>,
) -> Result<(TestValidator, Keypair), Box<dyn error::Error>> {
    if PathBuf::from_str(LEDGER_PATH).unwrap().exists() {
        std::fs::remove_dir_all(LEDGER_PATH).unwrap();
    }
    setup_validator(invalidate_features)
}

/// Submits a transaction with programs instruction
/// Boiler plate
fn submit_transaction(
    rpc_client: &RpcClient,
    wallet_signer: &dyn Signer,
    instructions: Vec<Instruction>,
) -> Result<Signature, Box<dyn std::error::Error>> {
    let mut transaction =
        Transaction::new_unsigned(Message::new(&instructions, Some(&wallet_signer.pubkey())));
    let recent_blockhash = rpc_client
        .get_latest_blockhash()
        .map_err(|err| format!("error: unable to get recent blockhash: {}", err))?;
    transaction
        .try_sign(&vec![wallet_signer], recent_blockhash)
        .map_err(|err| format!("error: failed to sign transaction: {}", err))?;
    let signature = rpc_client
        .send_and_confirm_transaction(&transaction)
        .map_err(|err| format!("error: send transaction: {}", err))?;
    Ok(signature)
}
```
 
Şimdi, `mod test {...}` gövdesine test işlevleri ekleyebiliriz. Bu sayede, varsayılan doğrulayıcı kurulumunu (tüm özellikler etkin) gösterebilir ve ardından `transaction wide compute cap`’i devre dışı bırakibiliriz (`solana-test-validator` çalıştıran önceki örneklerde olduğu gibi).

```rs
#[test]
fn test_deactivate_tx_cu_pass() {
    // Run with all features activated except 'transaction wide compute cap'
    let inv_feat = vec![TXWIDE_LIMITS];
    // Start validator with clean (new) ledger
    let (test_validator, main_payer) = clean_ledger_setup_validator(inv_feat).unwrap();
    // Get the RpcClient
    let connection = test_validator.get_rpc_client();
    // Capture our programs log statements
    solana_logger::setup_with_default("solana_runtime::message=debug");

    // This example doesn't require sending any accounts to program
    let accounts = &[];
    // Build instruction array and submit transaction
    let txn = submit_transaction(
        &connection,
        &main_payer,
        [
            // This instruction adds CU to transaction budget (1.9.2) but does nothing
            // when we deactivate the 'transaction wide compute cap' feature
            ComputeBudgetInstruction::request_units(400_000u32),
            // Add two (2) instructions to transaction
            // Replace with instructions that make sense for your program
            // You will see that each instruction has the 1.8.x 200_000 CU per budget
            Instruction::new_with_borsh(PROG_KEY, &0u8, accounts.to_vec()),
            Instruction::new_with_borsh(PROG_KEY, &1u8, accounts.to_vec()),
        ]
        .to_vec(),
    );
    assert!(txn.is_ok());
}
```


Alternatif olarak, [scfs engine gadget](#resources)'ı, bir küme için tam bir devre dışı bırakılmış özellikler vektörü üretebilir. Aşağıdaki, devnet için tüm devre dışı bırakılmış özelliklerin bir listesini almak için bu motorun kullanıldığını gösterir.

```rs
#[test]
fn test_devnet_parity_pass() {
    // Use gadget-scfs to get all deactivated features from devnet
    // must have `gadgets-scfs = "0.2.0" in Cargo.toml to use
    // Here we setup for a run that samples features only
    // from devnet
    let mut my_matrix = ScfsMatrix::new(Some(ScfsCriteria {
        clusters: Some(vec![SCFS_DEVNET.to_string()]),
        ..Default::default()
    }))
    .unwrap();
    // Run the sampler matrix
    assert!(my_matrix.run().is_ok());
    // Get all deactivated features
    let deactivated = my_matrix
        .get_features(Some(&ScfsMatrix::any_inactive))
        .unwrap();
    // Confirm we have them
    assert_ne!(deactivated.len(), 0);
    // Setup test validator and logging while deactivating all
    // features that are deactivated in devnet
    let (test_validator, main_payer) = clean_ledger_setup_validator(deactivated).unwrap();
    let connection = test_validator.get_rpc_client();
    solana_logger::setup_with_default("solana_runtime::message=debug");

    let accounts = &[];
    let txn = submit_transaction(
        &connection,
        &main_payer,
        [
            // Add two (2) instructions to transaction
            // Replace with instructions that make sense for your program
            Instruction::new_with_borsh(PROG_KEY, &0u8, accounts.to_vec()),
            Instruction::new_with_borsh(PROG_KEY, &1u8, accounts.to_vec()),
        ]
        .to_vec(),
    );
    assert!(txn.is_ok());
}
```


Mutlu Testler!

## Resources
[scfsd](https://github.com/FrankC01/solana-gadgets/tree/main/rust/scfsd)

[gadget-scfs](https://github.com/FrankC01/solana-gadgets/tree/main/rust/gadgets-scfs)
