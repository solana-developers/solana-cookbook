const ENV = "mainnet-beta";
const tokens: Token[] = await(await fetch(TOKEN_LIST_URL[ENV])).json();
