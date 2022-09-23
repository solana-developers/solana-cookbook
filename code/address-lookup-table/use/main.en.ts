import {
  Connection,
  Keypair,
  SystemProgram,
  PublicKey,
  LAMPORTS_PER_SOL,
  VersionedTransaction,
  MessageV0,
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
  let addressLookupTable = (
    await connection.getAddressLookupTable(addressLookupTablePubkey)
  ).value!;

  let tx = new VersionedTransaction(
    MessageV0.compile({
      payerKey: feePayer.publicKey,
      instructions: [
        SystemProgram.transfer({
          fromPubkey: feePayer.publicKey,
          toPubkey: new PublicKey(
            "FUarP2p5EnxD66vVDL4PWRoWMzA56ZVHG24hpEDFShEz"
          ),
          lamports: 0.01 * LAMPORTS_PER_SOL,
        }),
      ],
      recentBlockhash: (await connection.getLatestBlockhash()).blockhash,
      addressLookupTableAccounts: [addressLookupTable],
    })
  );

  tx.sign([feePayer]);

  let txhash = await connection.sendTransaction(tx);
  console.log(`txhash: ${txhash}`);
})();
