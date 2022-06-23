import * as anchor from "@project-serum/anchor";
import { Keypair } from "@solana/web3.js";
import {
  loadSwitchboardProgram,
  VrfAccount,
} from "@switchboard-xyz/switchboard-v2";

let payer: Keypair;
const program = await loadSwitchboardProgram("devnet", undefined, payer);

const vrfAccount = new VrfAccount({
  program,
  publicKey: vrfKey,
});
const vrf = await vrfAccount.loadData();
console.log(vrf.currentRound.result);
