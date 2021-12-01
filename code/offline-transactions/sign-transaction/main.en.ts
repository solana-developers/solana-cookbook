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

(async () => {
  // create connection
  const connection = new Connection(clusterApiUrl("devnet"), "confirmed");

  // create a example tx, alice transfer to bob and feePayer is `feePayer`
  // alice and feePayer are signer in this tx
  const feePayer = Keypair.generate();
  await connection.confirmTransaction(await connection.requestAirdrop(feePayer.publicKey, 0.01 * LAMPORTS_PER_SOL));
  const alice = Keypair.generate();
  await connection.confirmTransaction(await connection.requestAirdrop(alice.publicKey, 0.01 * LAMPORTS_PER_SOL));
  const bob = Keypair.generate();

  let tx = new Transaction().add(
    SystemProgram.transfer({
      fromPubkey: alice.publicKey,
      toPubkey: bob.publicKey,
      lamports: 0.001 * LAMPORTS_PER_SOL,
    })
  );
  tx.recentBlockhash = (await connection.getRecentBlockhash()).blockhash;
  tx.feePayer = feePayer.publicKey;

  // the real data should be signed
  let realDataNeedToSign = tx.serializeMessage();

  // use any lib you like, the main idea is to use ed25519 to sign it.
  // the return signature should be 64 bytes.
  let feePayerSignature = nacl.sign.detached(realDataNeedToSign, feePayer.secretKey);
  let aliceSignature = nacl.sign.detached(realDataNeedToSign, alice.secretKey);

  // there are two ways you can recover the tx

  // 1. use populate then addSignauture
  {
    let recoverTx = Transaction.populate(Message.from(realDataNeedToSign));
    recoverTx.addSignature(feePayer.publicKey, Buffer.from(feePayerSignature));
    recoverTx.addSignature(alice.publicKey, Buffer.from(aliceSignature));
    console.log(`txhash: ${await connection.sendRawTransaction(recoverTx.serialize())}`);
  }

  // 2. use populate with signature
  {
    let recoverTx = Transaction.populate(Message.from(realDataNeedToSign), [
      bs58.encode(feePayerSignature),
      bs58.encode(aliceSignature),
    ]);
    console.log(`txhash: ${await connection.sendRawTransaction(recoverTx.serialize())}`);
  }

  // if this process takes too long, your recent blockhash will expire (after 150 blocks).
  // you can use `durable nonce` to get rid of it.
})();
