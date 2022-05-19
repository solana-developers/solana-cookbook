#!/usr/bin/env node

import { serialize, deserialize, deserializeUnchecked } from "borsh";
import { Buffer } from "buffer";
import { expect } from "chai";
import { PublicKey, Struct } from "@solana/web3.js";

/**
 * Primitive extends the Struct type from Solana Library
 * for convenience of dynamic property setting
 * @extends {Struct} Solana JS Struct class
 */

class Primitive extends Struct {
  constructor(properties) {
    super(properties);
  }
}

/**
 * Entry point for script *
 */
async function entry() {
  // Emulate BTreeMap
  let map = new Map();
  map.set("cookbook", "recipe");
  map.set("recipe", "ingredient");

  // Setup a Primitive for all basic and a few
  // compound types
  const value = new Primitive({
    U8: 255,
    U16: 65535,
    U32: 4294967295,
    FIXED_STRING_ARRAY: ["hello", "world"],
    FIXED_U8_ARRAY: [1, 2, 3, 4, 5],
    MAP_STRING_STRING: map,
  });
  // Define our schema
  const schema = new Map([
    [
      Primitive,
      {
        kind: "struct",
        fields: [
          ["U8", "u8"],
          ["U16", "u16"],
          ["U32", "u32"],
          ["FIXED_STRING_ARRAY", ["string", 2]],
          ["FIXED_U8_ARRAY", ["u8", 5]],
          [
            "MAP_STRING_STRING",
            { kind: "map", key: "string", value: "string" },
          ],
        ],
      },
    ],
  ]);
  console.log("Value = ", value);
  // Serialize then deserialize
  const dser = Buffer.from(serialize(schema, value));
  console.log(dser);
  const newValue = deserialize(schema, Primitive, dser);
  // Viola!
  console.log("New value = ", newValue);
  console.log("Fixed string array = ", newValue["FIXED_STRING_ARRAY"]);
  console.log("Fixed u8 array = ", newValue["FIXED_U8_ARRAY"]);
  console.log("Map = ", newValue["MAP_STRING_STRING"]);
}

entry();
