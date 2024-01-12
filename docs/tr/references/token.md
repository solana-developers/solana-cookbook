# Interacting with Tokens (Token’lar ile Etkileşim)

## What do I need to get started with SPL-Tokens? (SPL Token’ları kullanmaya başlamak için neye ihtiyacımız var?)

Solana'da Token’larla her etkileşimde bulunduğunuzda, aslında Solana Program Kitaplığı Token’ı veya SPL-Token standardı ile etkileşime girersiniz. SPL-Token standardı, programlama dilinize göre aşağıda bulabileceğiniz belirli bir kitaplığın kullanılmasını gerektirir.


```
"@solana/spl-token": "^0.2.0"
```


## How to create a new Token (Yeni bir Token oluşturma)
Token oluşturma, "mint account" adı verilen account oluşturularak yapılır. Bu mint account daha sonra bir kullanıcının token account'ına token basmak için kullanılır.

```ts
// 1) use build-in function
let mintPubkey = await createMint(
  connection, // conneciton
  feePayer, // fee payer
  alice.publicKey, // mint authority
  alice.publicKey, // freeze authority (you can use `null` to disable it. when you disable it, you can't turn it on again)
  8 // decimals
);

// or

// 2) compose by yourself
let tx = new Transaction().add(
  // create mint account
  SystemProgram.createAccount({
    fromPubkey: feePayer.publicKey,
    newAccountPubkey: mint.publicKey,
    space: MINT_SIZE,
    lamports: await getMinimumBalanceForRentExemptMint(connection),
    programId: TOKEN_PROGRAM_ID,
  }),
  // init mint account
  createInitializeMintInstruction(
    mint.publicKey, // mint pubkey
    8, // decimals
    alice.publicKey, // mint authority
    alice.publicKey // freeze authority (you can use `null` to disable it. when you disable it, you can't turn it on again)
  )
);

```

## How to get a token mint (Token Mint etme)

Bir tokenın sahip olduğu mevcut arzı, yetkiyi veya ondalık sayıları almak için token mint’in account bilgilerini almanız gerekir.

```ts
let mintAccount = await getMint(connection, mintAccountPublicKey);

```

## How to create a token account (Token account oluşturma)

Bir kullanıcının token tutması için bir token account'ı gerekir.

Bir kullanıcının sahip olduğu her tür token için en az bir token account'ı olacaktır.

İlişkili Token Hesapları(Associated Token Accounts,ATA), her keypair(anahtar çifti) için deterministik olarak oluşturulmuş account'lardır. ATA'lar, belirteç account'larını yönetmek için önerilen yöntemdir.

```ts
// 1) use build-in function
{
  let ata = await createAssociatedTokenAccount(
    connection, // connection
    feePayer, // fee payer
    mintPubkey, // mint
    alice.publicKey // owner,
  );
}

// or

// 2) composed by yourself
{
  let tx = new Transaction().add(
    createAssociatedTokenAccountInstruction(
      feePayer.publicKey, // payer
      ata, // ata
      alice.publicKey, // owner
      mintPubkey // mint
    )
  );
}


```

## How to get a Token Account (Token account’u getirme)

Her token account, owner, mint, miktar (bakiye) ve ondalık sayılar gibi token hakkında bilgilere sahiptir.

```ts
let tokenAccount = await getAccount(connection, tokenAccountPubkey);
```

## How to get a token account's balance (Token account bakiyesi getirme)

Token account, tek bir call ile alınabilen token bakiyesine sahiptir.

```ts
let tokenAmount = await connection.getTokenAccountBalance(tokenAccount);

```

::: İPUCU

Bir token account yalnızca bir tür mint tutabilir. Bir token account belirttiğinizde, bir mint de belirtmiş olursunuz.
:::

## How to mint tokens (Token mint’leme)
Token mint’lediğinizde (bastığınızda), arzı artırır ve yeni tokenları belirli bir token account'ına aktarırsınız.

```ts
// 1) use build-in function
{
  let txhash = await mintToChecked(
    connection, // connection
    feePayer, // fee payer
    mintPubkey, // mint
    tokenAccountPubkey, // receiver (should be a token account)
    alice, // mint authority
    1e8, // amount. if your decimals is 8, you mint 10^8 for 1 token.
    8 // decimals
  );
}

// or

// 2) compose by yourself
{
  let tx = new Transaction().add(
    createMintToCheckedInstruction(
      mintPubkey, // mint
      tokenAccountPubkey, // receiver (should be a token account)
      alice.publicKey, // mint authority
      1e8, // amount. if your decimals is 8, you mint 10^8 for 1 token.
      8 // decimals
      // [signer1, signer2 ...], // only multisig account will use
    )
  );
}

```

## How to transfer tokens (Token transfer etme)

Tokenları bir token account'ından başka bir token account'ına aktarabilirsiniz.

```ts
// 1) use build-in function
{
  let txhash = await transferChecked(
    connection, // connection
    feePayer, // payer
    tokenAccountXPubkey, // from (should be a token account)
    mintPubkey, // mint
    tokenAccountYPubkey, // to (should be a token account)
    alice, // from's owner
    1e8, // amount, if your deciamls is 8, send 10^8 for 1 token
    8 // decimals
  );
}

// or

// 2) compose by yourself
{
  let tx = new Transaction().add(
    createTransferCheckedInstruction(
      tokenAccountXPubkey, // from (should be a token account)
      mintPubkey, // mint
      tokenAccountYPubkey, // to (should be a token account)
      alice.publicKey, // from's owner
      1e8, // amount, if your deciamls is 8, send 10^8 for 1 token
      8 // decimals
    )
  );
}

```

## How to burn tokens (Token yakma(burn))

Token sahibiyseniz tokenı yakabilirsiniz.

```ts
// 1) use build-in function
{
  let txhash = await burnChecked(
    connection, // connection
    feePayer, // payer
    tokenAccountPubkey, // token account
    mintPubkey, // mint
    alice, // owner
    1e8, // amount, if your deciamls is 8, 10^8 for 1 token
    8
  );
}

// or

// 2) compose by yourself
{
  let tx = new Transaction().add(
    createBurnCheckedInstruction(
      tokenAccountPubkey, // token account
      mintPubkey, // mint
      alice.publicKey, // owner of token account
      1e8, // amount, if your deciamls is 8, 10^8 for 1 token
      8 // decimals
    )
  );
}

```

## How to close token accounts (Token account’larını kapatma)
Artık kullanmak istemiyorsanız bir token account'ını kapatabilirsiniz. İki durum vardır:

1. Wrapped SOL - Kapanış, Wrapped SOL'yi SOL'e dönüştürür.
2. Diğer Tokenlar - Sadece token account'ının bakiyesi 0 ise kapatabilirsiniz.

```ts
// 1) use build-in function
{
  let txhash = await closeAccount(
    connection, // connection
    feePayer, // payer
    tokenAccountPubkey, // token account which you want to close
    alice.publicKey, // destination
    alice // owner of token account
  );
}

// or

// 2) compose by yourself
{
  let tx = new Transaction().add(
    createCloseAccountInstruction(
      tokenAccountPubkey, // token account which you want to close
      alice.publicKey, // destination
      alice.publicKey // owner of token account
    )
  );
}

```

## How to set authority on token accounts or mints (Token hesaplarında ve mint’lerinde yetki belirleme)
Yetki ayarlayabilir/güncelleyebilirsiniz. 4 tip vardır:
1. MintTokens (mint account)
2. FreezeAccount (mint account)
3. AccountOwner (token account)
4. CloseAccount (token account)

```ts
// 1) use build-in function
{
  let txhash = await setAuthority(
    connection, // connection
    feePayer, // payer
    mintPubkey, // mint account || token account
    alice, // current authority
    AuthorityType.MintTokens, // authority type
    randomGuy.publicKey // new authority (you can pass `null` to close it)
  );
}

// or

// 2) compose by yourself
{
  let tx = new Transaction().add(
    createSetAuthorityInstruction(
      mintPubkey, // mint acocunt || token account
      alice.publicKey, // current auth
      AuthorityType.MintTokens, // authority type
      randomGuy.publicKey // new auth (you can pass `null` to close it)
    )
  );
}

```

## How to approve a token delegate (Token delegate onaylama)
İzin verilen bir miktarla bir temsilci (delegate) ayarlayabilirsiniz. Ayarladıktan sonra, temsilci, token account'ınızın başka bir sahibi gibidir. `Bir token account aynı anda yalnızca bir account'a yetki verebilir`.

```ts
// 1) use build-in function
{
  let txhash = await approveChecked(
    connection, // connection
    feePayer, // fee payer
    mintPubkey, // mint
    tokenAccountPubkey, // token account
    randomGuy.publicKey, // delegate
    alice, // owner of token account
    1e8, // amount, if your deciamls is 8, 10^8 for 1 token
    8 // decimals
  );
}
// or

// 2) compose by yourself
{
  let tx = new Transaction().add(
    createApproveCheckedInstruction(
      tokenAccountPubkey, // token account
      mintPubkey, // mint
      randomGuy.publicKey, // delegate
      alice.publicKey, // owner of token account
      1e8, // amount, if your deciamls is 8, 10^8 for 1 token
      8 // decimals
    )
  );
}

```

## How to revoke a token delegate (Token delegate iptal etme)
İptal etme, temsilciyi (delegate) null olarak ayarlar ve devredilen tutarı 0 olarak ayarlar.

```ts
// 1) use build-in function
{
  let txhash = await revoke(
    connection, // connection
    feePayer, // payer
    tokenAccountPubkey, // token account
    alice // owner of token account
  );
}

// or

// 2) compose by yourself
{
  let tx = new Transaction().add(
    createRevokeInstruction(
      tokenAccountPubkey, // token account
      alice.publicKey // owner of token account
    )
  );
}

```

## How to manage wrapped SOL (Wrapped SOL yönetimi)

Wrapped SOL diğer tüm token mint’ler gibidir. Aradaki fark, `syncNative kullanmak ve özellikle `NATIVE_MINT` adresinde belirteç account'ları oluşturmaktır.

### Create Token Account (Token Account Oluşturma)

[Token Hesabı Oluştur](#create-token-account)’maya çok benzer şekilde ilerliyoruz ve mint'i `NATIVE_MINT` ile değiştiriyoruz.

```js
import { NATIVE_MINT } from "@solana/spl-token";
```

### Add Balance (Bakiye Ekleme)

Wrapped SOL için bakiye eklemenin iki yolu vardır:
#### 1. By SOL Transfer (SOL Transferi)

```ts
let tx = new Transaction().add(
  // trasnfer SOL
  SystemProgram.transfer({
    fromPubkey: alice.publicKey,
    toPubkey: ata,
    lamports: amount,
  }),
  // sync wrapped SOL balance
  createSyncNativeInstruction(ata)
);

```

#### 2. By Token Transfer (Token Transferi)

```ts
let tx = new Transaction().add(
  // create token account
  SystemProgram.createAccount({
    fromPubkey: alice.publicKey,
    newAccountPubkey: auxAccount.publicKey,
    space: ACCOUNT_SIZE,
    lamports:
      (await getMinimumBalanceForRentExemptAccount(connection)) + amount, // rent + amount
    programId: TOKEN_PROGRAM_ID,
  }),
  // init token account
  createInitializeAccountInstruction(
    auxAccount.publicKey,
    NATIVE_MINT,
    alice.publicKey
  ),
  // transfer WSOL
  createTransferInstruction(auxAccount.publicKey, ata, alice.publicKey, amount),
  // close aux account
  createCloseAccountInstruction(
    auxAccount.publicKey,
    alice.publicKey,
    alice.publicKey
  )
);

```

## How to get all token accounts by owner (Tüm token account’ları sahibi tarafından nasıl alınır?)

Token account'larını sahibine göre getirebilirsiniz. Bunu yapmanın iki yolu vardır:

1. Get All Token Account (Tüm Token Account’ları Getirme)

```ts
let response = await connection.getParsedTokenAccountsByOwner(owner, {
  programId: TOKEN_PROGRAM_ID,
});

```
2. Filter By Mint (Mint’e Göre Filtreleme)

```ts
let response = await connection.getParsedTokenAccountsByOwner(owner, {
  mint: mint,
});
```
