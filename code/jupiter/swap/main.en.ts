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
    user: USER_KEYPAIR, 
  });

  const routeMap = jupiter.getRouteMap();

  const inputToken = "So11111111111111111111111111111111111111112";
  const outputToken = "SRMuApVNdxXokk5GT7XD5cUUgXMBCoAz2LHeuAoKWRt";
  const inputAmount = 1; 
  const slippage = 1; 

  const routes = await jupiter.computeRoutes({
    inputMint: new PublicKey(inputToken), 
    outputMint: new PublicKey(outputToken),
    inputAmount, 
    slippage,
    forceFetch: false, 
  });

  const { execute } = await jupiter.exchange({
    routeInfo: routes.routesInfos[0],
  });
  
  const swapResult: any = await execute(); 
  
})();
