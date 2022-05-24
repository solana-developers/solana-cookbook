import { BN } from "@project-serum/anchor";
import {
  Keypair,
  Connection,
  LAMPORTS_PER_SOL,
  sendAndConfirmTransaction,
  ComputeBudgetProgram,
  SystemProgram,
  Transaction,
} from "@solana/web3.js";

(async () => {
  const payer = Keypair.generate();
  const toAccount = Keypair.generate().publicKey;

  const connection = new Connection("http://127.0.0.1:8899", "confirmed");

  const airdropSignature = await connection.requestAirdrop(
    payer.publicKey,
    LAMPORTS_PER_SOL
  );

  await connection.confirmTransaction(airdropSignature);

  const additionalComputeBudgetInstruction = ComputeBudgetProgram.requestUnits({
    units: 400000,
    additionalFee: 0,
  });
  const transaction = new Transaction()
    .add(additionalComputeBudgetInstruction)
    .add(
      SystemProgram.transfer({
        fromPubkey: payer.publicKey,
        toPubkey: toAccount,
        lamports: 10000000,
      })
    );

  const signature = await sendAndConfirmTransaction(connection, transaction, [
    payer,
  ]);
  console.log(signature);
  const result = await connection.getParsedTransaction(signature);
  console.log(result);
})();
