---
title: Sonar Watch
head:
  - - meta
    - name: title
      content: Solana Cookbook | Building on SonarWatch
  - - meta
    - name: og:title
      content: Solana Cookbook | Building on SonarWatch
  - - meta
    - name: description
      content: SonarWatch is a DeFi dashboard. Learn how to build your SonarWatch adapter.
  - - meta
    - name: og:description
      content: SonarWatch is a DeFi dashboard. Learn how to build your SonarWatch adapter.
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
---

# Sonar Watch

Sonar Watch is a dashboard that helps you track your DeFi positions.
To get your protocol supported on SonarWatch you can build your adapter.

## How to get listed

In order to facilitate the process of adding protocols to SonarWatch, anyone can use the [dashboard-adapter](https://github.com/sonarwatch/dashboard-adapter) library to create a dashboard adapter.
Here is an example of how to use it:

<SolanaCodeGroup>
  <SolanaCodeGroupItem title="TS" active>

  <template v-slot:default>

@[code](@/code/sonarwatch/get-listed/get-listed.en.ts)

  </template>

  <template v-slot:preview>

@[code](@/code/sonarwatch/get-listed/get-listed.preview.en.ts)

  </template>

  </SolanaCodeGroupItem>

</SolanaCodeGroup>

## Recommendations

* You can import any package for your adapter, but try to keep the adapter as light as possible
* If you make requests to RPCs always try to minimize the number of requests as much as possible
* For deployment, you can choose between:
  * Create a PR with your adapter on [dashboard-adapter](https://github.com/sonarwatch/dashboard-adapter)
  * Create your own package with the [boilerplate](https://github.com/sonarwatch/dashboard-adapter-foo)