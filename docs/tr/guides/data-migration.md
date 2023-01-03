# Migrating a Programs Data Accounts (Programların Data Account’larını Taşıma)

## How can you migrate a program's data accounts? (Programların veri account’ları nasıl taşınır)

Bir program oluşturduğunuzda, o programla ilişkili her bir veri account'ının belirli bir veri yapısı olacaktır. Programdan türetilen bir account'ı yükseltmeniz gerekirse, eski yapıya sahip bir sürü programdan türetilmiş account kalır.

Hesap versiyonlama ile eski account'larınızı yeni yapıya yükseltebilirsiniz.

:::Not
Bu, Programa Ait Hesaplarda (POA) verileri taşımanın birçok yolundan yalnızca biridir.
:::

## Scenario (Senaryo)

Hesap verilerimizi sürümlendirmek ve taşımak için her account için bir kimlik sağlayacağız. Bu kimlik, programa aktardığımızda account sürümünü tanımlamamızı ve böylece account'ı doğru şekilde işlememizi sağlayacaktır.

Aşağıdaki account durumunu ve programını alalım:

<img src="./data-migration/pav1.png" alt="Program Account v1">

```rs
#[derive(BorshDeserialize, BorshSerialize, Debug, Default, PartialEq)]
pub struct AccountContentCurrent {
    pub somevalue: u64,
}

#[derive(BorshDeserialize, BorshSerialize, Debug, Default, PartialEq)]
pub struct ProgramAccountState {
    is_initialized: bool,
    data_version: u8,
    account_data: AccountContentCurrent,
}
```



Bir account'ın ilk versiyonunda aşağıdakileri yapıyoruz:

| ID | Action |
| - | - |
|1| Verilerinize bir 'veri sürümü' alanı ekleyin. Basit bir artan sıra (ör. u8) veya daha karmaşık bir şey olabilir.
|2| Veri büyümesi için yeterli alan ayırın.
|3| Program sürümlerinde kullanılacak bir array sabiti başlatın.
|4| Gelecekteki yükseltmeler için `fn conversion_logic` altına bir güncelleme account'ı işlevi ekleyin.


Diyelim ki programımızın account'larını yeni bir zorunlu alan, `somestring` alanı içerecek şekilde yükseltmek istiyoruz.

Bir önceki account'ta fazladan yer ayırmasaydık account'ı yükseltemez ve takılıp kalırdık.

## Upgrading the Account (Account’ı Yükseltme)

Yeni programımızda içerik durumu için yeni bir özellik eklemek istiyoruz. Bunu takip eden değişiklikler, ilk program yapılarını şimdi kullanıma girdiklerinde nasıl kullandığımızdır.

### 1. Add account conversion logic (Hesap dönüştürme mantığı ekleme)

```rs
/// Current state (DATA_VERSION 1). If version changes occur, this
/// should be copied to another (see AccountContentOld below)
/// We've added a new field: 'somestring'
#[derive(BorshDeserialize, BorshSerialize, Debug, Default, PartialEq)]
pub struct AccountContentCurrent {
    pub somevalue: u64,
    pub somestring: String,
}

/// Old content state (DATA_VERSION 0).
#[derive(BorshDeserialize, BorshSerialize, Debug, Default, PartialEq)]
pub struct AccountContentOld {
    pub somevalue: u64,
}

/// Maintains account data
#[derive(BorshDeserialize, BorshSerialize, Debug, Default, PartialEq)]
pub struct ProgramAccountState {
    is_initialized: bool,
    data_version: u8,
    account_data: AccountContentCurrent,
}

```



| Satırlar | Not |
| ------- | - |
| 6 | Daha büyük veri bloğundan veri alt kümelerini okumayı basitleştirmek için Solana'nın `solana_program::borsh::try_from_slice_unchecked` programını ekledik
| 13-26| Burada, `AccountContentCurrent`'ı 17. satırdan başlayarak genişletmeden önce, `AccountContentOld` satır 24 olan eski içerik yapısını koruduk.
| 60 | `DATA_VERSION` sabitini bump ettik.
| 71 | Artık bir 'önceki' versiyonumuz var ve boyutunu bilmek istiyoruz.
| 86 | Coup de grâce, önceki içerik durumunu yeni (mevcut) içerik durumuna yükseltti.


Daha sonra, `somestring` ve işlemciyi güncellemek için yeni bir tane eklemek üzere talimatlarımızı güncelleriz. Veri yapısının 'yükseltilmesinin', `pack/unpack` (paketleme/paket açma) işleminin arkasında kapsüllendiğine dikkat edin.

```rs
//! instruction Contains the main VersionProgramInstruction enum

use {
    crate::error::DataVersionError,
    borsh::{BorshDeserialize, BorshSerialize},
    solana_program::{borsh::try_from_slice_unchecked, msg, program_error::ProgramError},
};

#[derive(BorshDeserialize, BorshSerialize, Debug, PartialEq)]
/// All custom program instructions
pub enum VersionProgramInstruction {
    InitializeAccount,
    SetU64Value(u64),
    SetString(String), // Added with data version change
    FailInstruction,
}

impl VersionProgramInstruction {
    /// Unpack inbound buffer to associated Instruction
    /// The expected format for input is a Borsh serialized vector
    pub fn unpack(input: &[u8]) -> Result<Self, ProgramError> {
        let payload = try_from_slice_unchecked::<VersionProgramInstruction>(input).unwrap();
        // let payload = VersionProgramInstruction::try_from_slice(input).unwrap();
        match payload {
            VersionProgramInstruction::InitializeAccount => Ok(payload),
            VersionProgramInstruction::SetU64Value(_) => Ok(payload),
            VersionProgramInstruction::SetString(_) => Ok(payload), // Added with data version change
            _ => Err(DataVersionError::InvalidInstruction.into()),
        }
    }
}
```


Bir talimat oluşturup gönderdikten sonra: `VersionProgramInstruction::SetString(String)` artık aşağıdaki 'yükseltilmiş' account veri düzenine sahibiz.

<img src="./data-migration/pav2.png" alt="Program Account v2">

## Resources

* [Borsh Specification](https://borsh.io/)
* [Solana `try_from_slice_unchecked`](https://github.com/solana-labs/solana/blob/master/sdk/program/src/borsh.rs#L67)
* [Reference Implementation](https://github.com/FrankC01/versioning-solana)
