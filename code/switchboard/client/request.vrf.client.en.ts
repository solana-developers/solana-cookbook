import * as anchor from "@project-serum/anchor";
import { Keypair } from "@solana/web3.js";
import {
  loadSwitchboardProgram,
  VrfAccount,
} from "@switchboard-xyz/switchboard-v2";

let payer: Keypair;
let authority: Keypair;
const program = await loadSwitchboardProgram("devnet", undefined, payer);

const vrfAccount = new VrfAccount({
  program,
  publicKey: vrfKey,
});
const vrf = await vrfAccount.loadData();

const queueAccount = new OracleQueueAccount({
  program,
  publicKey: vrf.queuePubkey,
});
const queue = await queueAccount.loadData();
const mint = await queueAccount.loadMint();

const payerTokenWallet = (
  await mint.getOrCreateAssociatedAccountInfo(payer.publicKey)
).address;

const signature = await vrfAccount.requestRandomness({
  authority,
  payer: payerTokenWallet,
  payerAuthority: payer,
});
