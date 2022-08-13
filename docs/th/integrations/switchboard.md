---
title: Switchboard
head:
  - - meta
    - name: title
      content: คู่มือ Solana | การใช้ Switchboard เพื่อสร้าง Onchain data feeds
  - - meta
    - name: og:title
      content: คู่มือ Solana | การใช้ Switchboard เพื่อสร้าง Onchain data feeds
  - - meta
    - name: description
      content: Switchboard ทำให้ผู้พัฒนาสามารถปลดปล่อยพลังของ Solana โดยการสร้างข้อมูล data feeds จาก API ใดๆ ก็ได้
  - - meta
    - name: og:description
      content: Switchboard ทำให้ผู้พัฒนาสามารถปลดปล่อยพลังของ Solana โดยการสร้างข้อมูล data feeds จาก API ใดๆ ก็ได้
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

Switchboard เป็น Oracle protocol ที่ทำให้นักพัฒนาสามารถเพิ่มแหล่งข้อมูล on-chain สำหรับการใช้งานที่หลากหลาย เช่น price feeds, NFT floor prices, sport statistics, หรือแม้แต่การสุ่มที่ตรวจสอบได้ (verifiable randomness) ในกรณีทั่วไป Switchboard ก็คือแหล่งข้อมูล off-chain ที่นักพัฒนาสามารถเรียกใช้เพื่อเชื่อมโยงข้อมูลที่เชื่อถือได้บน on-chain และเพื่อเป็นกำลังสำคัญของ web3 และ DeFi ในยุคถัดไป

## Data Feeds

Switchboard มี JavaScript/TypeScript library เรียกว่า **@switchboard-xyz/switchboard-v2**
. โดย library นี้สามารถใช้ในการเข้าถึง On-chain data จาก data feeds ที่มีอยู่แล้ว หรือ publish feeds ที่เราเลือกมาเองได้ เรียนรู้เพิ่มเติมได้ [ที่นี่](https://www.npmjs.com/package/@switchboard-xyz/switchboard-v2
)

### การอ่านข้อมูลจาก aggregator feed

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
Switchboard มี crate เรียกว่า **switchboard_v2**
เรียนรู้เพิ่มเติมได้ [ที่นี่](https://docs.rs/switchboard-v2/0.1.10/switchboard_v2/)


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

### วิธีสร้าง Feed จาก Publisher
ใน Switchboard documentation จะมีวิธีสร้าง feed จาก publisher อย่างละเอียด ลองไปดูได้ [ที่นี่](https://docs.switchboard.xyz/feed/publisher).

## Oracles
คุณสมบัติพิเศษของ Switchboard คือเราสามารถสร้าง oracle ของเราเองได้ที่ local

### สร้าง oracle
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
เราสามารถ run oracle ที่ local และสั่งให้มันเข้า oracle queue ของเราเองเพื่อทดสอบว่า program ของเราจะทำงานอย่างไรบน production. สำหรับ Mainnet oracles จะต้อง run บน high availability environments พร้อมกับระบบที่มีการ monitoring อยู่ด้วย

#### สิ่งที่ต้องใช้
 - Docker-compose

สร้าง docker-compose.yml file ด้วย environment variables ใน [Oracle Config](/integrations/switchboard.html#oracle-config)



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

Run the container โดยใช้ `docker-compose up`

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
Verifiable Random Function (VRF) คือ pseudorandom function ในการสุ่ม public-key ที่สามารถพิสูจน์ได้ว่า outputs นั้นผ่านการคำนวณมาอบ่างถูกต้อง 

### การอ่าน VRF account

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

### ขอ Randomness จาก vrf account

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


## แหล่งความรู้
### APIs และ Libraries
 - [Switchboard Task Types](https://docs.switchboard.xyz/api/tasks)
 - [Rust API Docs](https://docs.rs/switchboard-v2/latest/switchboard_v2/)
 - [Typescript API Docs](https://docs.switchboard.xyz/api/ts)
 - [Python API Docs](https://docs.switchboard.xyz/api/py)
 - [CLI Docs](https://docs.switchboard.xyz/api/cli)
### ตัวอย่าง
 - [[Client] Custom Data Feed Walkthrough](https://github.com/switchboard-xyz/switchboard-v2/tree/main/packages/feed-walkthrough)
 - [[Program] Anchor Feed Parser](https://github.com/switchboard-xyz/switchboard-v2/tree/main/programs/anchor-feed-parser)
 - [[Program] Anchor VRF Parser](https://github.com/switchboard-xyz/switchboard-v2/tree/main/programs/anchor-vrf-parser)
### ข้อมูลอื่นๆ
 - [Protocol Documentation](https://docs.switchboard.xyz/introduction)
 - [SuperteamDAO Deep Dive](https://crawling-cent-d6b.notion.site/The-Switchboard-Deep-Dive-717df6ba0b92465e8118351466257a0f)

