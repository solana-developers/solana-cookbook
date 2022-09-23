AddressLookupTableProgram.extendLookupTable({
  lookupTable: addressLookupTablePubkey,
  authority: feePayer.publicKey,
  payer: feePayer.publicKey,
  addresses: [
    new PublicKey("G2FAbFQPFa5qKXCetoFZQEvF9BVvCKbvUZvodpVidnoY"),
    new PublicKey("FUarP2p5EnxD66vVDL4PWRoWMzA56ZVHG24hpEDFShEz"),
  ],
});
