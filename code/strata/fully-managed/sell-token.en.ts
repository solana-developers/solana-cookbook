import { SplTokenBonding } from "@strata-foundation/spl-token-bonding";
import * as anchor from "@project-serum/anchor";

(async () => {
  const provider = anchor.getProvider();
  const tokenBondingSdk = await SplTokenBonding.init(provider);
  await tokenBondingSdk.sell({
    tokenBonding: new PublicKey("..."),
    targetAmount: 0.01, // Amount of the targetMint to sell off
    slippage: 0.05,
  });
})();
