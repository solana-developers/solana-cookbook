# Serializing Data (Serileştirme)

Serialization(serileştirme) hakkında konuştuğumuzda, hem serializing data (verilerin serileştirilmesini) hem de deserialization of data (verilerin seri durumdan çıkarılmasını) kastediyoruz.

Serialization, Solana programı ve program Account’ları yaşam döngüsü boyunca birkaç noktada devreye girer:

1. Client’ta instruction data’nın serialize edilmesi
2. Programdaki instruction data’nın seri deserialize edilmesi
3. Programdaki Account data’nın serialize edilmesi
4. Client’ta Account data’nın deserialize edilmesi


Yukarıdaki eylemlerin hepsinin aynı serialization yaklaşımıyla desteklenmesi önemlidir. Dahil edilen snippet'ler, [Borsh](#resources) kullanılarak serialization yapmayı gösteriyor.

Bu belgenin geri kalanındaki örnekler, [Solana CLI Program Template](#resources) Program Şablonundan alınan alıntılardır.

## Setting up for Borsh Serialization (Borsh Serialization için Kurulum)

Rust program, Rust client, Node ve/veya Python client için Borsh kütüphaneleri kurulmalıdır.

```toml
[package]
name = "cli-program-template"
version = "0.1.5"
edition = "2018"
license = "WTFPL"
publish = false

[dependencies]
borsh = "0.9.0"
clap = "2.33.3"
lazy_static = "1.4.0"
serde = { version = "1.0.125", features = ["derive"] }
serde_yaml = "0.8.17"
sol-template-shared = {path = "shared"}
solana-clap-utils = "1.8.2"
solana-cli-config = "1.8.2"
solana-client = "1.8.2"
solana-logger = "1.8.2"
solana-remote-wallet = "1.8.2"
solana-sdk = "1.8.2"
tokio = { version = "1", features = ["full"] }

[workspace]
members = [
    "program",
    "shared",
]
[dev-dependencies]
lazy_static = "1.4.0"
solana-validator = "1.8.2"
solana-streamer = "1.8.2"
```

## How to serialize instruction data on the client (Client’taki yönerge verisi nasıl serileştirilir)

<img src="./serialization/ser1.png" alt="Serialize Instruction Data">

Bir programa göndermek için giden instruction data’yı (yönerge verisi) serialize duruma getiriyorsanız, programın gelen instruction data’yı nasıl deserialize duruma getirileceğini yansıtması gerekir.

Bu şablonda, bir instruction data bloğu, örneklerle birlikte aşağıdakileri içeren serialize edilmiş bir array’dir:


| Instruction (Variant index) | Serialized Key                 | Serialized Değer               |
| --------------------------- | ------------------------------ | ------------------------------ |
| Initialize (0)              | instruction için geçerli değil | instruction için geçerli değil |
| Mint (1)                    | "foo"                          | "bar"                          |
| Transfer (2)                | "foo"                          | instruction için geçerli değil |
| Burn (2)                    | "foo"                          | instruction için geçerli değil |



Aşağıdaki örnekte, programa ait Account’ın başlatıldığını varsayıyoruz.

```ts
// Include borsh functionality

import { serialize, deserialize, deserializeUnchecked } from "borsh";
import { Buffer } from "buffer";

// Get Solana
import {
  Keypair,
  Connection,
  PublicKey,
  Transaction,
  TransactionInstruction,
  sendAndConfirmTransaction,
} from "@solana/web3.js";

// Flexible class that takes properties and imbues them
// to the object instance
class Assignable {
  constructor(properties) {
    Object.keys(properties).map((key) => {
      return (this[key] = properties[key]);
    });
  }
}

// Our instruction payload vocabulary
class Payload extends Assignable {}

// Borsh needs a schema describing the payload
const payloadSchema = new Map([
  [
    Payload,
    {
      kind: "struct",
      fields: [
        ["id", "u8"],
        ["key", "string"],
        ["value", "string"],
      ],
    },
  ],
]);

// Instruction variant indexes
enum InstructionVariant {
  InitializeAccount = 0,
  MintKeypair,
  TransferKeypair,
  BurnKeypair,
}

/**
 * Mint a key value pair to account
 * @param {Connection} connection - Solana RPC connection
 * @param {PublicKey} progId - Sample Program public key
 * @param {PublicKey} account - Target program owned account for Mint
 * @param {Keypair} wallet - Wallet for signing and payment
 * @param {string} mintKey - The key being minted key
 * @param {string} mintValue - The value being minted
 * @return {Promise<Keypair>} - Keypair
 */

export async function mintKV(
  connection: Connection,
  progId: PublicKey,
  account: PublicKey,
  wallet: Keypair,
  mintKey: string,
  mintValue: string
): Promise<string> {
  // Construct the payload
  const mint = new Payload({
    id: InstructionVariant.MintKeypair,
    key: mintKey, // 'ts key'
    value: mintValue, // 'ts first value'
  });

  // Serialize the payload
  const mintSerBuf = Buffer.from(serialize(payloadSchema, mint));
  // console.log(mintSerBuf)
  // => <Buffer 01 06 00 00 00 74 73 20 6b 65 79 0e 00 00 00 74 73 20 66 69 72 73 74 20 76 61 6c 75 65>
  // let mintPayloadCopy = deserialize(schema, Payload, mintSerBuf)
  // console.log(mintPayloadCopy)
  // => Payload { id: 1, key: 'ts key', value: 'ts first value' }

  // Create Solana Instruction
  const instruction = new TransactionInstruction({
    data: mintSerBuf,
    keys: [
      { pubkey: account, isSigner: false, isWritable: true },
      { pubkey: wallet.publicKey, isSigner: false, isWritable: false },
    ],
    programId: progId,
  });

  // Send Solana Transaction
  const transactionSignature = await sendAndConfirmTransaction(
    connection,
    new Transaction().add(instruction),
    [wallet],
    {
      commitment: "singleGossip",
      preflightCommitment: "singleGossip",
    }
  );
  console.log("Signature = ", transactionSignature);
  return transactionSignature;
}
```

## How to deserialize instruction data on the program (Instruction data programlarda nasıl deserialize edilir)

```rs
//! instruction Contains the main ProgramInstruction enum

use {
    crate::error::SampleError, borsh::BorshDeserialize, solana_program::program_error::ProgramError,
};

#[derive(Debug, PartialEq)]
/// All custom program instructions
pub enum ProgramInstruction {
    InitializeAccount,
    MintToAccount { key: String, value: String },
    TransferBetweenAccounts { key: String },
    BurnFromAccount { key: String },
    MintToAccountWithFee { key: String, value: String },
    TransferBetweenAccountsWithFee { key: String },
    BurnFromAccountWithFee { key: String },
}

/// Generic Payload Deserialization
#[derive(BorshDeserialize, Debug)]
struct Payload {
    variant: u8,
    arg1: String,
    arg2: String,
}

impl ProgramInstruction {
    /// Unpack inbound buffer to associated Instruction
    /// The expected format for input is a Borsh serialized vector
    pub fn unpack(input: &[u8]) -> Result<Self, ProgramError> {
        let payload = Payload::try_from_slice(input).unwrap();
        match payload.variant {
            0 => Ok(ProgramInstruction::InitializeAccount),
            1 => Ok(Self::MintToAccount {
                key: payload.arg1,
                value: payload.arg2,
            }),
            2 => Ok(Self::TransferBetweenAccounts { key: payload.arg1 }),
            3 => Ok(Self::BurnFromAccount { key: payload.arg1 }),
            4 => Ok(Self::MintToAccountWithFee {
                key: payload.arg1,
                value: payload.arg2,
            }),
            5 => Ok(Self::TransferBetweenAccountsWithFee { key: payload.arg1 }),
            6 => Ok(Self::BurnFromAccountWithFee { key: payload.arg1 }),
            _ => Err(SampleError::DeserializationFailure.into()),
        }
    }
}
```


## How to serialize account data on the program (Programdaki account data nasıl serialize edilir)

<img src="./serialization/ser3.png" alt="Account Data Serialization">

Program account'ı veri bloğu (örnek repodan) şu şekilde düzenlenir:

| Byte 0           | Bytes 1-4                     | Remaining Byte up to 1019                   |
| ---------------- | ----------------------------- | ------------------------------------------- |
| Başlangıç bayrağı |serileştirilmiş BTreeMap uzunluğu | BTreeMap (anahtar değer çiftlerinin depolandığı yer) |


### Pack

[Pack][1] özelliği hakkında bilgiler:

Pack özelliği, account verilerinin seri hale getirilmesi/seri hale getirilmesinin ayrıntılarını temel Program talimatı işlemenizden gizlemeyi kolaylaştırır. Bu nedenle, tüm serileştirme/serileştirme günlüğünü program işleme koduna koymak yerine, (3) fonksiyonun arkasındaki ayrıntıları kapsüller:

1. `unpack_unchecked` - Başlatılıp başlatılmadığını kontrol etmeden bir account'ı seri durumdan çıkarmanıza izin verir. Bu, Başlatma işlevini gerçekten işlerken yararlıdır (varyant dizini 0)
2. `unpack` - `unpack_from_slice` Pack uygulamanızı çağırır ve account'ın başlatılıp başlatılmadığını kontrol eder.
3. `pack` - `pack_into_slice` Pack uygulamanızı çağırır.

Örnek programımız için Pack özelliğinin uygulanması. Bunu borsh kullanılarak account verilerinin fiili olarak işlenmesi takip eder.

```rs
//! @brief account_state manages account data

use crate::error::SampleError;
use sol_template_shared::ACCOUNT_STATE_SPACE;
use solana_program::{
    entrypoint::ProgramResult,
    program_error::ProgramError,
    program_pack::{IsInitialized, Pack, Sealed},
};
use std::collections::BTreeMap;

/// Maintains global accumulator
#[derive(Debug, Default, PartialEq)]
pub struct ProgramAccountState {
    is_initialized: bool,
    btree_storage: BTreeMap<String, String>,
}

impl ProgramAccountState {
    /// Returns indicator if this account has been initialized
    pub fn set_initialized(&mut self) {
        self.is_initialized = true;
    }
    /// Adds a new key/value pair to the account
    pub fn add(&mut self, key: String, value: String) -> ProgramResult {
        match self.btree_storage.contains_key(&key) {
            true => Err(SampleError::KeyAlreadyExists.into()),
            false => {
                self.btree_storage.insert(key, value);
                Ok(())
            }
        }
    }
    /// Removes a key from account and returns the keys value
    pub fn remove(&mut self, key: &str) -> Result<String, SampleError> {
        match self.btree_storage.contains_key(key) {
            true => Ok(self.btree_storage.remove(key).unwrap()),
            false => Err(SampleError::KeyNotFoundInAccount),
        }
    }
}

impl Sealed for ProgramAccountState {}

// Pack expects the implementation to satisfy whether the
// account is initialzed.
impl IsInitialized for ProgramAccountState {
    fn is_initialized(&self) -> bool {
        self.is_initialized
    }
}

impl Pack for ProgramAccountState {
    const LEN: usize = ACCOUNT_STATE_SPACE;

    /// Store 'state' of account to its data area
    fn pack_into_slice(&self, dst: &mut [u8]) {
        sol_template_shared::pack_into_slice(self.is_initialized, &self.btree_storage, dst);
    }

    /// Retrieve 'state' of account from account data area
    fn unpack_from_slice(src: &[u8]) -> Result<Self, ProgramError> {
        match sol_template_shared::unpack_from_slice(src) {
            Ok((is_initialized, btree_map)) => Ok(ProgramAccountState {
                is_initialized,
                btree_storage: btree_map,
            }),
            Err(_) => Err(ProgramError::InvalidAccountData),
        }
    }
}

```

### Serialization/Deserialization

Serialize duruma getirme ve deserialize duruma getirmeyi tamamlamak için:

1. `sol_template_shared::pack_into_slice` - Gerçek serileştirmenin gerçekleştiği yer
2. `sol_template_shared::unpack_from_slice` - Gerçek seri durumdan çıkarmanın gerçekleştiği yer

**Not** Aşağıda `BTREE_LENGTH` için veri düzeninde `BTREE_STORAGE`'dan önce bir `u32` (4 bayt) bölümümüz olduğunu unutmayın. Bunun nedeni, borsh'un deserialization sırasında, seri durumdan çıkarmakta olduğunuz dilimin uzunluğunun, alıcı nesnenin fiilen yeniden birleştirilmesinden önce okuduğu veri miktarıyla uyuşup uyuşmadığını kontrol etmesidir. Aşağıda gösterilen yaklaşım, önce `BTREE_STORAGE` işaretçisinden `slice` boyutu elde etmek için `BTREE_LENGTH`'yi okur.

```rs
use {
    arrayref::*,
    borsh::{BorshDeserialize, BorshSerialize},
    solana_program::program_memory::sol_memcpy,
    std::{collections::BTreeMap, error::Error},
};

/// Initialization flag size for account state
pub const INITIALIZED_BYTES: usize = 1;
/// Storage for the serialized size of the BTreeMap control
pub const BTREE_LENGTH: usize = 4;
/// Storage for the serialized BTreeMap container
pub const BTREE_STORAGE: usize = 1019;
/// Sum of all account state lengths
pub const ACCOUNT_STATE_SPACE: usize = INITIALIZED_BYTES + BTREE_LENGTH + BTREE_STORAGE;

/// Packs the initialized flag and data content into destination slice
#[allow(clippy::ptr_offset_with_cast)]
pub fn pack_into_slice(
    is_initialized: bool,
    btree_storage: &BTreeMap<String, String>,
    dst: &mut [u8],
) {
    let dst = array_mut_ref![dst, 0, ACCOUNT_STATE_SPACE];
    // Setup pointers to key areas of account state data
    let (is_initialized_dst, data_len_dst, data_dst) =
        mut_array_refs![dst, INITIALIZED_BYTES, BTREE_LENGTH, BTREE_STORAGE];
    // Set the initialized flag
    is_initialized_dst[0] = is_initialized as u8;
    // Store the core data length and serialized content
    let keyval_store_data = btree_storage.try_to_vec().unwrap();
    let data_len = keyval_store_data.len();
    if data_len < BTREE_STORAGE {
        data_len_dst[..].copy_from_slice(&(data_len as u32).to_le_bytes());
        sol_memcpy(data_dst, &keyval_store_data, data_len);
    } else {
        panic!();
    }
}

/// Unpacks the data from slice and return the initialized flag and data content
#[allow(clippy::ptr_offset_with_cast)]
pub fn unpack_from_slice(src: &[u8]) -> Result<(bool, BTreeMap<String, String>), Box<dyn Error>> {
    let src = array_ref![src, 0, ACCOUNT_STATE_SPACE];
    // Setup pointers to key areas of account state data
    let (is_initialized_src, data_len_src, data_src) =
        array_refs![src, INITIALIZED_BYTES, BTREE_LENGTH, BTREE_STORAGE];

    let is_initialized = match is_initialized_src {
        [0] => false,
        [1] => true,
        _ => {
            return Err(Box::<dyn Error>::from(format!(
                "unrecognized initialization flag \"{:?}\". in account",
                is_initialized_src
            )))
        }
    };
    // Get current size of content in data area
    let data_len = u32::from_le_bytes(*data_len_src) as usize;
    // If emptry, create a default
    if data_len == 0 {
        Ok((is_initialized, BTreeMap::<String, String>::new()))
    } else {
        let data_dser = BTreeMap::<String, String>::try_from_slice(&data_src[0..data_len]).unwrap();
        Ok((is_initialized, data_dser))
    }
}

```

### Usage (Kullanım)

Aşağıdaki kod bloğu, hepsini bir araya getirir ve programın, başlatma bayrağını ve key/value pairs için temeldeki `BTreeMap`'i içine alan `ProgramAccountState` ile nasıl etkileşime girdiğini gösterir.

İlk olarak, yepyeni bir account başlatmak istediğimizde:

```rs
/// Initialize a new program account, which is the first in AccountInfo array
fn initialize_account(accounts: &[AccountInfo]) -> ProgramResult {
    msg!("Initialize account");
    let account_info_iter = &mut accounts.iter();
    let program_account = next_account_info(account_info_iter)?;
    let mut account_data = program_account.data.borrow_mut();
    // Here we use unpack_unchecked as we have yet to initialize
    // Had we tried to use unpack it would fail because, well, chicken and egg
    let mut account_state = ProgramAccountState::unpack_unchecked(&account_data)?;
    // We double check that we haven't already initialized this accounts data
    // more than once. If we are good, we set the initialized flag
    if account_state.is_initialized() {
        return Err(SampleError::AlreadyInitializedState.into());
    } else {
        account_state.set_initialized();
    }
    // Finally, we store back to the accounts space
    ProgramAccountState::pack(account_state, &mut account_data).unwrap();
    Ok(())
}
```


Şimdi, bir client’tan talimat gönderirken yukarıda gösterdiğimiz yeni bir key value pairs(anahtar değer çifti) basılmasını gösterdiği için diğer talimatlarımız üzerinde çalışabiliriz:

```rs
/// Mint a key/pair to the programs account, which is the first in accounts
fn mint_keypair_to_account(accounts: &[AccountInfo], key: String, value: String) -> ProgramResult {
    msg!("Mint to account");
    let account_info_iter = &mut accounts.iter();
    let program_account = next_account_info(account_info_iter)?;
    let mut account_data = program_account.data.borrow_mut();
    // Unpacking an uninitialized account state will fail
    let mut account_state = ProgramAccountState::unpack(&account_data)?;
    // Add the key value pair to the underlying BTreeMap
    account_state.add(key, value)?;
    // Finally, serialize back to the accounts data
    ProgramAccountState::pack(account_state, &mut account_data)?;
    Ok(())
}
```


[1]: https://github.com/solana-labs/solana/blob/22a18a68e3ee68ae013d647e62e12128433d7230/sdk/program/src/program_pack.rs

## How to deserialize account data on the client (Client’ta account data nasıl deserialize edilir)
Client’lar, serileştirilmiş veri bloğunun dönüşün bir parçası olduğu programa ait account'ı almak için Solana'yı çağırabilir(call). Seri durumdan çıkarma, veri bloğu düzenini bilmeyi gerektirir.

Hesap verilerinin düzeni [burada](#account-data-serialization) açıklanmıştır.

```ts
import { serialize, deserialize, deserializeUnchecked } from "borsh";
import { Buffer } from "buffer";
import {
  Keypair,
  AccountMeta,
  Connection,
  LAMPORTS_PER_SOL,
  PublicKey,
  SystemProgram,
  Transaction,
  TransactionInstruction,
  sendAndConfirmTransaction,
} from "@solana/web3.js";

// Flexible class that takes properties and imbues them
// to the object instance
class Assignable {
  constructor(properties) {
    Object.keys(properties).map((key) => {
      return (this[key] = properties[key]);
    });
  }
}

export class AccoundData extends Assignable {}

const dataSchema = new Map([
  [
    AccoundData,
    {
      kind: "struct",
      fields: [
        ["initialized", "u8"],
        ["tree_length", "u32"],
        ["map", { kind: "map", key: "string", value: "string" }],
      ],
    },
  ],
]);

/**
 * Fetch program account data
 * @param {Connection} connection - Solana RPC connection
 * @param {PublicKey} account - Public key for account whose data we want
 * @return {Promise<AccoundData>} - Keypair
 */
export async function getAccountData(
  connection: Connection,
  account: PublicKey
): Promise<AccoundData> {
  let nameAccount = await connection.getAccountInfo(account, "processed");
  return deserializeUnchecked(dataSchema, AccoundData, nameAccount.data);
}
```


## Common Solana TS/JS Mappings (Yaygın Solana TS/JS Eşlemeleri)

Borsh Spesifikasyonu (The [Borsh Specification](#resources)), primitive ve bileşik veri türleri için çoğu eşlemeyi içerir.

TS/JS ve Python'un key’i, serileştirme ve serileştirmenin ilgili girdileri oluşturabilmesi veya yürütebilmesi için uygun bir tanımla bir Borsh Şeması oluşturmaktır.

Aşağıdaki kod bloğu, primitive (number, strings) ve bileşik türlerin (fixed size array, Map) önce TypeScript'te, sonra Python'da serileştirilmesini ve ardından Rust tarafında eşdeğer serileştirmeyi gösterir:
```ts
#!/usr/bin/env node

import { serialize, deserialize, deserializeUnchecked } from "borsh";
import { Buffer } from "buffer";
import { expect } from "chai";
import { PublicKey, Struct } from "@solana/web3.js";

/**
 * Primitive extends the Struct type from Solana Library
 * for convenience of dynamic property setting
 * @extends {Struct} Solana JS Struct class
 */

class Primitive extends Struct {
  constructor(properties) {
    super(properties);
  }
}

/**
 * Entry point for script *
 */
async function entry() {
  // Emulate BTreeMap
  let map = new Map();
  map.set("cookbook", "recipe");
  map.set("recipe", "ingredient");

  // Setup a Primitive for all basic and a few
  // compound types
  const value = new Primitive({
    U8: 255,
    U16: 65535,
    U32: 4294967295,
    FIXED_STRING_ARRAY: ["hello", "world"],
    FIXED_U8_ARRAY: [1, 2, 3, 4, 5],
    MAP_STRING_STRING: map,
  });
  // Define our schema
  const schema = new Map([
    [
      Primitive,
      {
        kind: "struct",
        fields: [
          ["U8", "u8"],
          ["U16", "u16"],
          ["U32", "u32"],
          ["FIXED_STRING_ARRAY", ["string", 2]],
          ["FIXED_U8_ARRAY", ["u8", 5]],
          [
            "MAP_STRING_STRING",
            { kind: "map", key: "string", value: "string" },
          ],
        ],
      },
    ],
  ]);
  console.log("Value = ", value);
  // Serialize then deserialize
  const dser = Buffer.from(serialize(schema, value));
  console.log(dser);
  const newValue = deserialize(schema, Primitive, dser);
  // Viola!
  console.log("New value = ", newValue);
  console.log("Fixed string array = ", newValue["FIXED_STRING_ARRAY"]);
  console.log("Fixed u8 array = ", newValue["FIXED_U8_ARRAY"]);
  console.log("Map = ", newValue["MAP_STRING_STRING"]);
}

entry();
```

## Advanced Constructs (Gelişmiş Yapılar)

Basit Payload’ların nasıl oluşturulacağını önceki örneklerde gösterdik. Bazen Solana belirli türlerde bir hızlı top atar. Bu bölüm, bunları işlemek için TS/JS ve Rust arasında uygun eşlemeyi gösterecektir.

### COption
```ts
#!/usr/bin/env node

import { serialize, deserialize, deserializeUnchecked } from "borsh";
import { Buffer } from "buffer";
import { PublicKey, Struct } from "@solana/web3.js";

/**
 * COption is meant to mirror the
 * `solana_program::options::COption`
 *
 * This type stores a u32 flag (0 | 1) indicating
 * the presence or not of a underlying PublicKey
 *
 * Similar to a Rust Option
 * @extends {Struct} Solana JS Struct class
 * @implements {encode}
 */
class COption extends Struct {
  constructor(properties) {
    super(properties);
  }

  /**
   * Creates a COption from a PublicKey
   * @param {PublicKey?} akey
   * @returns {COption} COption
   */
  static fromPublicKey(akey?: PublicKey): COption {
    if (akey == undefined) {
      return new COption({
        noneOrSome: 0,
        pubKeyBuffer: new Uint8Array(32),
      });
    } else {
      return new COption({
        noneOrSome: 1,
        pubKeyBuffer: akey.toBytes(),
      });
    }
  }
  /**
   * @returns {Buffer} Serialized COption (this)
   */
  encode(): Buffer {
    return Buffer.from(serialize(COPTIONSCHEMA, this));
  }
  /**
   * Safe deserializes a borsh serialized buffer to a COption
   * @param {Buffer} data - Buffer containing borsh serialized data
   * @returns {COption} COption object
   */
  static decode(data): COption {
    return deserialize(COPTIONSCHEMA, this, data);
  }

  /**
   * Unsafe deserializes a borsh serialized buffer to a COption
   * @param {Buffer} data - Buffer containing borsh serialized data
   * @returns {COption} COption object
   */
  static decodeUnchecked(data): COption {
    return deserializeUnchecked(COPTIONSCHEMA, this, data);
  }
}

/**
 * Defines the layout of the COption object
 * for serializing/deserializing
 * @type {Map}
 */
const COPTIONSCHEMA = new Map([
  [
    COption,
    {
      kind: "struct",
      fields: [
        ["noneOrSome", "u32"],
        ["pubKeyBuffer", [32]],
      ],
    },
  ],
]);

/**
 * Entry point for script *
 */
async function entry(indata?: PublicKey) {
  // If we get a PublicKey
  if (indata) {
    // Construct COption instance
    const coption = COption.fromPublicKey(indata);
    console.log("Testing COption with " + indata.toBase58());
    // Serialize it
    let copt_ser = coption.encode();
    console.log("copt_ser ", copt_ser);
    // Deserialize it
    const tdone = COption.decode(copt_ser);
    console.log(tdone);
    // Validate contains PublicKey
    if (tdone["noneOrSome"] == 1) {
      console.log("pubkey: " + new PublicKey(tdone["pubKeyBuffer"]).toBase58());
    }
    /*
            Output:
            Testing COption with A94wMjV54C8f8wn7zL8TxNCdNiGoq7XSN7vWGrtd4vwU
            copt_ser  Buffer(36) [1, 0, 0, 0, 135, 202, 71, 214, 68, 105, 98, 176, 211, 130, 105, 2, 55, 187, 86, 186, 109, 176, 80, 208, 77, 100, 221, 101, 20, 203, 149, 166, 96, 171, 119, 35, buffer: ArrayBuffer(8192), byteLength: 36, byteOffset: 1064, length: 36]
            COption {noneOrSome: 1, pubKeyBuffer: Uint8Array(32)}
            pubkey: A94wMjV54C8f8wn7zL8TxNCdNiGoq7XSN7vWGrtd4vwU
        */
  } else {
    console.log("Testing COption with null");
    // Construct COption instance
    const coption = COption.fromPublicKey();
    // Serialize it
    const copt_ser = coption.encode();
    console.log(copt_ser);
    // Deserialize it
    const tdone1 = COption.decode(copt_ser);
    console.log(tdone1);
    // Validate does NOT contains PublicKey
    if (tdone1["noneOrSome"] == 1) {
      throw Error("Expected no public key");
    } else console.log("pubkey: null");
    /*
            Output:
            Testing COption with null
            Buffer(36)[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, buffer: ArrayBuffer(8192), byteLength: 36, byteOffset: 2272, length: 36]
            COption { noneOrSome: 0, pubKeyBuffer: Uint8Array(32) }
            pubkey: null
        */
  }
}

// Test with PublicKey
entry(new PublicKey("A94wMjV54C8f8wn7zL8TxNCdNiGoq7XSN7vWGrtd4vwU"));
console.log("");
// Test without PublicKey
entry();
```


## Resources

- [Borsh Specification](https://borsh.io/)
- [Rust Borsh](https://github.com/near/borsh-rs)
- [TS/JS Borsh](https://github.com/near/borsh-js)
- [Python Borsh](https://github.com/near/borsh-construct-py)
- [Python Borsh Documentation](https://near.github.io/borsh-construct-py/)
- [Solana CLI Program Template2](https://github.com/hashblock/solana-cli-program-template)
