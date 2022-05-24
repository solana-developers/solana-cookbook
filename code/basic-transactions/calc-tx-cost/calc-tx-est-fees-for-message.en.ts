import {
  clusterApiUrl,
  Connection,
  Keypair,
  Message,
  SystemProgram,
  SYSTEM_INSTRUCTION_LAYOUTS,
  Transaction,
} from "@solana/web3.js";
import bs58 from "bs58";

(async () => {
  // Connect to cluster
  const connection = new Connection(clusterApiUrl("devnet"), "confirmed");

  const payer = Keypair.generate();
  const payee = Keypair.generate();

  const type = SYSTEM_INSTRUCTION_LAYOUTS.Transfer;
  const data = Buffer.alloc(type.layout.span);
  const layoutFields = Object.assign({ instruction: type.index });
  type.layout.encode(layoutFields, data);

  const recentBlockhash = await connection.getLatestBlockhash();

  const messageParams = {
    accountKeys: [
      payer.publicKey.toString(),
      payee.publicKey.toString(),
      SystemProgram.programId.toString(),
    ],
    header: {
      numReadonlySignedAccounts: 0,
      numReadonlyUnsignedAccounts: 1,
      numRequiredSignatures: 1,
    },
    instructions: [
      {
        accounts: [0, 1],
        data: bs58.encode(data),
        programIdIndex: 2,
      },
    ],
    recentBlockhash: recentBlockhash.blockhash,
  };

  const message = new Message(messageParams);

  const fees = await connection.getFeeForMessage(message);
  console.log(`Estimated SOL transfer cost: ${fees.value} lamports`);
  // Estimated SOL transfer cost: 5000 lamports
})();
