# Offline Transaction (Çevrimdışı işlem)

## Sign Transaction (İşlem İmzalama)

Çevrimdışı bir işlem oluşturmak için işlemi imzalamanız gerekir ve ardından herkes bunu ağda yayınlayabilir.

```ts
// there are two ways you can recover the tx
// 3.a Recover Tranasction (use populate then addSignauture)
{
  let recoverTx = Transaction.populate(Message.from(realDataNeedToSign));
  recoverTx.addSignature(feePayer.publicKey, Buffer.from(feePayerSignature));
  recoverTx.addSignature(alice.publicKey, Buffer.from(aliceSignature));

  // 4. Send transaction
  console.log(
    `txhash: ${await connection.sendRawTransaction(recoverTx.serialize())}`
  );
}

// or

// 3.b. Recover Tranasction (use populate with signature)
{
  let recoverTx = Transaction.populate(Message.from(realDataNeedToSign), [
    bs58.encode(feePayerSignature),
    bs58.encode(aliceSignature),
  ]);

  // 4. Send transaction
  console.log(
    `txhash: ${await connection.sendRawTransaction(recoverTx.serialize())}`
  );
}

```

## Partial Sign Transaction (Kısmi İmzalama)

Bir işlem birden fazla imza gerektirdiğinde, kısmen imzalayabilirsiniz. Diğer imzalayanlar daha sonra ağda imzalayabilir ve yayınlayabilir.

Bunun ne zaman yararlı olduğuna dair bazı örnekler:

- Ödeme karşılığında bir SPL token’ı gönderimi
- Bir işlemi daha sonra orijinalliğini doğrulayabilmek için imzalama
- İmzanızı gerektiren bir işlemde özel programları çağırma

Bu örnekte Bob, ödemesi karşılığında Alice'e bir SPL token gönderir:

```ts
// 1. Add an instruction to send the token from Bob to Alice
transaction.add(
  createTransferCheckedInstruction(
    bobTokenAddress, // source
    tokenAddress, // mint
    aliceTokenAccount.address, // destination
    bobKeypair.publicKey, // owner of source account
    1 * 10 ** tokenMint.decimals, // amount to transfer
    tokenMint.decimals // decimals of token
  )
);

// 2. Bob partially signs the transaction
transaction.partialSign(bobKeypair);

// 3. Serialize the transaction without requiring all signatures
const serializedTransaction = transaction.serialize({
  requireAllSignatures: false,
});

// 4. Alice can deserialize the transaction
const recoveredTransaction = Transaction.from(
  Buffer.from(transactionBase64, "base64")
);
```

## Durable Nonce(Uzun Süreli Nonce)

`RecentBlockhash`, bir işlem için önemli bir değerdir. Süresi dolmuş bir blockhash (150 bloktan sonra) kullanırsanız işleminiz reddedilecektir. Son kullanma tarihi geçmeyecek bir blockhash elde etmek için `durable nonce` kullanabilirsiniz. Bu mekanizmayı tetiklemek için işleminizin aşağıdakileri sağlaması gerekir.

1. `nonce account`'ında saklanan bir `nonce`'u yeni bir blockhash olarak kullanması
2. ilk talimata `nonce avans` işlemini koyması

### Create Nonce Account (Nonce Account Oluşturma)

```ts
let tx = new Transaction().add(
  // create nonce account
  SystemProgram.createAccount({
    fromPubkey: feePayer.publicKey,
    newAccountPubkey: nonceAccount.publicKey,
    lamports: await connection.getMinimumBalanceForRentExemption(
      NONCE_ACCOUNT_LENGTH
    ),
    space: NONCE_ACCOUNT_LENGTH,
    programId: SystemProgram.programId,
  }),
  // init nonce account
  SystemProgram.nonceInitialize({
    noncePubkey: nonceAccount.publicKey, // nonce account pubkey
    authorizedPubkey: nonceAccountAuth.publicKey, // nonce account authority (for advance and close)
  })
);

console.log(
  `txhash: ${await connection.sendTransaction(tx, [feePayer, nonceAccount])}`
);

```

### Get Nonce Account (Nonce Account Getirme)

```ts
let accountInfo = await connection.getAccountInfo(nonceAccountPubkey);
let nonceAccount = NonceAccount.fromAccountData(accountInfo.data);

```

### Use Nonce Account (Nonce Account Kullanma)

```ts
let tx = new Transaction().add(
  // nonce advance must be the first instruction
  SystemProgram.nonceAdvance({
    noncePubkey: nonceAccountPubkey,
    authorizedPubkey: nonceAccountAuth.publicKey,
  }),
  // after that, you do what you really want to do, here we append a transfer instruction as an example.
  SystemProgram.transfer({
    fromPubkey: feePayer.publicKey,
    toPubkey: nonceAccountAuth.publicKey,
    lamports: 1,
  })
);
// assign `nonce` as recentBlockhash
tx.recentBlockhash = nonceAccount.nonce;
tx.feePayer = feePayer.publicKey;
tx.sign(
  feePayer,
  nonceAccountAuth
); /* fee payer + nonce account authority + ... */

console.log(`txhash: ${await connection.sendRawTransaction(tx.serialize())}`);

```
