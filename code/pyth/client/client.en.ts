import * as web3 from "@solana/web3.js";
import * as pyth from "@pythnetwork/client";

(async () => {
  const connection = new web3.Connection(
    web3.clusterApiUrl("devnet"),
    "confirmed"
  );
  const pythConnection = new pyth.PythConnection(
    connection,
    pyth.getPythProgramKeyForCluster("devnet")
  );

  pythConnection.onPriceChange((product, price) => {
    if (price.price && price.confidence) {
      console.log(
        `${product.symbol}: $${price.price} \xB1$${price.confidence}`
      );
    } else {
      console.log(
        `${product.symbol}: price currently unavailable. status is ${price.status}`
      );
    }
  });
  pythConnection.start();
})();
