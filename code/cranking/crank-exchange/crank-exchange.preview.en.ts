/**
 * Retrieves the markets to be cranked for a given asset.
 * If the asset belongs to a perps-only group, returns the perp market for that asset.
 * Otherwise, returns the markets based on the specified criteria.
 * @param asset The asset for which markets are to be retrieved.
 * @param liveOnly If true, retrieves only tradeable markets; otherwise, retrieves all markets.
 * @returns An array of markets to be cranked.
 */
function getMarketsToCrank(asset: assets.Asset, liveOnly: boolean): Market[] {
  if (Exchange.getZetaGroup(asset).perpsOnly) {
    return [Exchange.getPerpMarket(asset)];
  }

  let marketsToCrank = [];

  if (liveOnly) {
    let liveExpiryIndices =
      Exchange.getZetaGroupMarkets(asset).getTradeableExpiryIndices();
    liveExpiryIndices.map(async (index) => {
      marketsToCrank.push(
        Exchange.getZetaGroupMarkets(asset).getMarketsByExpiryIndex(index)
      );
    });
    marketsToCrank = marketsToCrank.flat(1);
  } else {
    // Retrieve all markets for the asset.
    marketsToCrank = Exchange.getMarkets(asset);
  }
  return marketsToCrank;
}

/**
 * Cranks the serum dex event queue for each zeta market. This will process trades that consist of maker fills.
 * All other events are atomically processed at time of call such as taker fills and cancels.
 * Functionality here will keep track of markets that are currently being cranked, markets that have empty event queues
 * as well as allowing specification of whether only live markets are being cranked.
 * This will flush event queues completely upon call.
 * This function will poll all market event queues asynchronously so is quite expensive in terms of RPC requests per second.
 * Use crankExchangeThrottle if you are running into rate limit issues.
 */
async function crankExchange(asset: assets.Asset, liveOnly: boolean) {
  let marketsToCrank: Market[] = getMarketsToCrank(asset, liveOnly);
  marketsToCrank.map(async (market) => {
    let eventQueue = await market.serumMarket.loadEventQueue(
      Exchange.provider.connection
    );

    if (eventQueue.length > 0 && !crankingMarkets[market.marketIndex]) {
      crankingMarkets[market.marketIndex] = true;
      try {
        while (eventQueue.length != 0) {
          try {
            await utils.crankMarket(asset, market.marketIndex);
          } catch (e) {
            console.error(
              `Cranking failed on market ${market.marketIndex}, ${e}`
            );
          }

          let currLength = eventQueue.length;

          eventQueue = await market.serumMarket.loadEventQueue(
            Exchange.provider.connection
          );

          let numCranked = currLength - eventQueue.length;
          console.log(
            `[${assets.assetToName(
              asset
            )}] Cranked ${numCranked} events for market ${market.marketIndex}`
          );
        }
      } catch (e) {
        console.error(`${e}`);
      }
      crankingMarkets[market.marketIndex] = false;
    }
  });
}

/**
 * Iteratively cranks each market event queue.
 * Allows an optional argument for `throttleMs` which is the duration it will sleep after each market crank.
 */
async function crankExchangeThrottled(
  asset: assets.Asset,
  liveOnly: boolean,
  throttleMs: number
) {
  let marketsToCrank: Market[] = getMarketsToCrank(asset, liveOnly);
  for (var i = 0; i < marketsToCrank.length; i++) {
    let market = marketsToCrank[i];
    let eventQueue = await market.serumMarket.loadEventQueue(
      Exchange.provider.connection
    );
    if (eventQueue.length > 0 && !crankingMarkets[market.marketIndex]) {
      crankingMarkets[market.marketIndex] = true;
      try {
        while (eventQueue.length != 0) {
          try {
            await utils.crankMarket(asset, market.marketIndex);
          } catch (e) {
            console.error(
              `Cranking failed on market ${market.marketIndex}, ${e}`
            );
          }

          let currLength = eventQueue.length;

          eventQueue = await market.serumMarket.loadEventQueue(
            Exchange.provider.connection
          );

          let numCranked = currLength - eventQueue.length;
          console.log(
            `[${assets.assetToName(
              asset
            )}] Cranked ${numCranked} events for market ${market.marketIndex}`
          );
        }
      } catch (e) {
        console.error(`${e}`);
      }
      crankingMarkets[market.marketIndex] = false;
      await sleep(throttleMs);
    }
  }
}
