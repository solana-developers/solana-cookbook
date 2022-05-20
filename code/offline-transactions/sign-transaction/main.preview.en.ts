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
