bestRoute = routes.routesInfos[0];
const { execute } = await jupiter.exchange({
  bestRoute,
});

// Execute Swap
const swapResult: any = await execute();
