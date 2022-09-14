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

  const modifyComputeUnits = ComputeBudgetProgram.setComputeUnitLimit({ 
    units: 1000000 
  });

  const addPriorityFee = ComputeBudgetProgram.setComputeUnitPrice({ 
    microLamports: 1 
  });

  // Total fee will be 5,001 Lamports for 1M CU
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

  const signature = await sendAndConfirmTransaction(connection, transaction, [
    payer,
  ]);
  console.log(signature);
  const result = await connection.getParsedTransaction(signature);
  console.log(result);
})();
