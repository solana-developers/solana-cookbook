// by default, the owner of the minted nft would be `metaplex.identity().publicKey`. if you want to mint the nft to some other wallet, pass that public key along with the `newOwner` parameter
const candyMachine = await metaplex.candyMachinesV2().mint({
  candyMachine: candyMachineId,
  // newOwner: new PublicKey("some-other-public-key");
});
