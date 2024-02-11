/**
 * Rebalances the zeta vault and the insurance vault to ensure consistent platform security.
 * Checks all margin accounts for non-zero rebalance amounts and rebalances them all.
 */
async function rebalanceInsuranceVault(asset: assets.Asset) {
  let marginAccPubkeys: PublicKey[];
  try {
    marginAccPubkeys = await utils.getAllProgramAccountAddresses(
      types.ProgramAccountType.MarginAccount,
      asset
    );
  } catch (e) {
    this.alert(
      "rebalanceInsuranceVault account address fetch error",
      `Asset=${assets.assetToName(asset)} Error=${e}`
    );
  }

  for (let i = 0; i < marginAccPubkeys.length; i += MAX_ACCOUNTS_TO_FETCH) {
    let marginAccs: any[];
    try {
      marginAccs = await Exchange.program.account.marginAccount.fetchMultiple(
        marginAccPubkeys.slice(i, i + MAX_ACCOUNTS_TO_FETCH)
      );
    } catch (e) {
      this.alert(
        "rebalanceInsuranceVault margin account fetch error",
        `Asset=${assets.assetToName(asset)}, Error=${e}`
      );
    }

    let remainingAccounts: any[] = new Array();
    for (let j = 0; j < marginAccs.length; j++) {
      if (marginAccs[j].rebalanceAmount.toNumber() != 0) {
        remainingAccounts.push({
          pubkey: marginAccPubkeys[i + j],
          isSigner: false,
          isWritable: true,
        });
      }
    }
    console.log(
      `[${assets.assetToName(asset)}] [REBALANCE INSURANCE VAULT] for ${
        remainingAccounts.length
      } accounts.`
    );
    try {
      await Exchange.rebalanceInsuranceVault(asset, remainingAccounts);
    } catch (e) {
      this.alert(
        "rebalanceInsuranceVault vault error on transaction",
        `Asset=${assets.assetToName(asset)} Error=${e}`
      );
    }
  }
}
