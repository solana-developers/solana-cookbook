#!/usr/bin/env node

import { serialize, deserialize, deserializeUnchecked } from "borsh";
import { Buffer } from "buffer";
import { PublicKey, Struct } from "@solana/web3.js";

/**
 * COption is meant to mirror the
 * `solana_program::options::COption`
 *
 * This type stores a u32 flag (0 | 1) indicating
 * the presence or not of a underlying PublicKey
 *
 * Similar to a Rust Option
 * @extends {Struct} Solana JS Struct class
 * @implements {encode}
 */
class COption extends Struct {
  constructor(properties) {
    super(properties);
  }

  /**
   * Creates a COption from a PublicKey
   * @param {PublicKey?} akey
   * @returns {COption} COption
   */
  static fromPublicKey(akey?: PublicKey): COption {
    if (akey == undefined) {
      return new COption({
        noneOrSome: 0,
        pubKeyBuffer: new Uint8Array(32),
      });
    } else {
      return new COption({
        noneOrSome: 1,
        pubKeyBuffer: akey.toBytes(),
      });
    }
  }
  /**
   * @returns {Buffer} Serialized COption (this)
   */
  encode(): Buffer {
    return Buffer.from(serialize(COPTIONSCHEMA, this));
  }
  /**
   * Safe deserializes a borsh serialized buffer to a COption
   * @param {Buffer} data - Buffer containing borsh serialized data
   * @returns {COption} COption object
   */
  static decode(data): COption {
    return deserialize(COPTIONSCHEMA, this, data);
  }

  /**
   * Unsafe deserializes a borsh serialized buffer to a COption
   * @param {Buffer} data - Buffer containing borsh serialized data
   * @returns {COption} COption object
   */
  static decodeUnchecked(data): COption {
    return deserializeUnchecked(COPTIONSCHEMA, this, data);
  }
}

/**
 * Defines the layout of the COption object
 * for serializing/deserializing
 * @type {Map}
 */
const COPTIONSCHEMA = new Map([
  [
    COption,
    {
      kind: "struct",
      fields: [
        ["noneOrSome", "u32"],
        ["pubKeyBuffer", [32]],
      ],
    },
  ],
]);

/**
 * Entry point for script *
 */
async function entry(indata?: PublicKey) {
  // If we get a PublicKey
  if (indata) {
    // Construct COption instance
    const coption = COption.fromPublicKey(indata);
    console.log("Testing COption with " + indata.toBase58());
    // Serialize it
    let copt_ser = coption.encode();
    console.log("copt_ser ", copt_ser);
    // Deserialize it
    const tdone = COption.decode(copt_ser);
    console.log(tdone);
    // Validate contains PublicKey
    if (tdone["noneOrSome"] == 1) {
      console.log("pubkey: " + new PublicKey(tdone["pubKeyBuffer"]).toBase58());
    }
    /*
            Output:
            Testing COption with A94wMjV54C8f8wn7zL8TxNCdNiGoq7XSN7vWGrtd4vwU
            copt_ser  Buffer(36) [1, 0, 0, 0, 135, 202, 71, 214, 68, 105, 98, 176, 211, 130, 105, 2, 55, 187, 86, 186, 109, 176, 80, 208, 77, 100, 221, 101, 20, 203, 149, 166, 96, 171, 119, 35, buffer: ArrayBuffer(8192), byteLength: 36, byteOffset: 1064, length: 36]
            COption {noneOrSome: 1, pubKeyBuffer: Uint8Array(32)}
            pubkey: A94wMjV54C8f8wn7zL8TxNCdNiGoq7XSN7vWGrtd4vwU
        */
  } else {
    console.log("Testing COption with null");
    // Construct COption instance
    const coption = COption.fromPublicKey();
    // Serialize it
    const copt_ser = coption.encode();
    console.log(copt_ser);
    // Deserialize it
    const tdone1 = COption.decode(copt_ser);
    console.log(tdone1);
    // Validate does NOT contains PublicKey
    if (tdone1["noneOrSome"] == 1) {
      throw Error("Expected no public key");
    } else console.log("pubkey: null");
    /*
            Output:
            Testing COption with null
            Buffer(36)[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, buffer: ArrayBuffer(8192), byteLength: 36, byteOffset: 2272, length: 36]
            COption { noneOrSome: 0, pubKeyBuffer: Uint8Array(32) }
            pubkey: null
        */
  }
}

// Test with PublicKey
entry(new PublicKey("A94wMjV54C8f8wn7zL8TxNCdNiGoq7XSN7vWGrtd4vwU"));
console.log("");
// Test without PublicKey
entry();
