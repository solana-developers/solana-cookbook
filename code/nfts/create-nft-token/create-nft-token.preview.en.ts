// Create the Mint Account for the NFT
const mintAccount = await Token.createMint(
  connection,
  userKeypair,
  userKeypair.publicKey,
  null,
  0,
  TOKEN_PROGRAM_ID
);

// Get/Create the Associated Account for the user to hold the NFT
const userAssosciatedAccount =
  await mintAccount.getOrCreateAssociatedAccountInfo(userKeypair.publicKey);

// Mint 1 token to the user's associated account
await mintAccount.mintTo(
  userAssosciatedAccount.address,
  userKeypair.publicKey,
  [],
  1
);

// Reset mint_authority to null from the user to prevent further minting
await mintAccount.setAuthority(
  mintAccount.publicKey,
  null,
  "MintTokens",
  userKeypair.publicKey,
  []
);
