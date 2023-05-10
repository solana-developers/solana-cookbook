---
title: Switchboard
head:
  - - meta
    - name: title
      content: Livro de Receitas da Solana - Solana Cookbook | Usando o Switchboard para criar feeds de dados na cadeia
  - - meta
    - name: og:title
      content: Livro de Receitas da Solana - Solana Cookbook | Usando o Switchboard para criar feeds de dados na cadeia
  - - meta
    - name: Descrição
      content: O Switchboard permite que construtores desbloqueiem o poder da Solana criando feeds de dados de alta performance a partir de qualquer API.
  - - meta
    - name: og:Descrição
      content: O Switchboard permite que construtores desbloqueiem o poder da Solana criando feeds de dados de alta performance a partir de qualquer API.
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

O Switchboard é um protocolo de oráculo que permite que os desenvolvedores obtenham dados na cadeia para uma variedade de casos de uso, como feeds de preços, preços mínimos de NFTs, estatísticas esportivas ou até mesmo aleatoriedade verificável. Em termos gerais, o Switchboard é um recurso fora da cadeia que os desenvolvedores podem invocar para conectar dados de alta integridade na cadeia e alimentar a próxima geração web3 e DeFi.

## Feeds de Dados

O Switchboard fornece uma biblioteca JavaScript/TypeScript chamada **@switchboard-xyz/switchboard-v2**. Essa biblioteca pode ser usada para obter dados na cadeia a partir de feeds de dados existentes ou publicar seus próprios feeds personalizados. Saiba mais sobre isso [aqui](https://www.npmjs.com/package/@switchboard-xyz/switchboard-v2).

### Ler dados de um Feed de Agregador

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

### Criar um novo Feed de Agregador

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

### Ler dados de um Feed de Agregador no Programa
O Switchboard fornece um crate chamado **switchboard_v2**
Saiba mais sobre isso [aqui](https://docs.rs/switchboard-v2/0.1.10/switchboard_v2/).

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

### Como criar um Feed do Publicador

A documentação oficial do Switchboard possui um guia detalhado de como criar um feed a partir do publicador (publisher). Confira [aqui](https://docs.switchboard.xyz/publisher).

## Oráculos

A característica única do Switchboard é que ele permite que você crie seu próprio oráculo e o execute localmente.

### Criar um oráculo

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

### Executar um oráculo localmente

Você pode executar um oráculo localmente e atribuí-lo à sua própria fila de oráculos para testar como seu programa pode operar na produção. Os oráculo da Mainnet devem sempre ser executados em ambientes de alta disponibilidade com algum conjunto de capacidades de monitoramento.

#### Requisitos
 - Docker-compose

Crie um arquivo docker-compose.yml com as variáveis de ambiente da [Configuração do Oráculo](/integrations/switchboard.html#oracle-config).


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

Execute o contêiner usando `docker-compose up`.

### Configuração do Oráculo
<table>
  <thead>
    <tr>
      <th>Variável de Ambiente (Env)</th>
      <th>Definição</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>ORACLE_KEY</td>
      <td>
        <b>
          <u>Obrigatório</u>
        </b>
        <br />
        <b>Tipo</b> - Chave Pública
        <br />
        <b>Descrição</b> - Chave pública da conta do oráculo que recebeu permissões para usar uma fila de oráculos. <br />
      </td>
    </tr>
    <tr>
      <td>HEARTBEAT_INTERVAL</td>
      <td>
        <b>
          <u>Opcional</u>
        </b>
        <br />
        <b>Tipo</b> - Número (segundos)
        <br />
        <b>Padrão</b> - 30
        <br />
        <b>Descrição</b> - Segundos entre os batimentos cardíacos do oráculo. As filas têm requisitos diferentes de batimento cardíaco do oráculo. O valor recomendado é 15.
      </td>
    </tr>
    <tr>
      <td>GCP_CONFIG_BUCKET</td>
      <td>
        <b>
          <u>Opcional</u>
        </b>
        <br />
        <b>Tipo</b> - Caminho do recurso do GCP (Google Cloud Platform)
        <br />
        <b>Padrão</b> - Procura por configs.json no diretório de trabalho atual. Se não for encontrado, nenhuma configuração é carregada.
        <br />
        <b>Descrição</b> - Contém chaves de API para pontos de extremidade de API privados.
      </td>
    </tr>
    <tr>
      <td>UNWRAP_STAKE_THRESHOLD</td>
      <td>
        <b>
          <u>Opcional</u>
        </b>
        <br />
        <b>Tipo</b> - Número (Quantidade de SOL, Ex. 1.55)
        <br />
        <b>Padrão</b> - 0, desabilitado.
        <br />
        <b>Descrição</b> - O valor do saldo Solana para acionar uma ação de desbloqueio de stake. Quando o saldo Solana do oráculo cair abaixo do limite estabelecido, o nó desbloqueará automaticamente fundos da carteira de stake do oráculo, deixando pelo menos 0,1 wSOL ou 10% a mais do que o requisito mínimo de stake da fila.
      </td>
    </tr>
  </tbody>
</table>

## Função Aleatória Verificável (VRF)

Uma Função Aleatória Verificável (VRF) é uma função pseudoaleatória de chave pública que fornece provas de que suas saídas foram calculadas corretamente.

### Lendo uma conta VRF

<SolanaCodeGroup>
  <SolanaCodeGroupItem title="TS" active>

  <template v-slot:>

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

### Criando uma conta VRF

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

### Solicitando aleatoriedade de uma conta VRF

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


## Recursos
### APIs e Bibliotecas
 - [Tipos de Tarefa do Switchboard](https://docs.switchboard.xyz/api/tasks)
 - [Documentação da API Rust](https://docs.rs/switchboard-v2/latest/switchboard_v2/)
 - [Documentação da API Typescript](https://docs.switchboard.xyz/api/ts)
 - [Documentação da API Python](https://docs.switchboard.xyz/api/py)
 - [Documentação da CLI](https://docs.switchboard.xyz/api/cli)
### Exemplos
 - [[Cliente] Demonstração personalizada de feed de dados](https://github.com/switchboard-xyz/switchboard-v2/tree/main/packages/feed-walkthrough)
 - [[Programa] Analisador de feed do Anchor](https://github.com/switchboard-xyz/switchboard-v2/tree/main/programs/anchor-feed-parser)
 - [[Programa] Analisador VRF do Anchor](https://github.com/switchboard-xyz/switchboard-v2/tree/main/programs/anchor-vrf-parser)
### Mais informações
 - [Documentação do Protocolo](https://docs.switchboard.xyz/introduction)
 - [Análise aprofundada da SuperteamDAO](https://crawling-cent-d6b.notion.site/The-Switchboard-Deep-Dive-717df6ba0b92465e8118351466257a0f)

