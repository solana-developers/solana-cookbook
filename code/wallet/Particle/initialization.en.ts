const particle =  new  ParticleNetwork({
	projectId:  "xx",
	clientKey:  "xx",
	appId:  "xx",
	chainName: Solana.name, // Imported from @particle-network/chains
	chainId: Solana.id, // Imported from @particle-network/chains
	wallet:  {  // Optional: by default, the wallet entry is displayed in the bottom right corner of the webpage.
		displayWalletEntry:  true,  // Show wallet UI popup on entry
		defaultWalletEntryPosition: WalletEntryPosition.BR,  // Wallet popup entry position
		uiMode:  "dark",  // Optional: light or dark
	},
});
