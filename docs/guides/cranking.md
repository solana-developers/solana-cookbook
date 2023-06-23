---
title: Cranking
head:
  - - meta
    - name: title
      content: Solana Cookbook | Cranking
  - - meta
    - name: og:title
      content: Solana Cookbook | Cranking
  - - meta
    - name: description
      content: Cranks by Zeta Markets. Super useful when built with derivative market platforms.
  - - meta
    - name: og:description
      content: Cranks by Zeta Markets. Super useful when built with derivative market platforms.
  - - meta
    - name: og:image
      content: https://solanacookbook.com/cookbook-sharing-card.png
  - - meta
    - name: og:image:alt
      content: Solana splash card
  - - meta
    - name: twitter:card
      content: summary
  - - meta
    - name: twitter:site
      content: "@solanacookbook"
  - - meta
    - name: twitter:image
      content: "https://solanacookbook.com/cookbook-sharing-card.png"
  - - meta
    - name: robots
      content: index,follow,noodp
  - - meta
    - name: googlebot
      content: index,follow
footer: MIT Licensed
---

# Cranking

This guide is meant to be a one-stop guidance for Zeta's Cranks

Cranking refers to the execution of multiple permissionless instructions to keep the zeta platform up to date and functioning properly. These instructions are designed to perform various tasks such as processing trade events, updating pricing information, adjusting market parameters, rebalancing funds, applying funding rates, and managing orders.

There are multiple permissionless instructions that "crank", keeping the zeta platform in an up to date state.

This guide take you to tour for crank instruction and how you can use them.

## Crank Event Queue

Process maker fill events to ensure that user margin accounts(Margin accounts hold funds for trading and collateral purposes) are in the correct state after trades occur.

* __getMarketsToCrank__ : This instruction determines which markets should be cranked based on the asset and a **flag** indicating whether only live markets should be considered.
If the `asset` belongs to a ZetaGroup with only perpetual markets, it returns an array containing the perpetual market.\
If `liveOnly` is **true**, it retrieves the tradeable expiry indices from the ZetaGroupMarkets and fetches the corresponding markets for each index. These markets are then flattened into a single array.\
If `liveOnly` is **false**, it returns all markets for the given asset.

* __crankExchange__ : This instruction cranks the event queues for each market in the provided asset.
It retrieves the markets to crank using **getMarketsToCrank** function.
For each market, it loads the event queue and processes the events until the queue is empty.
If cranking is already in progress for a market (tracked using crankingMarkets), it skips the market.
After cranking, it logs the number of events processed for each market.

* __crankExchangeThrottled__ : This `function` is similar to **crankExchange**, but it introduces a throttling mechanism.
It iteratively cranks each market event queue with a delay of `throttleMs milliseconds` after each market crank.
This can be useful when rate limits are reached, and it helps in controlling the rate of API requests.

<SolanaCodeGroup>
  <SolanaCodeGroupItem title="TS" active>

  <template v-slot:default>

@[code](@/code/cranking/crank-exchange/crank-exchange.en.ts)

  </template>

  <template v-slot:preview>

@[code](@/code/cranking/crank-exchange/crank-exchange.preview.en.ts)

  </template>
  </SolanaCodeGroupItem>
</SolanaCodeGroup>


## Update Pricing

Recalculate mark prices and greeks for Zeta products on an expiry basis. This will also update perp funding rates.

This instruction enables the automatic update of pricing for options and other derivative products in a permissionless manner.

By calling Zeta's update pricing function through the `Exchange` object, it ensures that the greeks (option sensitivities) and theos (option prices) are kept up-to-date, allowing traders and market participants to make informed decisions based on the most recent pricing information.

<SolanaCodeGroup>
  <SolanaCodeGroupItem title="TS" active>

  <template v-slot:default>

@[code](@/code/cranking/update-pricing/update-pricing.en.ts)

  </template>

  <template v-slot:preview>

@[code](@/code/cranking/update-pricing/update-pricing.preview.en.ts)

  </template>
  </SolanaCodeGroupItem>
</SolanaCodeGroup>

## Retreat Market Nodes

Retreats Zeta volatility surface and interest rates based on the trades that have occurred on the platform.

This instruction trigger the retreat of `market nodes` in the Zeta platform for a specific asset. It updates the **volatility**, **retreat**, and **interest** parameters on-chain, ensuring that the market data used for pricing and trading derivatives remains up-to-date.

The instruction checks if the asset belongs to a Zeta subexchange where only `perpetual contracts` are traded. If so, there is no need to retreat market nodes, and the function returns without performing any further actions.

<SolanaCodeGroup>
  <SolanaCodeGroupItem title="TS" active>

  <template v-slot:default>

@[code](@/code/cranking/retreat-market-nodes/retreat-market-nodes.en.ts)

  </template>

  <template v-slot:preview>

@[code](@/code/cranking/retreat-market-nodes/retreat-market-nodes.preview.en.ts)

  </template>
  </SolanaCodeGroupItem>
</SolanaCodeGroup>

## Rebalance Insurance Vault
The zeta platform collects fees, and this instruction moves funds between margin accounts and the insurance vault.

The insurance vault is used to ensure platform `security` and cover any potential losses.
By **rebalancing** margin accounts with non-zero rebalance amounts, the function helps maintain consistent ___collateralization___ and risk management within the platform.

This instruction first Retrieved Margin Accounts and filtered then rebalanced them.

<SolanaCodeGroup>
  <SolanaCodeGroupItem title="TS" active>

  <template v-slot:default>

@[code](@/code/cranking/retreat-market-nodes/retreat-market-nodes.en.ts)

  </template>

  <template v-slot:preview>

@[code](@/code/cranking/retreat-market-nodes/retreat-market-nodes.preview.en.ts)

  </template>
  </SolanaCodeGroupItem>
</SolanaCodeGroup>

## Apply perp funding
Periodically apply any unpaid funding to all margin accounts holding perp positions.

You can use this instruction to ensure that margin accounts with `non-zero perp` positions receive the necessary funding.

It retrieves the addresses of margin accounts, fetches their details, identifies accounts with non-zero perpetual positions, groups accounts by asset, applies funding to each asset's margin accounts using the ***applyPerpFunding*** function, and `splits transactions` if there are too many accounts to process at once. This function ensures that margin accounts with non-zero perpetual positions receive the necessary funding, maintaining proper margin collateral and supporting the functionality of perpetual derivative trading within the Zeta platform.

<SolanaCodeGroup>
  <SolanaCodeGroupItem title="TS" active>

  <template v-slot:default>

@[code](@/code/cranking/apply-funding/apply-funding.en.ts)

  </template>

  <template v-slot:preview>

@[code](@/code/cranking/apply-funding/apply-funding.preview.en.ts)

  </template>
  </SolanaCodeGroupItem>
</SolanaCodeGroup>

## Prune Expired TIF Orders

When an order of TIF(Time In Force) expires it must be `pruned` to get deleted. This happens automatically if a **counterparty** tries to trade against it, however.

This function ensures that expired TIF orders are removed from the platform, maintaining the integrity and efficiency of order management within Zeta's derivative trading system.

<SolanaCodeGroup>
  <SolanaCodeGroupItem title="TS" active>

  <template v-slot:default>

@[code](@/code/cranking/prune-orders/prune-orders.en.ts)

  </template>

  <template v-slot:preview>

@[code](@/code/cranking/prune-orders/prune-orders.preview.en.ts)

  </template>
  </SolanaCodeGroupItem>
</SolanaCodeGroup>

Happy Cranking!

## Resources
[crank](https://twitter.com/0xPemulis/status/1483115445389508610)

[zeta-crank](https://docs.zeta.markets/build-with-zeta/zeta-typescript-sdk/examples/cranking)

[build-with-zeta](https://docs.zeta.markets/build-with-zeta/zeta-typescript-sdk)


