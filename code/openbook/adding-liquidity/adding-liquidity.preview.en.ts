const liquidity = await OpenBook.addLiquidity({
  pool: "BTC/USDC",
  amountA: 10,
  amountB: 10000,
});
