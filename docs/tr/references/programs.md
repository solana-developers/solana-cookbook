# Writing Programs (Programları Yazma)

## How to transfer SOL in a program (Programda SOL aktarma)

Solana Programınız, Sistem programını 'çağırmadan', lamp’ları bir account'tan diğerine aktarabilir. Temel kural, programınızın, programınızın sahip olduğu herhangi bir account'tan herhangi bir account'a lamp aktarabilmesidir.

Alıcı account'ının, programınıza ait bir account olması gerekmez.

```rs
/// Transfers lamports from one account (must be program owned)
/// to another account. The recipient can by any account
fn transfer_service_fee_lamports(
    from_account: &AccountInfo,
    to_account: &AccountInfo,
    amount_of_lamports: u64,
) -> ProgramResult {
    // Does the from account have enough lamports to transfer?
    if **from_account.try_borrow_lamports()? < amount_of_lamports {
        return Err(CustomError::InsufficientFundsForTransaction.into());
    }
    // Debit from_account and credit to_account
    **from_account.try_borrow_mut_lamports()? -= amount_of_lamports;
    **to_account.try_borrow_mut_lamports()? += amount_of_lamports;
    Ok(())
}

/// Primary function handler associated with instruction sent
/// to your program
fn instruction_handler(accounts: &[AccountInfo]) -> ProgramResult {
    // Get the 'from' and 'to' accounts
    let account_info_iter = &mut accounts.iter();
    let from_account = next_account_info(account_info_iter)?;
    let to_service_account = next_account_info(account_info_iter)?;

    // Extract a service 'fee' of 5 lamports for performing this instruction
    transfer_service_fee_lamports(from_account, to_service_account, 5u64)?;

    // Perform the primary instruction
    // ... etc.

    Ok(())
}
```

## How to get clock in a program (Programlarda saat)
Saat’e erişmek iki şekilde yapılabilir:

1. `SYSVAR_CLOCK_PUBKEY`'i bir talimat içinde bir hesap olarak geçirme
2. Saate doğrudan bir talimatın içinden erişme.

Her iki yöntemi de bilmek güzel, çünkü bazı eski programlar hala `SYSVAR_CLOCK_PUBKEY`'i bir account olarak bekliyor.

### Passing Clock as an account inside an instruction (Saati bir intstruction içinde bir hesap olarak geçirme)

Başlatma ve sysvar pubkey için bir account alan bir talimat oluşturalım.

```rs
let clock = Clock::from_account_info(&sysvar_clock_pubkey)?;
let current_timestamp = clock.unix_timestamp;

```


Şimdi saatin sysvar genel adresini client aracılığıyla iletiyoruz.

```ts
(async () => {
  const programId = new PublicKey(
    "77ezihTV6mTh2Uf3ggwbYF2NyGJJ5HHah1GrdowWJVD3"
  );

  // Passing Clock Sys Var
  const passClockIx = new TransactionInstruction({
    programId: programId,
    keys: [
      {
        isSigner: false,
        isWritable: true,
        pubkey: helloAccount.publicKey,
      },
      {
        is_signer: false,
        is_writable: false,
        pubkey: SYSVAR_CLOCK_PUBKEY,
      },
    ],
  });

  const transaction = new Transaction();
  transaction.add(passClockIx);

  const txHash = await connection.sendTransaction(transaction, [
    feePayer,
    helloAccount,
  ]);

  console.log(`Transaction succeeded. TxHash: ${txHash}`);
})();

```

### Accessing Clock directly inside an instruction (Saate doğrudan bir instruction içinden erişme)

Aynı komutu client tarafında `SYSVAR_CLOCK_PUBKEY` beklemeden oluşturalım.

```rs
let clock = Clock::get()?;
let current_timestamp = clock.unix_timestamp;

```

Client tarafı talimatı, şimdi yalnızca devlet ve ödeyen account'ları iletmesi gerekiyor.

```ts
(async () => {
  const programId = new PublicKey(
    "4ZEdbCtb5UyCSiAMHV5eSHfyjq3QwbG3yXb6oHD7RYjk"
  );

  // No more requirement to pass clock sys var key
  const initAccountIx = new TransactionInstruction({
    programId: programId,
    keys: [
      {
        isSigner: false,
        isWritable: true,
        pubkey: helloAccount.publicKey,
      },
    ],
  });

  const transaction = new Transaction();
  transaction.add(initAccountIx);

  const txHash = await connection.sendTransaction(transaction, [
    feePayer,
    helloAccount,
  ]);

  console.log(`Transaction succeeded. TxHash: ${txHash}`);
})();

```

## How to change account size (Account boyutu değiştirme)
`Realloc`'u kullanarak bir programa ait account'ın boyutunu değiştirebilirsiniz. `realloc`, bir account'ı 10 KB'a kadar yeniden boyutlandırabilir. Bir account'ın boyutunu artırmak için `realloc`'u kullandığınızda, o account'ı rent’den muaf tutmak için lamp transferleri yapmanız gerekir.

```rs
// adding a publickey to the account
let new_size = pda_account.data.borrow().len() + 32;

let rent = Rent::get()?;
let new_minimum_balance = rent.minimum_balance(new_size);

let lamports_diff = new_minimum_balance.saturating_sub(pda_account.lamports());
invoke(
    &system_instruction::transfer(funding_account.key, pda_account.key, lamports_diff),
    &[
        funding_account.clone(),
        pda_account.clone(),
        system_program.clone(),
    ],
)?;

pda_account.realloc(new_size, false)?;

```

## How to do Cross Program Invocation (Çapraz Program Çağırma)

Bir Cross Program Invocation(çapraz program çağırma), programımızın içine başka bir programın talimatını çağırmak için basitçe yerleştirilir. Açıklanacak en iyi örnek, Uniswap'ın `swap`(takas) işlevidir. `UniswapV2Router` sözleşmesi, takas için gerekli mantığı çağırır ve bir kişiden diğerine takas yapmak için `ERC20` sözleşmesinin transfer fonksiyonunu çağırır. Aynı şekilde, bir programın talimatını çok sayıda amaca sahip olarak adlandırabiliriz.

`SPL Token Program's transfer` talimatı olan ilk örneğimize bir göz atalım. Bir transferin gerçekleşmesi için ihtiyaç duyacağımız gerekli account'lar:

1. Kaynak Simge Hesabı (Tokenlarımızı tuttuğumuz account)
2. Hedef Token Hesabı (Tokenlarımızı aktaracağımız account)
3. Kaynak Token Hesabı Sahibi (İmzalayacağımız cüzdan adresimiz)

```rs
let token_transfer_amount = instruction_data
    .get(..8)
    .and_then(|slice| slice.try_into().ok())
    .map(u64::from_le_bytes)
    .ok_or(ProgramError::InvalidAccountData)?;

let transfer_tokens_instruction = transfer(
    &token_program.key,
    &source_token_account.key,
    &destination_token_account.key,
    &source_token_account_holder.key,
    &[&source_token_account_holder.key],
    token_transfer_amount,
)?;

let required_accounts_for_transfer = [
    source_token_account.clone(),
    destination_token_account.clone(),
    source_token_account_holder.clone(),
];

invoke(
    &transfer_tokens_instruction,
    &required_accounts_for_transfer,
)?;


```

İlgili müşteri talimatı aşağıdaki gibi olacaktır. Mint ve token oluşturma talimatlarını öğrenmek için lütfen yakındaki kodun tamamına bakın.

```ts
(async () => {
  const connection = new Connection(clusterApiUrl("devnet"), "confirmed");
  const programId = new PublicKey(
    "EfYK91eN3AqTwY1C34W6a33qGAtQ8HJYVhNv7cV4uMZj"
  );

  const transferTokensIx = new TransactionInstruction({
    programId: programId,
    data: TOKEN_TRANSFER_AMOUNT_BUFFER,
    keys: [
      {
        isSigner: false,
        isWritable: true,
        pubkey: SOURCE_TOKEN_ACCOUNT.publicKey,
      },
      {
        isSigner: false,
        isWritable: true,
        pubkey: DESTINATION_TOKEN_ACCOUNT.publicKey,
      },
      {
        isSigner: true,
        isWritable: true,
        pubkey: PAYER_KEYPAIR.publicKey,
      },
      {
        isSigner: false,
        isWritable: false,
        pubkey: TOKEN_PROGRAM_ID,
      },
    ],
  });

  const transaction = new Transaction();
  transaction.add(transferTokensIx);

  const txHash = await connection.sendTransaction(transaction, [
    PAYER_KEYPAIR,
    TOKEN_MINT_ACCOUNT,
    SOURCE_TOKEN_ACCOUNT,
    DESTINATION_TOKEN_ACCOUNT,
  ]);

  console.log(`Token transfer CPI success: ${txHash}`);
})();

```

Şimdi `Sistem Programının create_account` komutu olan başka bir örneğe bakalım. Yukarıda belirtilen talimat ile bu arasında küçük bir fark vardır. Orada, `token_program`'ı çağırma işlevi içindeki account'lardan biri olarak geçmek zorunda kalmadık. Ancak, çağıran talimatın `program_id`'sini iletmeniz gereken istisnalar vardır. Bizim durumumuzda bu, `Sistem Programının` program_id'si olacaktır. ("111111111111111111111111111111111"). Yani şimdi gerekli account'lar:

1. Rent’i ödeyen account
2. Oluşturulacak account
3. Sistem Programı account'ı

```rs
let account_span = instruction_data
    .get(..8)
    .and_then(|slice| slice.try_into().ok())
    .map(u64::from_le_bytes)
    .ok_or(ProgramError::InvalidAccountData)?;

let lamports_required = (Rent::get()?).minimum_balance(account_span as usize);

let create_account_instruction = create_account(
    &payer_account.key,
    &general_state_account.key,
    lamports_required,
    account_span,
    program_id,
);

let required_accounts_for_create = [
    payer_account.clone(),
    general_state_account.clone(),
    system_program.clone(),
];

invoke(&create_account_instruction, &required_accounts_for_create)?;

```


İlgili client tarafı kodu aşağıdaki gibi görünecektir.

```ts
(async () => {
  const connection = new Connection(clusterApiUrl("devnet"), "confirmed");
  const programId = new PublicKey(
    "DkuQ5wsndkzXfgqDB6Lgf4sDjBi4gkLSak1dM5Mn2RuQ"
  );

  // Airdropping some SOL
  await connection.confirmTransaction(
    await connection.requestAirdrop(PAYER_KEYPAIR.publicKey, LAMPORTS_PER_SOL)
  );

  // Our program's CPI instruction (create_account)
  const creataAccountIx = new TransactionInstruction({
    programId: programId,
    data: ACCOUNT_SPACE_BUFFER,
    keys: [
      {
        isSigner: true,
        isWritable: true,
        pubkey: PAYER_KEYPAIR.publicKey,
      },
      {
        isSigner: true,
        isWritable: true,
        pubkey: GENERAL_STATE_KEYPAIR.publicKey,
      },
      {
        isSigner: false,
        isWritable: false,
        pubkey: SystemProgram.programId,
      },
    ],
  });

  const transaction = new Transaction();
  // Adding up all the above instructions
  transaction.add(creataAccountIx);

  const txHash = await connection.sendTransaction(transaction, [
    PAYER_KEYPAIR,
    GENERAL_STATE_KEYPAIR,
  ]);

  console.log(`Create Account CPI Success: ${txHash}`);
})();

```

## How to create a PDA (PDA oluşturma)

Program Derived Address (Programdan Türetilmiş Adres), yalnızca programa ait bir account'tır, ancak private key’i yoktur. Bunun yerine imzası bir dizi seed ve bir artış (eğrinin dışında olduğundan emin olan bir nonce) ile elde edilir. Bir Program Adresini "**Üretmek**", onu "oluşturmaktan" farklıdır. Bir PDA'yı `Pubkey::find_program_address` kullanarak üretebilirsiniz. Bir PDA oluşturmak, esasen, adresi boşlukla başlatmak ve durumu ona ayarlamak anlamına gelir. Programımızın dışında normal bir Keypair account'ı oluşturulabilir ve ardından durumunu başlatmak için verilebilir. Ne yazık ki PDA'lar için kendi adına imza alamama özelliğinden dolayı zincir üzerinde oluşturulması gerekir. Bu nedenle, PDA'nın seed’lerini iletmek için `invoke_signed`'ı kullanırız ve PDA'nın account oluşturulmasıyla sonuçlanan fon account'ının imzasını kullanırız.

```rs
let create_pda_account_ix = system_instruction::create_account(
    &funding_account.key,
    &pda_account.key,
    lamports_required,
    ACCOUNT_DATA_LEN.try_into().unwrap(),
    &program_id,
);

invoke_signed(
    &create_pda_account_ix,
    &[funding_account.clone(), pda_account.clone()],
    &[signers_seeds],
)?;

```

Aşağıdaki gibi client üzerinden gerekli account'lar gönderilebilir.

```ts
const PAYER_KEYPAIR = Keypair.generate();

(async () => {
  const connection = new Connection(clusterApiUrl("devnet"), "confirmed");
  const programId = new PublicKey(
    "6eW5nnSosr2LpkUGCdznsjRGDhVb26tLmiM1P8RV1QQp"
  );

  const [pda, bump] = await PublicKey.findProgramAddress(
    [Buffer.from("customaddress"), PAYER_KEYPAIR.publicKey.toBuffer()],
    programId
  );

  const createPDAIx = new TransactionInstruction({
    programId: programId,
    data: Buffer.from(Uint8Array.of(bump)),
    keys: [
      {
        isSigner: true,
        isWritable: true,
        pubkey: PAYER_KEYPAIR.publicKey,
      },
      {
        isSigner: false,
        isWritable: true,
        pubkey: pda,
      },
      {
        isSigner: false,
        isWritable: false,
        pubkey: SystemProgram.programId,
      },
    ],
  });

  const transaction = new Transaction();
  transaction.add(createPDAIx);

  const txHash = await connection.sendTransaction(transaction, [PAYER_KEYPAIR]);
})();

```

## How to read accounts (Account’ları okuma)

Solana'daki hemen hemen tüm instruction’lar, en az 2 - 3 account gerektirecektir ve instruction işleyicileri üzerinde, bu account kümesinin hangi sırayla beklendiği bilgisini içerecektir. Hesapları manuel olarak indekslemek yerine Rust'ta `iter()` yönteminden faydalanarak bu basitçe yapılabilir.`next_account_info` yöntemi, temel olarak ilk indeksini böler ve account’lar array’i içinde bulunan account’ı döndürür. Bir grup account bekleyen ve her birinin parse edilmesini gerektiren basit bir instrucion görelim:

```rs
pub fn process_instruction(
    _program_id: &Pubkey,
    accounts: &[AccountInfo],
    _instruction_data: &[u8],
) -> ProgramResult {
    // Fetching all the accounts as a iterator (facilitating for loops and iterations)
    let accounts_iter = &mut accounts.iter();
    // Payer account
    let payer_account = next_account_info(accounts_iter)?;
    // Hello state account
    let hello_state_account = next_account_info(accounts_iter)?;
    // Rent account
    let rent_account = next_account_info(accounts_iter)?;
    // System Program
    let system_program = next_account_info(accounts_iter)?;

    Ok(())
}

```

## How to verify accounts (Account’ları doğrulama)

Solana'daki programlar stateless olduğundan, bir program yaratıcısı olarak, herhangi bir kötü niyetli account girişini önlemek için aktarılan account’ların mümkün olduğunca doğrulandığından emin olmalıyız. Bir kişinin yapabileceği temel kontroller şunlardır:

1. Beklenen signer account’ın gerçekten imzalanıp imzalanmadığını kontrol edin
2. Beklenen state account’ın yazılabilir olarak kontrol edilip edilmediğini kontrol edin
3. Beklenen state account’ın sahibinin aranan program kimliği olup olmadığını kontrol edin
4. State’i ilk kez başlatıyorsanız, account’ın zaten başlatılıp başlatılmadığını kontrol edin.
5. Geçilen herhangi bir cross program kimliğinin (gerektiğinde) beklendiği gibi olup olmadığını kontrol edin.

Yukarıda belirtilen kontrollerle birlikte bir state account’ı başlatan temel bir talimat aşağıda tanımlanmıştır.

```rs
pub fn process_instruction(
    program_id: &Pubkey,
    accounts: &[AccountInfo],
    _instruction_data: &[u8],
) -> ProgramResult {
    let accounts_iter = &mut accounts.iter();
    let payer_account = next_account_info(accounts_iter)?;
    let hello_state_account = next_account_info(accounts_iter)?;
    let system_program = next_account_info(accounts_iter)?;

    let rent = Rent::get()?;

    // Checking if payer account is the signer
    if !payer_account.is_signer {
        return Err(ProgramError::MissingRequiredSignature);
    }

    // Checking if hello state account is rent exempt
    if !rent.is_exempt(hello_state_account.lamports(), 1) {
        return Err(ProgramError::AccountNotRentExempt);
    }

    // Checking if hello state account is writable
    if !hello_state_account.is_writable {
        return Err(ProgramError::InvalidAccountData);
    }

    // Checking if hello state account's owner is the current program
    if hello_state_account.owner.ne(&program_id) {
        return Err(ProgramError::IllegalOwner);
    }

    // Checking if the system program is valid
    if system_program.key.ne(&SYSTEM_PROGRAM_ID) {
        return Err(ProgramError::IncorrectProgramId);
    }

    let mut hello_state = HelloState::try_from_slice(&hello_state_account.data.borrow())?;

    // Checking if the state has already been initialized
    if hello_state.is_initialized {
        return Err(ProgramError::AccountAlreadyInitialized);
    }

    hello_state.is_initialized = true;
    hello_state.serialize(&mut &mut hello_state_account.data.borrow_mut()[..])?;
    msg!("Account initialized :)");

    Ok(())
}

```

## How to read multiple instructions from a transaction (İşlemdeki çoklu talimatları okuma)

Solana, mevcut işlemdeki tüm talimatlara göz atmamıza izin veriyor. Bunları bir değişkende saklayabilir ve üzerlerinde yineleyebiliriz. Bununla, şüpheli işlemleri kontrol etmek gibi birçok şey yapabiliriz.

```rs
let mut idx = 0;
let num_instructions = read_u16(&mut idx, &instruction_sysvar)
.map_err(|_| MyError::NoInstructionFound)?;


for index in 0..num_instructions {
    
    let mut current = 2 + (index * 2) as usize;
    let start = read_u16(&mut current, &instruction_sysvar).unwrap();

    current = start as usize;
    let num_accounts = read_u16(&mut current, &instruction_sysvar).unwrap();
    current += (num_accounts as usize) * (1 + 32);

}

```
