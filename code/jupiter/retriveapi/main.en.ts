const routeMap = await(
  await fetch("https://quote-api.jup.ag/v1/route-map")
).json();

// list all possible input tokens by mint Address
const allInputMints = Object.keys(routeMap);

// list tokens can swap by mint addressfor SOL
const swappableOutputForSol =
  routeMap["So11111111111111111111111111111111111111112"];
// console.log({ allInputMints, swappableOutputForSol })
