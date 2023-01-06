await metaplex.candyMachines().insertItems({
  candyMachineId,
  items: [
    { name: "My NFT #1", uri: "https://example.com/nft1" },
    { name: "My NFT #2", uri: "https://example.com/nft2" },
    { name: "My NFT #3", uri: "https://example.com/nft3" },
  ],
});
