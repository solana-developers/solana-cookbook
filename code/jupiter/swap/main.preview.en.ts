bestRoute = routes.routesInfos[0];
const { execute } = await jupiter.exchange({
  bestRoute,
});


const swapResult = await execute();
