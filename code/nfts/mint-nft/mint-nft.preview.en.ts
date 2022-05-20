const mintNFTResponse = await actions.mintNFT({
  connection,
  wallet: new NodeWallet(keypair),
  uri: "https://34c7ef24f4v2aejh75xhxy5z6ars4xv47gpsdrei6fiowptk2nqq.arweave.net/3wXyF1wvK6ARJ_9ue-O58CMuXrz5nyHEiPFQ6z5q02E",
  maxSupply: 1,
});
