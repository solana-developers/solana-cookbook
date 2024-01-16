const order = await OpenBook.placeOrder({
  market: "BTC/USDC",
  side: "buy",
  price: 45000,
  quantity: 0.1,
});
