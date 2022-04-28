const routes = await jupiter.computeRoutes({
  inputMint: new PublicKey(inputToken), // Mint address of the input token
  outputMint: new PublicKey(outputToken), // Mint address of the output token
  inputAmount, // raw input amount of tokens
  slippage, // The slippage in % terms
  forceFetch: false, // false is the default value => will use cache if not older than routeCacheDuration
});
