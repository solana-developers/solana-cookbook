---
title: RPC WebSocket
---

# RPC WebSocket

## Introduction

Websockets provide a pub/sub interface where you can listen for certain events. Instead of pinging a typical HTTP endpoint at an interval to get frequent updates, you can instead receive those updates only when they happen.

Solana's web3 [`Connection`](https://solana-labs.github.io/solana-web3.js/classes/Connection.html) under the hood generates a websocket endpoint and registers a websocket client when you create a new `Connection` instance (see source code [here](https://github.com/solana-labs/solana-web3.js/blob/45923ca00e4cc1ed079d8e55ecbee83e5b4dc174/src/connection.ts#L2100)).

The `Connection` class exposes pub/sub methods - they all start with `on`, like event emitters. When you call these listener methods, it registers a new subscription to the websocket client of that `Connection` instance. The example pub/sub method we use below is [`onAccountChange`](https://solana-labs.github.io/solana-web3.js/classes/Connection.html#onAccountChange). The callback will provide the updated state data through arguments (see [`AccountChangeCallback`](https://solana-labs.github.io/solana-web3.js/modules.html#AccountChangeCallback) as an example).

## Setup

<SolanaCodeGroup>
  <SolanaCodeGroupItem title="TS" active>

  <template v-slot:default>

@[code](@/code/websocket/connecting-websocket.en.ts)

  </template>

  <template v-slot:preview>

@[code](@/code/websocket/connecting-websocket.preview.en.ts)

  </template>

  </SolanaCodeGroupItem>
</SolanaCodeGroup>
