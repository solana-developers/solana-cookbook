/**
 * This calls zeta's permissionless update pricing function through the Exchange object.
 * Cranks zeta's on-chain pricing ensuring all our greeks and theos are up-to-date.
 */
async function updatePricing() {
  // Get relevant expiry indices.
  for (var asset of assetList) {
    let indicesToCrank = [];
    if (!Exchange.getZetaGroup(asset).perpsOnly) {
      for (
        var i = 0;
        i < Exchange.getZetaGroupMarkets(asset).expirySeries.length;
        i++
      ) {
        let expirySeries = Exchange.getZetaGroupMarkets(asset).expirySeries[i];
        if (
          Exchange.clockTimestamp <= expirySeries.expiryTs &&
          expirySeries.strikesInitialized &&
          !expirySeries.dirty
        ) {
          indicesToCrank.push(i);
        }
      }
    } else {
      indicesToCrank.push(0);
    }
    await Promise.all(
      indicesToCrank.map(async (index) => {
        try {
          console.log(
            `[${assets.assetToName(asset)}] Update pricing index ${index}`
          );
          await Exchange.updatePricing(asset, index);
        } catch (e) {
          console.error(
            `[${assets.assetToName(
              asset
            )}] Index ${index}: Update pricing failed. ${e}`
          );
        }
      })
    );
  }
}
