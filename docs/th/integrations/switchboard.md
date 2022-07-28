---
title: Switchboard
head:
  - - meta
    - name: title
      content: คู่มือ Solana | Using Switchboard to create Onchain data feeds
  - - meta
    - name: og:title
      content: คู่มือ Solana | Using Switchboard to create Onchain data feeds
  - - meta
    - name: description
      content: Switchboard allows builders to unlock the power of Solana by creating high performance data feeds from any API.
  - - meta
    - name: og:description
      content: Switchboard allows builders to unlock the power of Solana by creating high performance data feeds from any API.
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

# Switchboard

Switchboard is an Oracle protocol that enables นักพัฒนา to source data on-chain for a variety of use cases such as price feeds, NFT floor prices, sport statistics, or even verifiable randomness. In a general sense, Switchboard is an off-chain resource นักพัฒนา สามารถ invoke to bridge high integrity data on-chain and power the next generation of web3 and DeFi.

## Data Feeds

Switchboard provides a JavaScript/TypeScript library called **@switchboard-xyz/switchboard-v2**
. This library สามารถ be used to reach On-chain data from existing data feeds or publish your own custom feeds. เรียนรู้เกี่ยวกับ this [ที่นี่](https://www.npmjs.com/package/@switchboard-xyz/switchboard-v2
)

### Read data from an aggregator feed

<SolanaCodeGroup>
  <SolanaCodeGroupItem title="TS" active>

  <template v-slot:default>

@[code](@/code/switchboard/client/read.client.en.ts)

  </template>

  <template v-slot:preview>

@[code](@/code/switchboard/client/read.client.preview.en.ts)

  </template>

  </SolanaCodeGroupItem>

</SolanaCodeGroup>

### Create a new aggregator feed

<SolanaCodeGroup>
  <SolanaCodeGroupItem title="TS" active>

  <template v-slot:default>

@[code](@/code/switchboard/client/create.client.en.ts)

  </template>

  <template v-slot:preview>

@[code](@/code/switchboard/client/create.client.preview.en.ts)

  </template>

  </SolanaCodeGroupItem>

</SolanaCodeGroup>





### Read data from an aggregator feed in program
Switchboard provides a crate called **switchboard_v2**
เรียนรู้เกี่ยวกับ this [ที่นี่](https://docs.rs/switchboard-v2/0.1.10/switchboard_v2/)


<SolanaCodeGroup>
  <SolanaCodeGroupItem title="Rust" active>

  <template v-slot:default>

@[code](@/code/switchboard/on-chain/read.on-chain.en.rs)

  </template>

  <template v-slot:preview>

@[code](@/code/switchboard/on-chain/read.on-chain.preview.en.rs)

  </template>

  </SolanaCodeGroupItem>

</SolanaCodeGroup>

### How to Create a Feed from the Publisher
The official Switchboard documentation has an in-depth walk-through of how to create a feed from the publisher.
Check it out [ที่นี่](https://docs.switchboard.xyz/feed/publisher).

## Oracles
Switchboard's unique feature is that it allows you to create your own oracle and run it locally.

### Create an oracle
<SolanaCodeGroup>
  <SolanaCodeGroupItem title="TS" active>

  <template v-slot:default>

@[code](@/code/switchboard/client/create.oracle.client.en.ts)

  </template>

  <template v-slot:preview>

@[code](@/code/switchboard/client/create.oracle.client.preview.en.ts)

  </template>

  </SolanaCodeGroupItem>

</SolanaCodeGroup>

### Run an oracle locally
You สามารถ run an oracle locally and assign it to your own oracle queue to test how your program may operate in production. Mainnet oracles should always be run in high availability environments with some set of monitoring capabilities.

#### Requirements
 - Docker-compose

Create a docker-compose.yml file with the environment variables in [Oracle Config](/integrations/switchboard.html#oracle-config)



<SolanaCodeGroup>
  <SolanaCodeGroupItem title="TS" active>

  <template v-slot:default>

@[code](@/code/switchboard/local/docker-compose.oracle.local.en.yml)

  </template>

  <template v-slot:preview>

@[code](@/code/switchboard/local/docker-compose.oracle.local.en.yml)

  </template>

  </SolanaCodeGroupItem>

</SolanaCodeGroup>

Run the container using `docker-compose up`

### Oracle Config
<table>
  <thead>
    <tr>
      <th>Env Variable</th>
      <th>Definition</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>ORACLE_KEY</td>
      <td>
        <b>
          <u>Required</u>
        </b>
        <br />
        <b>Type</b> - Public Key
        <br />
        <b>Description</b> - Public key of the oracle account that has been
        granted permissions to use an oracle queue <br />
      </td>
    </tr>
    <tr>
      <td>HEARTBEAT_INTERVAL</td>
      <td>
        <b>
          <u>Optional</u>
        </b>
        <br />
        <b>Type</b> - Number (seconds)
        <br />
        <b>Default</b> - 30
        <br />
        <b>Description</b> - Seconds between oracle heartbeats. Queues have
        different oracle heartbeat requirements. Recommended value is 15
      </td>
    </tr>
    <tr>
      <td>GCP_CONFIG_BUCKET</td>
      <td>
        <b>
          <u>Optional</u>
        </b>
        <br />
        <b>Type</b> - GCP Resource Path
        <br />
        <b>Default</b> - Looks for configs.json in the current working
        directory. If not found, no config is loaded.
        <br />
        <b>Description</b> - Contains API keys for private API endpoints
      </td>
    </tr>
    <tr>
      <td>UNWRAP_STAKE_THRESHOLD</td>
      <td>
        <b>
          <u>Optional</u>
        </b>
        <br />
        <b>Type</b> - Number (SOL amount, Ex. 1.55)
        <br />
        <b>Default</b> - 0, disabled.
        <br />
        <b>Description</b> - The Solana balance amount to trigger an unwrap stake action. When an oracle's Solana balance falls below the set threshold, the node will automatically unwrap funds from the oracle's staking wallet, leaving at least 0.1 wSOL or 10% more than the queue's minimum stake requirement. 
      </td>
    </tr>
  </tbody>
</table>

## Verifiable Random Function(VRF)
A Verifiable Random Function (VRF) is a public-key pseudorandom function that provides proofs that its outputs were calculated correctly
### Reading a VRF account

<SolanaCodeGroup>
  <SolanaCodeGroupItem title="TS" active>

  <template v-slot:default>

@[code](@/code/switchboard/client/read.vrf.client.en.ts)

  </template>

  <template v-slot:preview>

@[code](@/code/switchboard/client/read.vrf.client.preview.en.ts)

  </template>

  </SolanaCodeGroupItem>
  <SolanaCodeGroupItem title="Rust" active>

  <template v-slot:default>

@[code](@/code/switchboard/on-chain/read.vrf.on-chain.en.rs)

  </template>

  <template v-slot:preview>

@[code](@/code/switchboard/on-chain/read.vrf.on-chain.preview.en.rs)

  </template>

  </SolanaCodeGroupItem>

</SolanaCodeGroup>

### Creating a VRF account

<SolanaCodeGroup>
  <SolanaCodeGroupItem title="TS" active>

  <template v-slot:default>

@[code](@/code/switchboard/client/create.vrf.client.en.ts)

  </template>

  <template v-slot:preview>

@[code](@/code/switchboard/client/create.vrf.client.preview.en.ts)

  </template>

  </SolanaCodeGroupItem>
  

</SolanaCodeGroup>

### Request Randomness from vrf account

<SolanaCodeGroup>
  <SolanaCodeGroupItem title="TS" active>

  <template v-slot:default>

@[code](@/code/switchboard/client/request.vrf.client.en.ts)

  </template>

  <template v-slot:preview>

@[code](@/code/switchboard/client/request.vrf.client.preview.en.ts)

  </template>

  </SolanaCodeGroupItem>
   <SolanaCodeGroupItem title="Rust" active>

  <template v-slot:default>

@[code](@/code/switchboard/on-chain/request.vrf.on-chain.en.rs)

  </template>

  <template v-slot:preview>

@[code](@/code/switchboard/on-chain/request.vrf.on-chain.preview.en.rs)

  </template>

  </SolanaCodeGroupItem>

</SolanaCodeGroup>


## Resources
### APIs and Libraries
 - [Switchboard Task Types](https://docs.switchboard.xyz/api/tasks)
 - [Rust API Docs](https://docs.rs/switchboard-v2/latest/switchboard_v2/)
 - [Typescript API Docs](https://docs.switchboard.xyz/api/ts)
 - [Python API Docs](https://docs.switchboard.xyz/api/py)
 - [CLI Docs](https://docs.switchboard.xyz/api/cli)
### Examples
 - [[Client] Custom Data Feed Walkthrough](https://github.com/switchboard-xyz/switchboard-v2/tree/main/packages/feed-walkthrough)
 - [[Program] Anchor Feed Parser](https://github.com/switchboard-xyz/switchboard-v2/tree/main/programs/anchor-feed-parser)
 - [[Program] Anchor VRF Parser](https://github.com/switchboard-xyz/switchboard-v2/tree/main/programs/anchor-vrf-parser)
### More Information
 - [Protocol Documentation](https://docs.switchboard.xyz/introduction)
 - [SuperteamDAO Deep Dive](https://crawling-cent-d6b.notion.site/The-Switchboard-Deep-Dive-717df6ba0b92465e8118351466257a0f)

