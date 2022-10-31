const candyMachines = await metaplex.candyMachinesV2().findAllBy({
  type: "authority",
  publicKey: authority,
});

candyMachines.map((candyMachine, index) => {
  console.log(`#${index + 1} Candy Machine ID - ${candyMachine.address}`);
});

/**
 * #1 Candy Machine ID - HSZxtWx6vgGWGsWu9SouXkHA2bAKCMtMZyMKzF2dvhrR
 */
