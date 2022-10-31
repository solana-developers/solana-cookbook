const candyMachine = await metaplex.candyMachinesV2().findMintedNfts({
  candyMachine: candyMachineId,
});
