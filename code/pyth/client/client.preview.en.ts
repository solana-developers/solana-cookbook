const pythConnection = new pyth.PythConnection(
  connection,
  pyth.getPythProgramKeyForCluster("devnet")
);

pythConnection.onPriceChange((product, price) => {
  if (price.price && price.confidence) {
    console.log(`${product.symbol}: $${price.price} \xB1$${price.confidence}`);
  } else {
    console.log(
      `${product.symbol}: price currently unavailable. status is ${price.status}`
    );
  }
});

pythConnection.start();
