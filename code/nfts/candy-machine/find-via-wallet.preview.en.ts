const candyMachines = await metaplex.candyMachinesV2().findAllBy({
  type: "wallet",
  publicKey: wallet,
});

candyMachines.map((candyMachine, index) => {
  console.log(`#${index + 1} Candy Machine ID - ${candyMachine.address}`);
});
