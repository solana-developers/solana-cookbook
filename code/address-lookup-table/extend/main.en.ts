import {
  Connection,
  Keypair,
  Transaction,
  PublicKey,
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

const addressLookupTablePubkey = new PublicKey(
  "36Ey42Hi8FfvMk8yQyyR6i4b7dsUPMEYqJntbdjz5oHv"
);

(async () => {
  let tx = new Transaction().add(
    AddressLookupTableProgram.extendLookupTable({
      lookupTable: addressLookupTablePubkey,
      authority: feePayer.publicKey,
      payer: feePayer.publicKey,
      addresses: [
        new PublicKey("G2FAbFQPFa5qKXCetoFZQEvF9BVvCKbvUZvodpVidnoY"),
        new PublicKey("FUarP2p5EnxD66vVDL4PWRoWMzA56ZVHG24hpEDFShEz"),
      ],
    })
  );
  tx.feePayer = feePayer.publicKey;
  let txhash = await connection.sendTransaction(tx, [feePayer]);
  console.log(`txhash: ${txhash}`);
})();
