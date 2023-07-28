---
title: Desenvolvimento Local
head:
  - - meta
    - name: title
      content: Livro de Receitas da Solana - Solana Cookbook | Desenvolvimento Local
  - - meta
    - name: og:title
      content: Livro de Receitas da Solana - Solana Cookbook | Desenvolvimento Local
  - - meta
    - name: description
      content: Configure um validador local para seu ambiente de desenvolvimento local e receba um airdrop de SOL. Aprenda sobre Desenvolvimento Local e mais referências para Construir na Solana no livro de receitas da Solana.
  - - meta
    - name: og:description
      content: Configure um validador local para seu ambiente de desenvolvimento local e receba um airdrop de SOL. Aprenda sobre Desenvolvimento Local e mais referências para Construir na Solana no livro de receitas da Solana.
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

# Desenvolvimento Local

## Inicializando um Validador Local

Testar o código do seu programa localmente pode ser muito mais confiável do que testar na devnet e pode ajudá-lo a testar antes de experimentar na devnet.

Você pode configurar seu validador de teste local instalando o [conjunto de ferramentas da Solana](/getting-started/installation.md#install-cli) e executando:

```console
solana-test-validator
```

Benefícios de usar local-test-validator incluem:

- Sem limites de taxa de RPC
- Sem limites de airdrop
- Implantação direta de programas na cadeia (`--bpf-program ...`)
- Clonagem de contas de um cluster público, incluindo programas  (`--clone ...`)
- Retenção configurável de histórico de transações (`--limit-ledger-size ...`)
- Comprimento de época configurável  (`--slots-per-epoch ...`)
- Pular para um slot arbitrário (`--warp-slot ...`)

## Conectando a Ambientes

Ao trabalhar com desenvolvimento Solana, você precisará se conectar a um ponto de extremidade de API RPC específico. Solana tem 3 ambientes públicos de desenvolvimento:
- mainnet-beta https://api.mainnet-beta.solana.com
- devnet https://api.devnet.solana.com
- testnet https://api.testnet.solana.com

<SolanaCodeGroup>
  <SolanaCodeGroupItem title="TS" active>

  <template v-slot:default>

@[code](@/code/local-development/connecting-cluster/connecting-cluster.en.ts)

  </template>

  <template v-slot:preview>

@[code](@/code/local-development/connecting-cluster/connecting-cluster.preview.en.ts)

  </template>

  </SolanaCodeGroupItem>

  <SolanaCodeGroupItem title="Python">

  <template v-slot:default>

@[code](@/code/local-development/connecting-cluster/connecting-cluster.en.py)

  </template>

  <template v-slot:preview>

@[code](@/code/local-development/connecting-cluster/connecting-cluster.preview.en.py)

  </template>

  </SolanaCodeGroupItem>

  <SolanaCodeGroupItem title="C++">

  <template v-slot:default>

@[code](@/code/local-development/connecting-cluster/connecting-cluster.en.cpp)

  </template>

  <template v-slot:preview>

@[code](@/code/local-development/connecting-cluster/connecting-cluster.preview.en.cpp)

  </template>

  </SolanaCodeGroupItem>

  <SolanaCodeGroupItem title="Rust">

  <template v-slot:default>

@[code](@/code/local-development/connecting-cluster/connecting-cluster.en.rs)

  </template>

  <template v-slot:preview>

@[code](@/code/local-development/connecting-cluster/connecting-cluster.preview.en.rs)

  </template>

  </SolanaCodeGroupItem>
  <SolanaCodeGroupItem title="CLI">
  <template v-slot:default>

@[code](@/code/local-development/connecting-cluster/connecting-cluster.en.sh)

  </template>

  <template v-slot:preview>

@[code](@/code/local-development/connecting-cluster/connecting-cluster.en.sh)

  </template>
  </SolanaCodeGroupItem>

</SolanaCodeGroup>

Finalmente, você também pode se conectar a um cluster privado, local ou executado remotamente com o seguinte:

<SolanaCodeGroup>
  <SolanaCodeGroupItem title="TS" active>

  <template v-slot:default>

@[code](@/code/local-development/connecting-private-cluster/connecting-private-cluster.en.ts)

  </template>

  <template v-slot:preview>

@[code](@/code/local-development/connecting-private-cluster/connecting-private-cluster.preview.en.ts)

  </template>

  </SolanaCodeGroupItem>

  <SolanaCodeGroupItem title="Python">

  <template v-slot:default>

@[code](@/code/local-development/connecting-private-cluster/connecting-private-cluster.en.py)

  </template>

  <template v-slot:preview>

@[code](@/code/local-development/connecting-private-cluster/connecting-private-cluster.preview.en.py)

  </template>

  </SolanaCodeGroupItem>

  <SolanaCodeGroupItem title="C++">

  <template v-slot:default>

@[code](@/code/local-development/connecting-private-cluster/connecting-private-cluster.en.cpp)

  </template>

  <template v-slot:preview>

@[code](@/code/local-development/connecting-private-cluster/connecting-private-cluster.preview.en.cpp)

  </template>

  </SolanaCodeGroupItem>

  <SolanaCodeGroupItem title="Rust">

  <template v-slot:default>

@[code](@/code/local-development/connecting-private-cluster/connecting-private-cluster.en.rs)

  </template>

  <template v-slot:preview>

@[code](@/code/local-development/connecting-private-cluster/connecting-private-cluster.preview.en.rs)

  </template>

  </SolanaCodeGroupItem>

  <SolanaCodeGroupItem title="CLI">
  <template v-slot:default>

@[code](@/code/local-development/connecting-private-cluster/connecting-private-cluster.en.sh)

  </template>

  <template v-slot:preview>

@[code](@/code/local-development/connecting-private-cluster/connecting-private-cluster.en.sh)

  </template>
  </SolanaCodeGroupItem>

</SolanaCodeGroup>

## Subscrevendo a Eventos

Os websockets fornecem uma interface pub/sub onde você pode ouvir determinados eventos. Em vez de executar um ping em um ponto de extremidade HTTP típico em um intervalo para obter atualizações frequentes, você pode receber essas atualizações apenas quando elas ocorrem.

[`Connection`](https://solana-labs.github.io/solana-web3.js/classes/Connection.html), uma classe web3 da Solana, gera internamente um ponto de extremidade de websocket e registra um cliente websocket quando você cria uma nova instância `Connection` (consulte o código-fonte [aqui](https://github.com/solana-labs/solana-web3.js/blob/45923ca00e4cc1ed079d8e55ecbee83e5b4dc174/src/connection.ts#L2100)).

A classe `Connection` expõe métodos pub/sub - todos eles começam com `on`, como emissores de eventos. Quando você chama esses métodos ouvintes, é registrada uma nova assinatura no cliente websocket daquela instância `Connection`. O exemplo do método pub/sub que usamos abaixo é [`onAccountChange`](https://solana-labs.github.io/solana-web3.js/classes/Connection.html#onAccountChange). O retorno de chamada fornecerá os dados de estado atualizados por meio de argumentos (consulte [`AccountChangeCallback`](https://solana-labs.github.io/solana-web3.js/modules.html#AccountChangeCallback) como exemplo).

<SolanaCodeGroup>
  <SolanaCodeGroupItem title="TS" active>

  <template v-slot:default>

@[code](@/code/local-development/connecting-websocket/connecting-websocket.en.ts)

  </template>

  <template v-slot:preview>

@[code](@/code/local-development/connecting-websocket/connecting-websocket.preview.en.ts)

  </template>

  </SolanaCodeGroupItem>

  <SolanaCodeGroupItem title="Python">

  <template v-slot:default>

@[code](@/code/local-development/connecting-websocket/connecting-websocket.en.py)

  </template>

  <template v-slot:preview>

@[code](@/code/local-development/connecting-websocket/connecting-websocket.preview.en.py)

  </template>

  </SolanaCodeGroupItem>

  <SolanaCodeGroupItem title="C++">

  <template v-slot:default>

@[code](@/code/local-development/connecting-websocket/connecting-websocket.en.cpp)

  </template>

  <template v-slot:preview>

@[code](@/code/local-development/connecting-websocket/connecting-websocket.preview.en.cpp)

  </template>

  </SolanaCodeGroupItem>

  <SolanaCodeGroupItem title="Rust">

  <template v-slot:default>

@[code](@/code/local-development/connecting-websocket/connecting-websocket.en.rs)

  </template>

  <template v-slot:preview>

@[code](@/code/local-development/connecting-websocket/connecting-websocket.preview.en.rs)

  </template>

  </SolanaCodeGroupItem>
</SolanaCodeGroup>

## Obtendo SOL de Teste

Ao trabalhar localmente, você vai precisar de algum SOL para enviar transações. Em ambientes fora da mainnet, você pode receber SOL por meio de airdrop em seu endereço.

<SolanaCodeGroup>
  <SolanaCodeGroupItem title="TS" active>

  <template v-slot:default>

@[code](@/code/local-development/airdropping-sol/airdropping-sol.en.ts)

  </template>

  <template v-slot:preview>

@[code](@/code/local-development/airdropping-sol/airdropping-sol.preview.en.ts)

  </template>
  </SolanaCodeGroupItem>

  <SolanaCodeGroupItem title="Python">

  <template v-slot:default>

@[code](@/code/local-development/airdropping-sol/airdropping-sol.en.py)

  </template>

  <template v-slot:preview>

@[code](@/code/local-development/airdropping-sol/airdropping-sol.preview.en.py)

  </template>

  </SolanaCodeGroupItem>

  <SolanaCodeGroupItem title="C++">

  <template v-slot:default>

@[code](@/code/local-development/airdropping-sol/airdropping-sol.en.cpp)

  </template>

  <template v-slot:preview>

@[code](@/code/local-development/airdropping-sol/airdropping-sol.preview.en.cpp)

  </template>

  </SolanaCodeGroupItem>

  <SolanaCodeGroupItem title="Rust">
  <template v-slot:default>

@[code](@/code/local-development/airdropping-sol/airdropping-sol.en.rs)

  </template>

  <template v-slot:preview>

@[code](@/code/local-development/airdropping-sol/airdropping-sol.preview.en.rs)

  </template>
  </SolanaCodeGroupItem>

  <SolanaCodeGroupItem title="CLI">
  <template v-slot:default>

@[code](@/code/local-development/airdropping-sol/airdropping-sol.en.sh)

  </template>

  <template v-slot:preview>

@[code](@/code/local-development/airdropping-sol/airdropping-sol.preview.en.sh)

  </template>
  </SolanaCodeGroupItem>

</SolanaCodeGroup>

## Usando Contas e Programas Da Mainnet

Muitas vezes, os testes locais dependem de programas e contas disponíveis apenas na mainnet. A CLI da Solana permite:
* Baixar programas e contas
* Carregar programas e contas em um validador local

### Como carregar contas da mainnet

É possível baixar a conta de emissão de token SRM para um arquivo:

<SolanaCodeGroup>
  <SolanaCodeGroupItem title="CLI">
  <template v-slot:default>

@[code](@/code/local-development/using-mainnet-accounts/dump-accounts.en.sh)

  </template>

  <template v-slot:preview>

@[code](@/code/local-development/using-mainnet-accounts/dump-accounts.preview.en.sh)

  </template>
  </SolanaCodeGroupItem>

</SolanaCodeGroup>

O carregamento para a sua rede local é feito passando o arquivo da conta e o endereço de destino (no cluster local) ao iniciar o validador:

<SolanaCodeGroup>
  <SolanaCodeGroupItem title="CLI">
  <template v-slot:preview>

@[code](@/code/local-development/using-mainnet-accounts/load-accounts.preview.en.sh)

  </template>

  <template v-slot:default>

@[code](@/code/local-development/using-mainnet-accounts/load-accounts.en.sh)

  </template>

  </SolanaCodeGroupItem>

</SolanaCodeGroup>

### Como carregar programas da mainnet

Da mesma forma, é possível baixar o programa Serum Dex v3:

<SolanaCodeGroup>
  <SolanaCodeGroupItem title="CLI">
  <template v-slot:default>

@[code](@/code/local-development/using-mainnet-accounts/dump-programs.en.sh)

  </template>

  <template v-slot:preview>

@[code](@/code/local-development/using-mainnet-accounts/dump-programs.preview.en.sh)

  </template>
  </SolanaCodeGroupItem>

</SolanaCodeGroup>

O carregamento para a sua rede local é feito passando o arquivo do programa e o endereço de destino (no cluster local) ao iniciar o validador:

<SolanaCodeGroup>
  <SolanaCodeGroupItem title="CLI">
  <template v-slot:preview>

@[code](@/code/local-development/using-mainnet-accounts/load-programs.preview.en.sh)

  </template>

  <template v-slot:default>

@[code](@/code/local-development/using-mainnet-accounts/load-programs.en.sh)

  </template>

  </SolanaCodeGroupItem>

</SolanaCodeGroup>
