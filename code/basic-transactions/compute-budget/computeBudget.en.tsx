import { BN } from '@project-serum/anchor';
import { Transaction } from '@solana/web3.js';
import { Keypair, Connection, LAMPORTS_PER_SOL, sendAndConfirmTransaction, TransactionInstruction, PublicKey, SystemProgram } from '@solana/web3.js';

(async () => {
  const payer = Keypair.generate();
  const toAccount = Keypair.generate().publicKey;

  const connection = new Connection(
      'http://127.0.0.1:8899',
      'confirmed'
  );

  const airdropSignature = await connection.requestAirdrop(
    payer.publicKey,
    LAMPORTS_PER_SOL,
);

await connection.confirmTransaction(airdropSignature);

  const data = Buffer.from(
    Uint8Array.of(0, ...new BN(256000).toArray("le", 4))
  );
  const additionalComputeBudgetInstruction = new TransactionInstruction({
    keys: [],
    programId: new PublicKey("ComputeBudget111111111111111111111111111111"),
    data,
  });
  const transaction = new Transaction()
    .add(additionalComputeBudgetInstruction)
    .add(SystemProgram.transfer({
      fromPubkey: payer.publicKey,
      toPubkey: toAccount,
      lamports: 1,
    }));

  const signature = await sendAndConfirmTransaction(connection, transaction, [payer]);
  console.log(signature);
  const result = await connection.getParsedTransaction(signature);
  console.log(result);
})();