import {
  Connection,
  Keypair,
  LAMPORTS_PER_SOL,
  PublicKey,
  SystemProgram,
  Transaction,
  TransactionInstruction,
} from "@solana/web3.js";

import * as borsh from "@project-serum/borsh";

const MY_PROGRAM_ID = new PublicKey(
  "FwcG3yKuAkCfX68q9GPykNWDaaPjdZFaR1Tgr8qSxaEa"
);

const MAP_DATA_LAYOUT = borsh.struct([
  borsh.u8("is_initialized"),
  borsh.map(borsh.publicKey("user_a"), borsh.publicKey("user_b"), "blogs"),
]);

async () => {
  const connection = new Connection("http://localhost:8899", "confirmed");

  const userA = Keypair.generate();
  const userB = Keypair.generate();
  const userC = Keypair.generate();

  const [mapKey] = await PublicKey.findProgramAddress(
    [Buffer.from("map")],
    MY_PROGRAM_ID
  );

  const airdropASig = await connection.requestAirdrop(
    userA.publicKey,
    5 * LAMPORTS_PER_SOL
  );
  const airdropBSig = await connection.requestAirdrop(
    userB.publicKey,
    5 * LAMPORTS_PER_SOL
  );
  const airdropCSig = await connection.requestAirdrop(
    userC.publicKey,
    5 * LAMPORTS_PER_SOL
  );
  const promiseA = connection.confirmTransaction(airdropASig);
  const promiseB = connection.confirmTransaction(airdropBSig);
  const promiseC = connection.confirmTransaction(airdropCSig);

  await Promise.all([promiseA, promiseB, promiseC]);

  const initMapIx = new TransactionInstruction({
    programId: MY_PROGRAM_ID,
    keys: [
      {
        pubkey: userA.publicKey,
        isSigner: true,
        isWritable: true,
      },
      {
        pubkey: mapKey,
        isSigner: false,
        isWritable: true,
      },
      {
        pubkey: SystemProgram.programId,
        isSigner: false,
        isWritable: false,
      },
    ],
    data: Buffer.from(Uint8Array.of(0)),
  });

  const insertABIx = new TransactionInstruction({
    programId: MY_PROGRAM_ID,
    keys: [
      {
        pubkey: userA.publicKey,
        isSigner: true,
        isWritable: true,
      },
      {
        pubkey: userB.publicKey,
        isSigner: false,
        isWritable: false,
      },
      {
        pubkey: mapKey,
        isSigner: false,
        isWritable: true,
      },
    ],
    data: Buffer.from(Uint8Array.of(1)),
  });

  const insertBCIx = new TransactionInstruction({
    programId: MY_PROGRAM_ID,
    keys: [
      {
        pubkey: userB.publicKey,
        isSigner: true,
        isWritable: true,
      },
      {
        pubkey: userC.publicKey,
        isSigner: false,
        isWritable: false,
      },
      {
        pubkey: mapKey,
        isSigner: false,
        isWritable: true,
      },
    ],
    data: Buffer.from(Uint8Array.of(1)),
  });

  const insertCAIx = new TransactionInstruction({
    programId: MY_PROGRAM_ID,
    keys: [
      {
        pubkey: userC.publicKey,
        isSigner: true,
        isWritable: true,
      },
      {
        pubkey: userA.publicKey,
        isSigner: false,
        isWritable: false,
      },
      {
        pubkey: mapKey,
        isSigner: false,
        isWritable: true,
      },
    ],
    data: Buffer.from(Uint8Array.of(1)),
  });

  const tx = new Transaction();
  tx.add(initMapIx);
  tx.add(insertABIx);
  tx.add(insertBCIx);
  tx.add(insertCAIx);

  const sig = await connection.sendTransaction(tx, [userA, userB, userC], {
    skipPreflight: false,
    preflightCommitment: "confirmed",
  });
  await connection.confirmTransaction(sig);

  const mapAccount = await connection.getAccountInfo(mapKey);
  const mapData = MAP_DATA_LAYOUT.decode(mapAccount.data);
  console.log("MapData: ", mapData);
};
