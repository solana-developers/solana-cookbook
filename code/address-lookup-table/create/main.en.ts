import {
  Connection,
  Keypair,
  Transaction,
  AddressLookupTableProgram,
} from "@solana/web3.js";
import * as bs58 from "bs58";

// connection
const connection = new Connection("https://api.devnet.solana.com");

// G2FAbFQPFa5qKXCetoFZQEvF9BVvCKbvUZvodpVidnoY
const feePayer = Keypair.fromSecretKey(
  bs58.decode(
    "4NMwxzmYj2uvHuq8xoqhY8RXg63KSVJM1DXkpbmkUY7YQWuoyQgFnnzn6yo3CMnqZasnNPNuAT2TLwQsCaKkUddp"
  )
);

(async () => {
  let [instruction, addressLookupTablePubkey] =
    AddressLookupTableProgram.createLookupTable({
      authority: feePayer.publicKey,
      payer: feePayer.publicKey,
      recentSlot: await connection.getSlot(),
    });

  console.log(
    `addressLookupTablePubkey: ${addressLookupTablePubkey.toBase58()}`
  );

  let tx = new Transaction().add(instruction);
  tx.feePayer = feePayer.publicKey;
  let txhash = await connection.sendTransaction(tx, [feePayer]);
  console.log(`txhash: ${txhash}`);
})();
