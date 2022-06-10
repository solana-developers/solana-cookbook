const jupiter = useJupiter({
  amount: 1 * 10 ** 6, 
  inputMint,
  outputMint,
  slippage: 1, 
  debounceTime: 250, 
});

const {
  allTokenMints, 
  routeMap,
  exchange,
  refresh, 
  lastRefreshTimestamp, 
  loading, 
  routes, 
  error,
} = jupiter;
