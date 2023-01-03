# Sending Transactions(İşlem Gönderimi)

## How to send SOL (SOL nasıl gönderilir)

SOL göndermek için [SystemProgram][1] ile etkileşime geçmeniz gerekir.

```ts
const transferTransaction = new Transaction().add(
  SystemProgram.transfer({
    fromPubkey: fromKeypair.publicKey,
    toPubkey: toKeypair.publicKey,
    lamports: lamportsToSend,
  })
);

await sendAndConfirmTransaction(connection, transferTransaction, [fromKeypair]);
```

[1]: https://docs.solana.com/developing/runtime-facilities/programs#system-program

## How to send SPL-Tokens (SPL-Token’lar nasıl gönderilir)

SPL Tokenlarını aktarmak için [Token Program][1]ını kullanın. Bir SPL token göndermek için, onun SPL token account adresini bilmeniz gerekir. Aşağıdaki örnekle hem adresi alabilir hem de token gönderebilirsiniz.

```ts
// Add token transfer instructions to transaction
const transaction = new web3.Transaction().add(
  splToken.Token.createTransferInstruction(
    splToken.TOKEN_PROGRAM_ID,
    fromTokenAccount.address,
    toTokenAccount.address,
    fromWallet.publicKey,
    [],
    1
  )
);

// Sign transaction, broadcast, and confirm
await web3.sendAndConfirmTransaction(connection, transaction, [fromWallet]);
```

[1]: https://spl.solana.com/token

## How to calculate transaction cost (İşlem maliyeti nasıl hesaplanır)

Bir işlemin gerektirdiği imza sayısı, işlem maliyetini hesaplamak için kullanılır. Hesap oluşturmadığınız sürece, bu son işlem maliyeti olacaktır. Hesap oluşturma maliyetleri hakkında daha fazla bilgi edinmek için [rent muafiyetinin hesaplanması](accounts.md#calculating-rent-exemption)na bakın.

Aşağıdaki iki örnek, tahmini işlem maliyetini hesaplamak için şu anda mevcut olan iki yolu göstermektedir.

İlk örnek, `Transaction` sınıfında yeni bir yöntem olan `getEstimatedFee`'yi kullanırken, ikinci örnek, `Connection` sınıfında `getFeeCalculatorForBlockhash`'in yerini alan `getFeeForMessage`'ı kullanır.

### getEstimatedFee

```ts
const recentBlockhash = await connection.getLatestBlockhash();

const transaction = new Transaction({
  recentBlockhash: recentBlockhash.blockhash,
}).add(
  SystemProgram.transfer({
    fromPubkey: payer.publicKey,
    toPubkey: payee.publicKey,
    lamports: 10,
  })
);

const fees = await transaction.getEstimatedFee(connection);
console.log(`Estimated SOL transfer cost: ${fees} lamports`);
// Estimated SOL transfer cost: 5000 lamports
```

### getFeeForMessage

```ts
const message = new Message(messageParams);

const fees = await connection.getFeeForMessage(message);
console.log(`Estimated SOL transfer cost: ${fees.value} lamports`);
// Estimated SOL transfer cost: 5000 lamports
```
## How to add a memo to a transaction (Bir işleme mesaj nasıl eklenir)

Herhangi bir işlem, [memo program][2].ı kullanarak bir mesaj ekleyebilir. Şu anda Memo Programından `programID`'nin manuel olarak eklenmesi gerekiyor. `MemoSq4gqABAXKb96qnH8TysNcWxMyWCqXgDLGmfcHr`

```ts
const transferTransaction = new Transaction().add(
  SystemProgram.transfer({
    fromPubkey: fromKeypair.publicKey,
    toPubkey: toKeypair.publicKey,
    lamports: lamportsToSend,
  })
);

await transferTransaction.add(
  new TransactionInstruction({
    keys: [{ pubkey: fromKeypair.publicKey, isSigner: true, isWritable: true }],
    data: Buffer.from("Data to send in transaction", "utf-8"),
    programId: new PublicKey("MemoSq4gqABAXKb96qnH8TysNcWxMyWCqXgDLGmfcHr"),
  })
);

await sendAndConfirmTransaction(connection, transferTransaction, [fromKeypair]);
```

## How to change compute budget, fee, &amp; priority for a transaction (Bir işlem için işlem bütçesi, bedeli ve önceliği nasıl değiştirilir) 

İşlem (TX) önceliği, Baz Ücrete ek olarak bir Önceliklendirme Ücreti ödenerek elde edilir. Varsayılan olarak işlem bütçesi, maksimum 1,4M CU ile 200.000 İşlem Biriminin (CU) * talimat sayısının ürünüdür. Temel Ücret 5.000 Lamport'tur. Bir microLamport, 0,00001 Lamport'tur.

Tek bir TX için toplam işlem bütçesi veya Önceliklendirme Ücreti, ComputeBudgetProgram'dan talimatlar eklenerek değiştirilebilir.

`ComputeBudgetProgram.setComputeUnitPrice({ microLamports: number })`, Temel Ücretin (5.000 Lamport) üzerine bir Önceliklendirme Ücreti ekleyecektir. MicroLamports'ta sağlanan değer, Lamports'ta Önceliklendirme Ücretini belirlemek için CU bütçesiyle çarpılacaktır. Örneğin, CU bütçeniz 1M CU ise ve 1 microLamport/CU eklerseniz, Önceliklendirme Ücreti 1 Lamport (1M * 0,000001) olacaktır. Toplam ücret daha sonra 5001 Lamport olacaktır.

Yeni işlem bütçesini ayarlamak için `ComputeBudgetProgram.setComputeUnitLimit({ units: number })` kullanın. Sağlanan değer, varsayılan değerin yerini alacaktır. İşlemler, verimi en üst düzeye çıkarmak veya ücretleri en aza indirmek için yürütme için gereken minimum CU miktarını talep etmelidir.

```ts
const modifyComputeUnits = ComputeBudgetProgram.setComputeUnitLimit({ 
  units: 1000000 
});

const addPriorityFee = ComputeBudgetProgram.setComputeUnitPrice({ 
  microLamports: 1 
});

const transaction = new Transaction()
.add(modifyComputeUnits)
.add(addPriorityFee)
.add(
    SystemProgram.transfer({
      fromPubkey: payer.publicKey,
      toPubkey: toAccount,
      lamports: 10000000,
    })
  );
```

Program Logs Örneği ([Explorer](https://explorer.solana.com/tx/2mNPXeoy3kFxo12L8avsEoep65S4Ehvw2sheduDrAXbmmNJwTtXNmUrb5MM3s15eki2MWSQrwyKGAUQFZ9wAGo9K/)):

```
[ 1] Program ComputeBudget111111111111111111111111111111 invoke [1]
[ 2] Program ComputeBudget111111111111111111111111111111 success
[ 3]
[ 4] Program ComputeBudget111111111111111111111111111111 invoke [1]
[ 5] Program ComputeBudget111111111111111111111111111111 success
```

[2]: https://spl.solana.com/memo
