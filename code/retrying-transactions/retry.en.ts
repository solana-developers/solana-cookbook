import {
  Keypair,
  Connection,
  LAMPORTS_PER_SOL,
  SystemProgram,
  Transaction,
} from "@solana/web3.js";
import * as nacl from "tweetnacl";

const sleep = async (ms: number) => {
  return new Promise((r) => setTimeout(r, ms));
};

(async () => {
  const payer = Keypair.generate();
  const toAccount = Keypair.generate().publicKey;

  const connection = new Connection("http://127.0.0.1:8899", "confirmed");

  const airdropSignature = await connection.requestAirdrop(
    payer.publicKey,
    LAMPORTS_PER_SOL
  );

  await connection.confirmTransaction(airdropSignature);

  const blockhashResponse = await connection.getLatestBlockhashAndContext();
  const lastValidBlockHeight = blockhashResponse.context.slot + 150;

  const transaction = new Transaction({
    feePayer: payer.publicKey,
    blockhash: blockhashResponse.value.blockhash,
    lastValidBlockHeight: lastValidBlockHeight,
  }).add(
    SystemProgram.transfer({
      fromPubkey: payer.publicKey,
      toPubkey: toAccount,
      lamports: 1000000,
    })
  );
  const message = transaction.serializeMessage();
  const signature = nacl.sign.detached(message, payer.secretKey);
  transaction.addSignature(payer.publicKey, Buffer.from(signature));
  const rawTransaction = transaction.serialize();
  let blockheight = await connection.getBlockHeight();

  while (blockheight < lastValidBlockHeight) {
    connection.sendRawTransaction(rawTransaction, {
      skipPreflight: true,
    });
    await sleep(500);
    blockheight = await connection.getBlockHeight();
  }
})();
