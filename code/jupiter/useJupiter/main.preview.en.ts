const jupiter = useJupiter({
  amount: 1 * 10 ** 6, // raw input amount of tokens
  inputMint,
  outputMint,
  slippage: 1, // 1% slippage
  debounceTime: 250, // debounce ms time before refresh
});

const {
  allTokenMints, // all the token mints that is possible to be input
  routeMap, // routeMap, same as the one in @jup-ag/core
  exchange, // exchange
  refresh, // function to refresh rates
  lastRefreshTimestamp, // timestamp when the data was last returned
  loading, // loading states
  routes, // all the routes from inputMint to outputMint
  error,
} = jupiter;
