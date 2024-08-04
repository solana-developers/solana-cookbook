import { clusterApiUrl, Connection, Keypair } from '@solana/web3.js';
import { LAMPORTS_PER_SOL, PublicKey, SystemProgram } from '@solana/web3.js';
import {
  Transaction,
  TransactionInstruction,
  sendAndConfirmTransaction,
} from '@solana/web3.js';

import * as BN from 'bn.js';

// Users
const PAYER_KEYPAIR = Keypair.generate();
const GENERAL_STATE_KEYPAIR = Keypair.generate();

const ACCOUNT_SPACE_BUFFER = Buffer.from(
  Uint8Array.of(...new BN(100).toArray('le', 8))
);

(async () => {
  const connection = new Connection(clusterApiUrl('devnet'), 'confirmed');
  const latestBlockHash = await connection.getLatestBlockhash();
  const programId = new PublicKey(
    'DkuQ5wsndkzXfgqDB6Lgf4sDjBi4gkLSak1dM5Mn2RuQ'
  );

  // Airdropping 1 SOL
  const feePayer = Keypair.generate();
  await connection.confirmTransaction(
    {
      blockhash: latestBlockHash.blockhash,
      lastValidBlockHeight: latestBlockHash.lastValidBlockHeight,
      signature: await connection.requestAirdrop(
        feePayer.publicKey,
        LAMPORTS_PER_SOL
      ),
    },
    'confirmed'
  );

  // Our program's CPI instruction (create_account)
  const createAccountIx = new TransactionInstruction({
    programId: programId,
    data: ACCOUNT_SPACE_BUFFER,
    keys: [
      {
        isSigner: true,
        isWritable: true,
        pubkey: PAYER_KEYPAIR.publicKey,
      },
      {
        isSigner: true,
        isWritable: true,
        pubkey: GENERAL_STATE_KEYPAIR.publicKey,
      },
      {
        isSigner: false,
        isWritable: false,
        pubkey: SystemProgram.programId,
      },
    ],
  });

  const transaction = new Transaction();
  // Adding up all the above instructions
  transaction.add(createAccountIx);

  const txHash = await sendAndConfirmTransaction(connection, transaction, [
    PAYER_KEYPAIR,
    GENERAL_STATE_KEYPAIR,
  ]);

  console.log(`Create Account CPI Success: ${txHash}`);
})();
