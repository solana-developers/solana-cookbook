import * as anchor from "@project-serum/anchor";
import { Keypair } from "@solana/web3.js";
import {
  loadSwitchboardProgram,
  OracleAccount,
  OracleQueueAccount,
} from "@switchboard-xyz/switchboard-v2";

let payer: Keypair;
const program = await loadSwitchboardProgram("devnet", undefined, payer);

const queueAccount = new OracleQueueAccount({
  program,
  publicKey: queuePubkey,
});

// Create oracle
const oracleAccount = await OracleAccount.create(program, {
  name: Buffer.from("My Oracle"),
  queueAccount,
});
