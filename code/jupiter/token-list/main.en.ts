import { Jupiter, RouteInfo, TOKEN_LIST_URL } from "@jup-ag/core";
import { Connection, PublicKey } from "@solana/web3.js";

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
  const ENV = "mainnet-beta";
  const tokens: Token[] = await (await fetch(TOKEN_LIST_URL[ENV])).json();
})();
