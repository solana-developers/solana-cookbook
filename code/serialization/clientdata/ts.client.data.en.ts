import { serialize, deserialize, deserializeUnchecked } from "borsh";
import { Buffer } from "buffer";
import {
  Keypair,
  AccountMeta,
  Connection,
  LAMPORTS_PER_SOL,
  PublicKey,
  SystemProgram,
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

export class AccoundData extends Assignable {}

const dataSchema = new Map([
  [
    AccoundData,
    {
      kind: "struct",
      fields: [
        ["initialized", "u8"],
        ["tree_length", "u32"],
        ["map", { kind: "map", key: "string", value: "string" }],
      ],
    },
  ],
]);

/**
 * Fetch program account data
 * @param {Connection} connection - Solana RPC connection
 * @param {PublicKey} account - Public key for account whose data we want
 * @return {Promise<AccoundData>} - Keypair
 */
export async function getAccountData(
  connection: Connection,
  account: PublicKey
): Promise<AccoundData> {
  let nameAccount = await connection.getAccountInfo(account, "processed");
  return deserializeUnchecked(dataSchema, AccoundData, nameAccount.data);
}
