import { Jupiter, RouteInfo, TOKEN_LIST_URL } from "@jup-ag/core";
import { Connection, PublicKey, Keypair } from "@solana/web3.js";

interface Token {
  chainId: number;
  address: string;
  symbol: string;
  name: string;
  decimals: number;
  logoURI: string;
  tags: string[];
}

(async () => {
  const ENV = "devnet";
  const tokens: Token[] = await (await fetch(TOKEN_LIST_URL[ENV])).json();

  const USER_KEYPAIR = Keypair.generate();
  const connection = new Connection("https://api.devnet.solana.com");

  const jupiter = await Jupiter.load({
    connection,
    cluster: ENV,
    user: USER_KEYPAIR, // or public key
    // platformFeeAndAccounts:  NO_PLATFORM_FEE,
    // routeCacheDuration: CACHE_DURATION_MS
    // wrapUnwrapSOL: true (default) | false
  });

  const routeMap = jupiter.getRouteMap();

  const inputToken = "So11111111111111111111111111111111111111112";
  const outputToken = "SRMuApVNdxXokk5GT7XD5cUUgXMBCoAz2LHeuAoKWRt";
  const inputAmount = 1; // Input UI amount
  const slippage = 1; // 1% slippage

  const routes = await jupiter.computeRoutes({
    inputMint: new PublicKey(inputToken), // Mint address of the input token
    outputMint: new PublicKey(outputToken), // Mint address of the output token
    inputAmount, // raw input amount of tokens
    slippage, // The slippage in % terms
    forceFetch: false, // false is the default value => will use cache if not older than routeCacheDuration
  });
})();
