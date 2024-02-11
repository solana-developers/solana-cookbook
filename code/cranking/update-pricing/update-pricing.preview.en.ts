/**
 * This calls zeta's permissionless update pricing function through the Exchange object.
 * Cranks zeta's on-chain pricing ensuring all our greeks and theos are up-to-date.
 */
async function updatePricing() {
  // Get relevant expiry indices.

  await Promise.all(
    assetList.map(async (asset) => {
      try {
        console.log(`[${assets.assetToName(asset)}] Update pricing`);
        await Exchange.updatePricing(asset);
      } catch (e) {
        console.error(
          `[${assets.assetToName(asset)}] Update pricing failed. ${e}`
        );
      }
    })
  );
}
