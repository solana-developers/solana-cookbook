const routes = await jupiter.computeRoutes({
  inputMint: new PublicKey(inputToken), 
  outputMint: new PublicKey(outputToken), 
  inputAmount, 
  slippage, 
  forceFetch: false, 
});
