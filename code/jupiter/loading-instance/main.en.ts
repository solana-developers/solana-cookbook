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
})();
