import {
  clusterApiUrl,
  Connection,
  Keypair,
  Transaction,
  SystemProgram,
  LAMPORTS_PER_SOL,
  Message,
} from "@solana/web3.js";
import * as nacl from "tweetnacl";
import * as bs58 from "bs58";

// to complete a offline transaction, I will seperate them into four steps
// 1. Create Transaction
// 2. Sign Transaction
// 3. Recover Transaction
// 4. Send Transaction

(async () => {
  // create connection
  const connection = new Connection(clusterApiUrl("devnet"), "confirmed");

  // create a example tx, alice transfer to bob and feePayer is `feePayer`
  // alice and feePayer are signer in this tx
  const feePayer = Keypair.generate();
  await connection.confirmTransaction(await connection.requestAirdrop(feePayer.publicKey, LAMPORTS_PER_SOL));
  const alice = Keypair.generate();
  await connection.confirmTransaction(await connection.requestAirdrop(alice.publicKey, LAMPORTS_PER_SOL));
  const bob = Keypair.generate();

  // 1. Create Transaction
  let tx = new Transaction().add(
    SystemProgram.transfer({
      fromPubkey: alice.publicKey,
      toPubkey: bob.publicKey,
      lamports: 0.1 * LAMPORTS_PER_SOL,
    })
  );
  tx.recentBlockhash = (await connection.getRecentBlockhash()).blockhash;
  tx.feePayer = feePayer.publicKey;
  let realDataNeedToSign = tx.serializeMessage(); // the real data singer need to sign.

  // 2. Sign Transaction
  // use any lib you like, the main idea is to use ed25519 to sign it.
  // the return signature should be 64 bytes.
  let feePayerSignature = nacl.sign.detached(realDataNeedToSign, feePayer.secretKey);
  let aliceSignature = nacl.sign.detached(realDataNeedToSign, alice.secretKey);

  // 3. Recover Tranasction

  // you can verify signatures before you recovering the transaction
  let verifyFeePayerSignatureResult = nacl.sign.detached.verify(
    realDataNeedToSign,
    feePayerSignature,
    feePayer.publicKey.toBytes() // you should use the raw pubkey (32 bytes) to verify
  );
  console.log(`verify feePayer signature: ${verifyFeePayerSignatureResult}`);

  let verifyAliceSignatureResult = nacl.sign.detached.verify(
    realDataNeedToSign,
    aliceSignature,
    alice.publicKey.toBytes()
  );
  console.log(`verify alice signature: ${verifyAliceSignatureResult}`);

  // there are two ways you can recover the tx
  // 3.a Recover Tranasction (use populate then addSignauture)
  {
    let recoverTx = Transaction.populate(Message.from(realDataNeedToSign));
    recoverTx.addSignature(feePayer.publicKey, Buffer.from(feePayerSignature));
    recoverTx.addSignature(alice.publicKey, Buffer.from(aliceSignature));

    // 4. Send transaction
    console.log(`txhash: ${await connection.sendRawTransaction(recoverTx.serialize())}`);
  }

  // or

  // 3.b. Recover Tranasction (use populate with signature)
  {
    let recoverTx = Transaction.populate(Message.from(realDataNeedToSign), [
      bs58.encode(feePayerSignature),
      bs58.encode(aliceSignature),
    ]);

    // 4. Send transaction
    console.log(`txhash: ${await connection.sendRawTransaction(recoverTx.serialize())}`);
  }

  // if this process takes too long, your recent blockhash will expire (after 150 blocks).
  // you can use `durable nonce` to get rid of it.
})();
