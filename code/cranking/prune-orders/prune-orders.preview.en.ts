import { constants } from "@zetamarkets/sdk";

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
        return utils.pruneExpiredTIFOrders(se.asset, constants.PERP_INDEX);
      })
    );
    console.log("Pruned expired TIF orders.");
  } catch (e) {
    console.log("Failed to prune expired TIF orders.", `Error=${e}`);
  }
}
