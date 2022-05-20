// Include borsh functionality

import { serialize, deserialize, deserializeUnchecked } from "borsh";
import { Buffer } from "buffer";

// Get Solana
import {
  Keypair,
  Connection,
  PublicKey,
  Transaction,
  TransactionInstruction,
  sendAndConfirmTransaction,
} from "@solana/web3.js";

// Flexible class that takes properties and imbues them
// to the object instance
class Assignable {
  constructor(properties) {
    Object.keys(properties).map((key) => {
      return (this[key] = properties[key]);
    });
  }
}

// Our instruction payload vocabulary
class Payload extends Assignable {}

// Borsh needs a schema describing the payload
const payloadSchema = new Map([
  [
    Payload,
    {
      kind: "struct",
      fields: [
        ["id", "u8"],
        ["key", "string"],
        ["value", "string"],
      ],
    },
  ],
]);

// Instruction variant indexes
enum InstructionVariant {
  InitializeAccount = 0,
  MintKeypair,
  TransferKeypair,
  BurnKeypair,
}

/**
 * Mint a key value pair to account
 * @param {Connection} connection - Solana RPC connection
 * @param {PublicKey} progId - Sample Program public key
 * @param {PublicKey} account - Target program owned account for Mint
 * @param {Keypair} wallet - Wallet for signing and payment
 * @param {string} mintKey - The key being minted key
 * @param {string} mintValue - The value being minted
 * @return {Promise<Keypair>} - Keypair
 */

export async function mintKV(
  connection: Connection,
  progId: PublicKey,
  account: PublicKey,
  wallet: Keypair,
  mintKey: string,
  mintValue: string
): Promise<string> {
  // Construct the payload
  const mint = new Payload({
    id: InstructionVariant.MintKeypair,
    key: mintKey, // 'ts key'
    value: mintValue, // 'ts first value'
  });

  // Serialize the payload
  const mintSerBuf = Buffer.from(serialize(payloadSchema, mint));
  // console.log(mintSerBuf)
  // => <Buffer 01 06 00 00 00 74 73 20 6b 65 79 0e 00 00 00 74 73 20 66 69 72 73 74 20 76 61 6c 75 65>
  // let mintPayloadCopy = deserialize(schema, Payload, mintSerBuf)
  // console.log(mintPayloadCopy)
  // => Payload { id: 1, key: 'ts key', value: 'ts first value' }

  // Create Solana Instruction
  const instruction = new TransactionInstruction({
    data: mintSerBuf,
    keys: [
      { pubkey: account, isSigner: false, isWritable: true },
      { pubkey: wallet.publicKey, isSigner: false, isWritable: false },
    ],
    programId: progId,
  });

  // Send Solana Transaction
  const transactionSignature = await sendAndConfirmTransaction(
    connection,
    new Transaction().add(instruction),
    [wallet],
    {
      commitment: "singleGossip",
      preflightCommitment: "singleGossip",
    }
  );
  console.log("Signature = ", transactionSignature);
  return transactionSignature;
}
