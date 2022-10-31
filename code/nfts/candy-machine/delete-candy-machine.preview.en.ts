// creating a candy machine
const { candyMachine } = await metaplex.candyMachinesV2().create({
  sellerFeeBasisPoints: 5, // 0.05% royalties
  price: sol(0.0001), // 0.0001 SOL
  itemsAvailable: toBigNumber(5), // 5 items available
});

console.log(`Candy Machine ID - ${candyMachine.address.toString()}`);

// deleting the candy machine
const { response } = await metaplex.candyMachinesV2().delete({
  candyMachine,
});
