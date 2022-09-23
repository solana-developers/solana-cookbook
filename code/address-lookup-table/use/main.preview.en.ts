let addressLookupTable = (
  await connection.getAddressLookupTable(addressLookupTablePubkey)
).value!;

let tx = new VersionedTransaction(
  MessageV0.compile({
    payerKey: feePayer.publicKey,
    instructions: [
      SystemProgram.transfer({
        fromPubkey: feePayer.publicKey,
        toPubkey: new PublicKey("FUarP2p5EnxD66vVDL4PWRoWMzA56ZVHG24hpEDFShEz"),
        lamports: 0.01 * LAMPORTS_PER_SOL,
      }),
    ],
    recentBlockhash: (await connection.getLatestBlockhash()).blockhash,
    addressLookupTableAccounts: [addressLookupTable],
  })
);

tx.sign([feePayer]);
