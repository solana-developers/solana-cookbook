# Accounts (Account’lar)

## How to create a system account (System account oluşturma)

[Sistem Programını][1]n sahip olduğu bir account oluşturun. Solana çalışma zamanı, bir account'ın sahibine, verilerine yazma veya lamp bağlantılarını aktarma erişimi verir. Bir account oluştururken, bayt (`space`) cinsinden sabit bir depolama alanı ve rent’i karşılamak için yeterli lamp payı önceden tahsis etmeliyiz. [Rent][2], Solana'da account'ları canlı tutmak için yapılan bir maliyettir.

```ts
const createAccountParams = {
  fromPubkey: fromPubkey.publicKey,
  newAccountPubkey: newAccountPubkey.publicKey,
  lamports: rentExemptionAmount,
  space,
  programId: SystemProgram.programId,
};

const createAccountTransaction = new Transaction().add(
  SystemProgram.createAccount(createAccountParams)
);

await sendAndConfirmTransaction(connection, createAccountTransaction, [
  fromPubkey,
  newAccountPubkey,
]);
```


## How to calculate account cost (Account maliyeti hesaplama)

Solana'da account'ları canlı tutmak, [rent][2] adı verilen bir depolama maliyeti doğurur. Bir account, en az iki yıllık rent yatırılarak rent tahsilatından tamamen muaf tutulabilir. Hesaplama için, account’ta saklamayı düşündüğünüz veri miktarını göz önünde bulundurmanız gerekir.

```ts
import { Connection, clusterApiUrl } from "@solana/web3.js";

(async () => {
  const connection = new Connection(clusterApiUrl("devnet"), "confirmed");

  // length of data in the account to calculate rent for
  const dataLength = 1500;
  const rentExemptionAmount =
    await connection.getMinimumBalanceForRentExemption(dataLength);
  console.log({
    rentExemptionAmount,
  });
})();
```

## How to calculate account cost (Account’lar seed’leri oluşturma)

Hesaplarınızı yönetmek için bir çok farklı keypair oluşturmak yerine `createAccountWithSeed`'i kullanabilirsiniz.

### Generate (Üretme)

```ts
PublicKey.createWithSeed(basePubkey, seed, programId);
```

### Create (Oluşturma)

```ts
const tx = new Transaction().add(
  SystemProgram.createAccountWithSeed({
    fromPubkey: feePayer.publicKey, // funder
    newAccountPubkey: derived,
    basePubkey: basePubkey,
    seed: seed,
    lamports: 1e8, // 0.1 SOL
    space: 0,
    programId: owner,
  })
);

console.log(
  `txhash: ${await sendAndConfirmTransaction(connection, tx, [feePayer, base])}`
);
```

### Transfer (Transfer)

```ts
const tx = new Transaction().add(
  SystemProgram.transfer({
    fromPubkey: derived,
    basePubkey: basePubkey,
    toPubkey: Keypair.generate().publicKey, // create a random receiver
    lamports: 0.01 * LAMPORTS_PER_SOL,
    seed: seed,
    programId: programId,
  })
);
console.log(
  `txhash: ${await sendAndConfirmTransaction(connection, tx, [feePayer, base])}`
);
```

:::İPUCU
Sadece sistem programına ait bir account sistem programı üzerinden transfer yapabilir.
:::

## How to create PDAs (PDA’leri oluşturma)

[Programdan türetilen adres (PDA)][3], aşağıdaki farklarla normal bir adres gibidir:

1. ed25519 eğrisinden düşüyor
2. Private key yerine imzalamak için programı kullanma

**Not**: PDA account'ları sadece program üzerinde oluşturulabilir. Adres client tarafında oluşturulabilir.

:::İPUCU

PDA bir program kimliği tarafından türetilmiş olsa da, bu PDA'nın aynı programa ait olduğu anlamına gelmez. (Bir örnek alın, PDA'nızı token programına ait bir account olan token account'ı olarak başlatabilirsiniz)
:::

### Generate a PDA (PDA üretme)

`findProgramAddress`, seed’in sonuna fazladan bir bayt ekleyecektir. 255'ten 0'a başlar ve ilk eğri dışı public key’i döndürür. Aynı program kimliğini ve seed’ini iletirseniz her zaman aynı sonucu alırsınız.

```ts
import { PublicKey } from "@solana/web3.js";

(async () => {
  const programId = new PublicKey(
    "G1DCNUQTSGHehwdLCAmRyAG8hf51eCHrLNUqkgGKYASj"
  );

  let [pda, bump] = await PublicKey.findProgramAddress(
    [Buffer.from("test")],
    programId
  );
  console.log(`bump: ${bump}, pubkey: ${pda.toBase58()}`);
  // you will find the result is different from `createProgramAddress`.
  // It is expected because the real seed we used to calculate is ["test" + bump]
})();
```


### Create a PDA (PDA oluşturma)

Aşağıda, programa ait bir PDA account'ı oluşturmak için örnek bir program ve programı client ile çağırmak için bir örnek bulunmaktadır.

#### Program

Aşağıda, ayrılmış veri boyutu ile bir account oluşturan tek bir `system_instruction::create_account` talimatı gösterilmektedir, türetilmiş PDA için `rent_lamports` miktarı lamports. Bu, yukarıda tartışıldığı gibi `invoke_signed` kullanılarak PDA ile imzalanır.

```rs
invoke_signed(
    &system_instruction::create_account(
        &payer_account_info.key,
        &pda_account_info.key,
        rent_lamports,
        space.into(),
        program_id
    ),
    &[
        payer_account_info.clone(),
        pda_account_info.clone()
    ],
    &[&[&payer_account_info.key.as_ref(), &[bump]]]
)?;
```

#### Client

```ts
let tx = new Transaction().add(
  new TransactionInstruction({
    keys: [
      {
        pubkey: feePayer.publicKey,
        isSigner: true,
        isWritable: true,
      },
      {
        pubkey: pda,
        isSigner: false,
        isWritable: true,
      },
      {
        pubkey: SYSVAR_RENT_PUBKEY,
        isSigner: false,
        isWritable: false,
      },
      {
        pubkey: SystemProgram.programId,
        isSigner: false,
        isWritable: false,
      },
    ],
    data: Buffer.from(new Uint8Array([data_size, bump])),
    programId: programId,
  })
);

console.log(`txhash: ${await connection.sendTransaction(tx, [feePayer])}`);
```

## How to sign with a PDA (PDA ile imzalama)
PDA'lar yalnızca program içinde imzalanabilir. Aşağıda, bir PDA ile imzalamanın ve programı client ile çağırmanın bir program örneği verilmiştir.

### Program

Aşağıda, seed `escrow` tarafından türetilen bir PDA'dan SOL'yi aktarılan bir account'a aktaran tek bir talimat gösterilmektedir. `invoke_signed`, PDA ile imzalamak için kullanılır.

```rs
invoke_signed(
    &system_instruction::transfer(
        &pda_account_info.key,
        &to_account_info.key,
        100_000_000, // 0.1 SOL
    ),
    &[
        pda_account_info.clone(),
        to_account_info.clone(),
        system_program_account_info.clone(),
    ],
    &[&[b"escrow", &[bump_seed]]],
)?;
```

### Client

```ts
let tx = new Transaction().add(
  new TransactionInstruction({
    keys: [
      {
        pubkey: pda,
        // Leave `false` here although we need a pda as a signer.
        // It will be escalated on program if we use invoke_signed.
        isSigner: false,
        isWritable: true,
      },
      {
        pubkey: to.publicKey,
        isSigner: false,
        isWritable: true,
      },
      {
        pubkey: SystemProgram.programId,
        isSigner: false,
        isWritable: false,
      },
    ],
    data: Buffer.from(new Uint8Array([bump])),
    programId: programId,
  })
);

console.log(`txhash: ${await connection.sendTransaction(tx, [feePayer])}`);
```

## How to get program accounts (Program hesaplarını getirme)

Bir programa ait tüm account'ları geri döndürür. `getProgramAccounts` ve yapılandırması hakkında daha fazla bilgi için [kılavuzlar](../guides/get-program-accounts.md) bölümüne bakın.

```ts
import { clusterApiUrl, Connection, PublicKey } from "@solana/web3.js";

(async () => {
  const MY_PROGRAM_ID = new PublicKey(
    "6a2GdmttJdanBkoHt7f4Kon4hfadx4UTUgJeRkCaiL3U"
  );
  const connection = new Connection(clusterApiUrl("devnet"), "confirmed");

  const accounts = await connection.getProgramAccounts(MY_PROGRAM_ID);

  console.log(`Accounts for program ${MY_PROGRAM_ID}: `);
  console.log(accounts);

  /*
  // Output

  Accounts for program 6a2GdmttJdanBkoHt7f4Kon4hfadx4UTUgJeRkCaiL3U:  
  [
    {
      account: {
        data: <Buffer 60 06 66 ca 2c 1d c7 85 04 00 00 00 00 00 00 00 05 00 00 00 00 00 00 00 fc>,
        executable: false,
        lamports: 1064880,
        owner: [PublicKey],
        rentEpoch: 228
      },
      pubkey: PublicKey {
        _bn: <BN: 82fc5b91154dc5c840cb464ba6a89212d0fd789367c0a1488fb1941d78f9727a>
      }
    },
    {
      account: {
        data: <Buffer 60 06 66 ca 2c 1d c7 85 03 00 00 00 00 00 00 00 04 00 00 00 00 00 00 00 fd>,
        executable: false,
        lamports: 1064880,
        owner: [PublicKey],
        rentEpoch: 229
      },
      pubkey: PublicKey {
        _bn: <BN: 404dc1fe368cf194f20cf3c681a071c61893ced98f65cda12ba5a147e984e669>
      }
    }
  ]
  */
})();
```


## How to close accounts (Account’ları kapatma)
Tüm SOL'leri kaldırarak bir account'ı kapatabilirsiniz (depolanan tüm verileri silebilirsiniz). (daha fazla bilgi için [rent][2]’e bakabilirsiniz.)

#### Program

```rs
let dest_starting_lamports = dest_account_info.lamports();
**dest_account_info.lamports.borrow_mut() = dest_starting_lamports
    .checked_add(source_account_info.lamports())
    .unwrap();
**source_account_info.lamports.borrow_mut() = 0;

let mut source_data = source_account_info.data.borrow_mut();
source_data.fill(0);
```

#### Client

```ts
// 1. create an account to your program
let createNewAccountTx = new Transaction().add(
  SystemProgram.createAccount({
    fromPubkey: feePayer.publicKey,
    newAccountPubkey: newAccount.publicKey,
    lamports: 1e8, // 0.1 SOL
    space: 10, // a random value
    programId: programId,
  })
);

// 2. close your account
let closeAccountTx = new Transaction().add(
  new TransactionInstruction({
    keys: [
      {
        pubkey: newAccount.publicKey,
        isSigner: false,
        isWritable: true,
      },
      {
        pubkey: feePayer.publicKey,
        isSigner: false,
        isWritable: true,
      },
    ],
    programId: programId,
  })
);
```

## How to get account balance (Account bakiyesi getirme)
```ts
console.log(`${(await connection.getBalance(wallet)) / LAMPORTS_PER_SOL} SOL`);

```


**İPUCU**

Bir token bakiyesi almak istiyorsanız, token account'ının adresini bilmeniz gerekir. Daha fazla bilgi için bkz. [Token Referansları](token.md)

[1]: https://docs.solana.com/developing/clients/javascript-reference#systemprogram
[2]: https://docs.solana.com/developing/programming-model/accounts#rent
[3]: https://docs.solana.com/developing/programming-model/calling-between-programs#program-derived-addresses
