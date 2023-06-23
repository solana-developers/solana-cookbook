/**
 * This calls zeta's permissionless retreat market nodes function through the Exchange object.
 * Cranks zeta's on-chain volatility, retreat and interest functionality similiar to update pricing.
 */
async function retreatMarketNodes(asset: assets.Asset) {
  if (Exchange.getSubExchange(asset).zetaGroup.perpsOnly) {
    return;
  }
  // Get relevant expiry indices.
  let indicesToRetreat = [];
  for (
    var i = 0;
    i < Exchange.getZetaGroupMarkets(asset).expirySeries.length;
    i++
  ) {
    if (Exchange.getZetaGroupMarkets(asset).expirySeries[i].isLive()) {
      indicesToRetreat.push(i);
    }
  }
  await Promise.all(
    indicesToRetreat.map(async (index) => {
      try {
        console.log(`[${assets.assetToName(asset)}] Retreating index ${index}`);
        await Exchange.retreatMarketNodes(asset, index);
      } catch (e) {
        console.error(
          `[${assets.assetToName(
            asset
          )}] Index ${index}: Retreat market nodes failed. ${e}`
        );
      }
    })
  );
}
