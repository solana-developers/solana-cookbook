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

Switchboardは、開発者が価格フィード、NFT 最低価格、スポーツ統計、さらには検証可能なランダム性など、さまざまなユースケースのためにチェーン上でデータを調達できるようにする Oracle プロトコルです。 一般的な意味で、Switchboardはオフチェーンのリソースであり、開発者はチェーン上で整合性の高いデータを橋渡しし、次世代の web3とDeFiを強化するために呼び出すことができます。

## Data Feeds

Switchboardは **@switchboard-xyz/switchboard-v2** として呼び出されるJavaScript/TypeScriptライブラリです。このライブラリを使用して、既存のデータフィードからオンチェーン データにアクセスしたり、独自のカスタムフィードを公開したりできます。詳細は[こちら](https://www.npmjs.com/package/@switchboard-xyz/switchboard-v2
)

### アグリゲーターフィードからデータを読み取る

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

### アグリゲーターフィードを新規作成する

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

### プログラムでアグリゲーターフィードからデータを読み取る
Switchboardは**switchboard_v2**というクレートを提供します。詳細については、[こちら](https://docs.rs/switchboard-v2/0.1.10/switchboard_v2/)をご覧ください。 


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

### パブリッシャーからフィードを作成する方法
公式の Switchboard ドキュメントには、パブリッシャーからフィードを作成する方法の詳細なウォークスルーがあります。[こちら](https://docs.switchboard.xyz/feed/publisher)をチェックしてください。

## Oracle
Switchboardのユニークな機能は、独自のOracleを作成してローカルで実行できることです。

### Oracleを作成
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

### Oracleをローカルで実行
Oracleをローカルで実行し、独自のOracleキューに割り当てて、プログラムが本番環境でどのように動作するかをテストできます。メインネットのOracleは、監視機能のセットを備えた高可用性環境で常に実行する必要があります。

#### 要件
 - Docker-compose

[Oracle Config](/integrations/switchboard.html#oracle-config)で環境変数を使用してdocker-compose.ymlを作成します。



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

`docker-compose up`を使用してコンテナを実行します。

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
        <b>Description</b> - Oracleキューを使用する権限を付与されたOracleアカウントの公開鍵<br />
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
        <b>Description</b> - Oracle ハートビート間の秒数。キューには、異なるOracleハートビート要件があります。推奨値は15です
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
        <b>Default</b> - 現在の作業ディレクトリで configs.json を探します。見つからない場合、構成はロードされません。
        <br />
        <b>Description</b> - プライベートAPIエンドポイントのAPIキーを含む
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
        <b>Description</b> - unwrap stake actionをトリガーする Solana の残高。OracleのSolana 残高が設定されたしきい値を下回ると、ノードは自動的にオラクルのステーキングウォレットから資金をアンラップし、少なくとも0.1 wSOL またはキューの最小ステーク要件より10%多い金額を残します。
      </td>
    </tr>
  </tbody>
</table>

## 検証可能な確率関数(VRF)
検証可能な確率関数(Verifiable Random Function/VRF)出力が正しく計算されたことを証明する公開鍵疑似乱数関数です。

### VRFアカウントの読み取り

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

### VRFアカウントの作成

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

### VRFアカウントからRandomnessを要求する

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


## 参考文献
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

