---
title: Switchboard
head:
  - - meta
    - name: title
      content: Solana Cookbook | Using Switchboard to create Onchain data feeds
  - - meta
    - name: og:title
      content: Solana Cookbook | Using Switchboard to create Onchain data feeds
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

Ang Switchboard ay isang Oracle protocol na nagbibigay-daan sa mga developer na mag-source ng data on-chain para sa iba't ibang kaso ng paggamit gaya ng mga price feed, NFT floor price, sport statistics, o kahit na nabe-verify na randomness. Sa pangkalahatang kahulugan, ang Switchboard ay isang off-chain na mapagkukunan na maaaring gamitin ng mga developer upang i-bridge ang mataas na integridad na data on-chain at palakasin ang susunod na henerasyon ng web3 at DeFi.

## Mga Feed ng Data

Nagbibigay ang Switchboard ng JavaScript/TypeScript library na tinatawag na **@switchboard-xyz/switchboard-v2**
. Magagamit ang library na ito para maabot ang On-chain na data mula sa mga kasalukuyang feed ng data o mag-publish ng sarili mong mga custom na feed. Matuto pa tungkol dito [dito](https://www.npmjs.com/package/@switchboard-xyz/switchboard-v2
)

### Magbasa ng data mula sa isang aggregator feed

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





### Magbasa ng data mula sa isang aggregator feed sa program
Nagbibigay ang Switchboard ng crate na tinatawag na **switchboard_v2**
Matuto pa tungkol dito [dito](https://docs.rs/switchboard-v2/0.1.10/switchboard_v2/)


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

### Paano Gumawa ng Feed mula sa Publisher
Ang opisyal na dokumentasyon ng Switchboard ay may malalim na walk-through kung paano gumawa ng feed mula sa publisher.
Tingnan ito [dito](https://docs.switchboard.xyz/feed/publisher).

## Mga Orakulo
Ang natatanging tampok ng Switchboard ay pinapayagan ka nitong lumikha ng iyong sariling orakulo at patakbuhin ito nang lokal.

### Lumikha ng isang orakulo
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

### Magpatakbo ng orakulo nang lokal
Maaari kang magpatakbo ng isang oracle nang lokal at italaga ito sa iyong sariling oracle queue upang subukan kung paano maaaring gumana ang iyong programa sa produksyon. Ang mga orakulo ng Mainnet ay dapat palaging pinapatakbo sa mga kapaligiran na may mataas na kakayahang magamit na may ilang hanay ng mga kakayahan sa pagsubaybay.

#### Mga kinakailangan
  - Docker-compose

Gumawa ng docker-compose.yml file na may mga environment variable sa [Oracle Config](/integrations/switchboard.html#oracle-config)



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

## Na-verify na Random Function(VRF)
Ang Verifiable Random Function (VRF) ay isang public-key pseudorandom function na nagbibigay ng mga patunay na ang mga output nito ay nakalkula nang tama
### Pagbabasa ng VRF account

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

### Paggawa ng VRF account

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

### Humiling ng Randomness mula sa vrf account

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

