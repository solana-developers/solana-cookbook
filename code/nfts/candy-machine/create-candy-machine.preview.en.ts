const { candyMachine } = await metaplex.candyMachinesV2().create({
  sellerFeeBasisPoints: 5, // 0.05% royalties
  price: sol(0.0001), // 0.0001 SOL
  itemsAvailable: toBigNumber(5), // 5 items available
});

/**
 * #1 Candy Machine ID - HSZxtWx6vgGWGsWu9SouXkHA2bAKCMtMZyMKzF2dvhrR
 */
