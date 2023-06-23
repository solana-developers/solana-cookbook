/**
 * Prunes expired time-in-force (TIF) orders for all sub-exchanges.
 * It retrieves the sub-exchanges, determines the markets to prune orders from,
 * and calls the utility function to prune expired TIF orders for each market.
 */
async function pruneExpiredTIFOrders() {
  let subExchanges = Exchange.getAllSubExchanges();

  try {
    await Promise.all(
      subExchanges.map((se) => {
        let markets = se.getMarkets();

        let marketIndicesToPrune: number[] = [];

        for (let i = 0; i < markets.length; i++) {
          if (!markets[i].expirySeries) {
            marketIndicesToPrune.push(markets[i].marketIndex);
            continue;
          }
          if (!markets[i].expirySeries.isLive()) {
            continue;
          }
          marketIndicesToPrune.push(markets[i].marketIndex);
        }

        return utils.pruneExpiredTIFOrders(se.asset, marketIndicesToPrune);
      })
    );
    console.log("Pruned expired TIF orders.");
  } catch (e) {
    this.alert("Failed to prune expired TIF orders.", `Error=${e}`);
  }
}
