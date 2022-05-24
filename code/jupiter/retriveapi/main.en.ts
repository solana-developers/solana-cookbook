const routeMap = await(
  await fetch("https://quote-api.jup.ag/v1/route-map")
).json();


const allInputMints = Object.keys(routeMap);


const swappableOutputForSol =
  routeMap["So11111111111111111111111111111111111111112"];

