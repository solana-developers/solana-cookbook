import { TOKEN_LIST_URL } from "@jup-ag/core";

const JupiterApp = () => {
  const [tokens, setTokens] = useState<Token[]>([]);
  const [inputMint] = useState<PublicKey>(
    new PublicKey("EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v")
  );
  const [outputMint] = useState<PublicKey>(
    new PublicKey("Es9vMFrzaCERmJfrF4H2FYD4KCoNkY11McCe8BenwNYB")
  );

  useEffect(() => {
    // Fetch token list from Jupiter API
    fetch(TOKEN_LIST_URL[ENV])
      .then((response) => response.json())
      .then((result) => setTokens(result));
  }, []);

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

  return (
    <>
      <div style={{ fontWeight: "600", fontSize: 16, marginTop: 24 }}>
        Hook example
      </div>
      <div>Number of tokens: {tokens.length}</div>
      <div>Number of input tokens {allTokenMints.length}</div>
      <div>Possible number of routes: {routes?.length}</div>
      <div>Best quote: {routes ? routes[0].outAmount : ""}</div>
    </>
  );
};

export default JupiterApp;
