/**
 * Applies funding to margin accounts that have non-zero perp positions.
 * It fetches margin accounts and checks if they have non-zero perp positions.
 * If a margin account has a non-zero perp position, funding is applied to it.
 * Funding is applied separately for each asset.
 * This function breaks into multiple transactions if there are too many margin accounts to process.
 */
async function applyFunding() {
  let marginAccPubkeys = [];
  try {
    marginAccPubkeys = await utils.getAllProgramAccountAddresses(
      types.ProgramAccountType.MarginAccount
    );
  } catch (e) {
    throw Error("Account address fetch error on applyFunding()!");
  }
  for (
    let i = 0;
    i < marginAccPubkeys.length;
    i += constants.MAX_FUNDING_ACCOUNTS
  ) {
    // Grab set of margin accounts
    let marginAccounts = [];
    try {
      marginAccounts =
        await Exchange.program.account.marginAccount.fetchMultiple(
          marginAccPubkeys.slice(i, i + constants.MAX_FUNDING_ACCOUNTS)
        );
    } catch (e) {
      throw Error("Account data fetch error on applyFunding()!");
    }

    // In that set: Check if any have non-zero perp positions
    // If they do, apply funding on them
    let fundingAccounts = new Map<constants.Asset, PublicKey[]>();
    for (var asset of Exchange.assets) {
      fundingAccounts.set(asset, []);
    }

    for (let j = 0; j < marginAccounts.length; j++) {
      if (marginAccounts[j].perpProductLedger.position.size != 0) {
        fundingAccounts
          .get(assets.fromProgramAsset(marginAccounts[j].asset))
          .push(marginAccPubkeys[i + j]);
      }
    }

    // This will automatically break into multiple txs if there are too many
    for (var asset of Exchange.assets) {
      await utils.applyPerpFunding(asset, fundingAccounts.get(asset));
    }
  }
}
