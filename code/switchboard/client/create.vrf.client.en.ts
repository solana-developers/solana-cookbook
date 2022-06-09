import * as anchor from "@project-serum/anchor";
import { Keypair } from "@solana/web3.js";
import {
  loadSwitchboardProgram,
  OracleQueueAccount,
  PermissionAccount,
  SwitchboardPermission,
  VrfAccount,
} from "@switchboard-xyz/switchboard-v2";

let payer: Keypair;
const program = await loadSwitchboardProgram("devnet", undefined, payer);
const queueAccount = new queueAccount({ program, publicKey: queueKey });
const queue = await queueAccount.loadData();

// load client program used for callback
const vrfClientProgram = anchor.workspace
  .AnchorVrfParser as anchor.Program<AnchorVrfParser>;
const vrfSecret = anchor.web3.Keypair.generate();

const vrfIxCoder = new anchor.BorshInstructionCoder(vrfClientProgram.idl);
const vrfClientCallback: Callback = {
  programId: vrfClientProgram.programId,
  accounts: [
    // ensure all accounts in updateResult are populated
    { pubkey: vrfClientKey, isSigner: false, isWritable: true },
    { pubkey: vrfSecret.publicKey, isSigner: false, isWritable: false },
  ],
  ixData: vrfIxCoder.encode("updateResult", ""), // pass any params for instruction here
};

// create VRF
const vrfAccount = await VrfAccount.create(program, {
  queue: queueAccount,
  callback: vrfClientCallback,
  authority: vrfClientKey, // vrf authority
  keypair: vrfSecret,
});

// create permission
const permissionAccount = await PermissionAccount.create(program, {
  authority: queue.authority,
  granter: queue.publicKey,
  grantee: vrfAccount.publicKey,
});

// if queue has not enabled unpermissionedVrfEnabled, queue will need to grant permission
let queueAuthority: Keypair;
await permissionAccount.set({
  authority: queueAuthority,
  permission: SwitchboardPermission.PERMIT_VRF_REQUESTS,
  enable: true,
});
