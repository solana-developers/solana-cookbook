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

    fetch(TOKEN_LIST_URL[ENV])
      .then((response) => response.json())
      .then((result) => setTokens(result));
  }, []);

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

  const onClickSwapBestRoute = async () => {

    const bestRoute = routes[0];

    await exchange({
      wallet: {
        sendTransaction: wallet.sendTransaction,
        publicKey: wallet.publicKey,
        signAllTransactions: wallet.signAllTransactions,
        signTransaction: wallet.signTransaction,
      },
      route: bestRoute,
      confirmationWaiterFactory: async (txid) => {
        console.log("sending transaction");
        await connection.confirmTransaction(txid);
        console.log("confirmed transaction");

        return await connection.getTransaction(txid, {
          commitment: "confirmed",
        });
      },
    });

    console.log({ swapResult });

    if ("error" in swapResult) {
      console.log("Error:", swapResult.error);
    } else if ("txid" in swapResult) {
      console.log("Sucess:", swapResult.txid);
      console.log("Input:", swapResult.inputAmount);
      console.log("Output:", swapResult.outputAmount);
    }
  };

  return (
    <>
      <div style={{ fontWeight: "600", fontSize: 16, marginTop: 24 }}>
        Hook example
      </div>
      <div>Number of tokens: {tokens.length}</div>
      <div>Number of input tokens {allTokenMints.length}</div>
      <div>Possible number of routes: {routes?.length}</div>
      <div>Best quote: {routes ? routes[0].outAmount : ""}</div>
      <button type="button" onClick={onClickSwapBestRoute}>
        Swap best route
      </button>
    </>
  );
};

export default JupiterApp;
