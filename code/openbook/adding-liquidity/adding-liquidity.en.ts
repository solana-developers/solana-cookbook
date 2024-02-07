// Example TypeScript code for adding liquidity on OpenBook
const liquidity = await OpenBook.addLiquidity({
  pool: "BTC/USDC",
  amountA: 10,
  amountB: 10000,
});
console.log("Liquidity added:", liquidity);
