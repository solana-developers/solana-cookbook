const candyMachine = await metaplex.candyMachinesV2().findByAddress({
  address: candyMachineId,
});
