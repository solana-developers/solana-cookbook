import { OpenBook } from "openbook-library"; // Replace with the correct import

// Example TypeScript code for placing an order on OpenBook
const order = await OpenBook.placeOrder({
  market: "BTC/USDC",
  side: "buy",
  price: 45000,
  quantity: 0.1,
});
console.log("Order placed:", order);
