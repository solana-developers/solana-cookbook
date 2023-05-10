---
title: Jupiter
head:
  - - meta
    - name: title
      content: Livro de Receitas da Solana - Solana Cookbook | Troque tokens usando o Jupiter
  - - meta
    - name: og:title
      content: Livro de Receitas da Solana - Solana Cookbook | Troque tokens usando o Jupiter
  - - meta
    - name: description
      content: Jupiter é o agregador-chave de liquidez para a Solana, oferecendo a mais ampla gama de tokens e a melhor descoberta de rota entre qualquer par de tokens.
  - - meta
    - name: og:description
      content: Jupiter é o agregador-chave de liquidez para a Solana, oferecendo a mais ampla gama de tokens e a melhor descoberta de rota entre qualquer par de tokens.
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

# Jupiter

Jupiter é o principal agregador de liquidez para Solana, oferecendo a maior variedade de tokens e a melhor descoberta de rotas entre qualquer par de tokens.

### Instalação

`@jup-ag/core` é o pacote principal usado para interagir com os programas da cadeia do Jupiter, para realizar trocas entre dois possíveis pares de tokens.

<CodeGroup>
  <CodeGroupItem title="YARN" active>

```bash
yarn add @jup-ag/core
```

  </CodeGroupItem>

  <CodeGroupItem title="NPM">

```bash
npm install @jup-ag/core
```

  </CodeGroupItem>
</CodeGroup>

### Obtendo a lista de tokens do Jupiter

Todos os possíveis tokens que podem ser trocados com o Jupiter para uma determinada rede estão sendo buscados.

<SolanaCodeGroup>
  <SolanaCodeGroupItem title="TS" active>

  <template v-slot:default>

@[code](@/code/jupiter/token-list/main.en.ts)

  </template>

  <template v-slot:preview>

@[code](@/code/jupiter/token-list/main.preview.en.ts)

  </template>

  </SolanaCodeGroupItem>

</SolanaCodeGroup>

### Carregando a instância do Jupiter

A instância do Jupiter está sendo criada com as configurações fornecidas. Existem muitos parâmetros opcionais que a instância pode receber, para saber mais sobre isso, acesse [aqui](https://docs.jup.ag/jupiter-core/full-guide).

<SolanaCodeGroup>
  <SolanaCodeGroupItem title="TS" active>

  <template v-slot:default>

@[code](@/code/jupiter/loading-instance/main.en.ts)

  </template>

  <template v-slot:preview>

@[code](@/code/jupiter/loading-instance/main.preview.en.ts)

  </template>

  </SolanaCodeGroupItem>

</SolanaCodeGroup>

### Obtendo o RouteMap

O RouteMap (mapa de rotas) identifica quais tokens podem ser trocados por um token de entrada fornecido. O mapa de rotas contém apenas os endereços de cunhagem dos tokens e nenhum metadado.

<SolanaCodeGroup>
  <SolanaCodeGroupItem title="TS" active>

  <template v-slot:default>

@[code](@/code/jupiter/route-map/main.en.ts)

  </template>

  <template v-slot:preview>

@[code](@/code/jupiter/route-map/main.preview.en.ts)

  </template>

  </SolanaCodeGroupItem>

</SolanaCodeGroup>

### Obtendo as rotas para um determinado par de tokens de Entrada e Saída

O método `computeRoutes` recebe os endereços de cunhagem do token de entrada e do token de saída e fornece todas as rotas possíveis em ordem de melhor preço primeiro.

<SolanaCodeGroup>
  <SolanaCodeGroupItem title="TS" active>

  <template v-slot:default>

@[code](@/code/jupiter/routes/main.en.ts)

  </template>

  <template v-slot:preview>

@[code](@/code/jupiter/routes/main.preview.en.ts)

  </template>

  </SolanaCodeGroupItem>

</SolanaCodeGroup>

### Executando a troca de tokens

O método `exchange` é chamado aqui, o qual constrói a transação para uma determinada rota.

<SolanaCodeGroup>
  <SolanaCodeGroupItem title="TS" active>

  <template v-slot:default>

@[code](@/code/jupiter/swap/main.en.ts)

  </template>

  <template v-slot:preview>

@[code](@/code/jupiter/swap/main.preview.en.ts)

  </template>

  </SolanaCodeGroupItem>

</SolanaCodeGroup>

## Como usar o Jupiter em um aplicativo React

### Instalação

<CodeGroup>
  <CodeGroupItem title="YARN" active>

```bash
yarn add @jup-ag/react-hook
```

  </CodeGroupItem>

  <CodeGroupItem title="NPM">

```bash
npm install @jup-ag/react-hook
```

  </CodeGroupItem>
</CodeGroup>

### Adicionando o provedor

Estamos configurando o `JupiterProvider` aqui para usar o gancho `useJupiter` em todo o aplicativo React. O parâmetro `cluster` é definido como **mainnet-beta** para obter uma ampla variedade de tokens, mas se desejar, pode ser alterado para **devnet** também.

<SolanaCodeGroup>
  <SolanaCodeGroupItem title="TS" active>

  <template v-slot:default>

@[code](@/code/jupiter/providerSetup/main.en.ts)

  </template>

  <template v-slot:preview>

@[code](@/code/jupiter/providerSetup/main.preview.en.ts)

  </template>

  </SolanaCodeGroupItem>

</SolanaCodeGroup>

### Buscando a lista de tokens

Todos os possíveis tokens que podem ser trocados em uma determinada rede são buscados e armazenados no estado.

<SolanaCodeGroup>
  <SolanaCodeGroupItem title="TS" active>

  <template v-slot:default>

@[code](@/code/jupiter/react-token-list/main.en.ts)

  </template>

  <template v-slot:preview>

@[code](@/code/jupiter/react-token-list/main.preview.en.ts)

  </template>

  </SolanaCodeGroupItem>

</SolanaCodeGroup>

### Configurando o estado

`InputMint` e `OutputMint` são estados adicionados para serem trocados entre si ou podem ser fornecidos pelo usuário.

<SolanaCodeGroup>
  <SolanaCodeGroupItem title="TS" active>

  <template v-slot:default>

@[code](@/code/jupiter/inputSetup/main.en.ts)

  </template>

  <template v-slot:preview>

@[code](@/code/jupiter/inputSetup/main.preview.en.ts)

  </template>

  </SolanaCodeGroupItem>

</SolanaCodeGroup>

### Usando o gancho useJupiter do React

O gancho `useJupiter` recebe todos os parâmetros necessários para encontrar as rotas através das quais os Tokens de `InputMint` e `OutputMint` podem ser trocados. Para saber mais sobre isso, acesse [aqui](https://docs.jup.ag/jupiter-react/using-the-react-hook).

<SolanaCodeGroup>
  <SolanaCodeGroupItem title="TS" active>

  <template v-slot:default>

@[code](@/code/jupiter/useJupiter/main.en.ts)

  </template>

  <template v-slot:preview>

@[code](@/code/jupiter/useJupiter/main.preview.en.ts)

  </template>

  </SolanaCodeGroupItem>

</SolanaCodeGroup>

### Realizando a troca

Depois de fornecer todos os dados para o gancho `useJupiter`, podemos usar a instância do Jupiter para realizar uma troca usando o método `exchange`.

<SolanaCodeGroup>
  <SolanaCodeGroupItem title="TS" active>

  <template v-slot:default>

@[code](@/code/jupiter/reactSwap/main.en.ts)

  </template>

  <template v-slot:preview>

@[code](@/code/jupiter/reactSwap/main.preview.en.ts)

  </template>

  </SolanaCodeGroupItem>

</SolanaCodeGroup>

## Como usar a API do Jupiter

Esta é a maneira mais fácil de interagir com os programas do Jupiter para trocar quaisquer 2 tokens fornecidos.

### Instalação

<CodeGroup>
  <CodeGroupItem title="YARN" active>

```bash
yarn i @solana/web3.js
yarn i cross-fetch
yarn i @project-serum/anchor
yarn i bs58
```

  </CodeGroupItem>

  <CodeGroupItem title="NPM">

```bash
npm i @solana/web3.js
npm i cross-fetch
npm i @project-serum/anchor
npm i bs58
```

  </CodeGroupItem>
</CodeGroup>

### Obtendo o Mapa de Rotas

Esta API recupera todos os tokens disponíveis que podem ser trocados usando a API do Jupiter. Aqui, uma lista de todas as rotas possíveis de token está sendo buscada e `allInputMints` contém a lista de todos os tokens de entrada possíveis por endereço de cunhagem e `swappableOutputForSol` contém todos os tokens possíveis que podem ser trocados por SOL, neste caso.

<SolanaCodeGroup>
  <SolanaCodeGroupItem title="TS" active>

  <template v-slot:default>

@[code](@/code/jupiter/retriveapi/main.en.ts)

  </template>

  <template v-slot:preview>

@[code](@/code/jupiter/retriveapi/main.preview.en.ts)

  </template>

  </SolanaCodeGroupItem>

</SolanaCodeGroup>

### Obtendo a Transação Serializada para realizar a troca

A solicitação de API `POST` é feita com a rota que desejamos seguir e o endereço da carteira do usuário. Existem alguns parâmetros opcionais que podem ser adicionados a esta API, como `wrapUnwrapSOL` e `feeAccount`. Para saber mais sobre isso, consulte a documentação oficial neste [link](https://docs.jup.ag/jupiter-api/swap-api-for-solana).

<SolanaCodeGroup>
  <SolanaCodeGroupItem title="TS" active>

  <template v-slot:default>

@[code](@/code/jupiter/getTxapi/main.en.ts)

  </template>

  <template v-slot:preview>

@[code](@/code/jupiter/getTxapi/main.preview.en.ts)

  </template>

  </SolanaCodeGroupItem>

</SolanaCodeGroup>

### Executando a transação de troca

Um objeto de transação é criado e, em seguida, é assinado pelo usuário.

<SolanaCodeGroup>
  <SolanaCodeGroupItem title="TS" active>

  <template v-slot:default>

@[code](@/code/jupiter/executeapi/main.en.ts)

  </template>

  <template v-slot:preview>

@[code](@/code/jupiter/executeapi/main.preview.en.ts)

  </template>

  </SolanaCodeGroupItem>

</SolanaCodeGroup>

## Outros recursos

- [Documentação Oficial](https://docs.jup.ag/)
- [Código de exemplo do Jupiter Core](https://github.com/jup-ag/jupiter-core-example)
- [Código de exemplo do Jupiter React](https://github.com/jup-ag/jupiter-api-nextjs-example)
- [Código de exemplo da API do Jupiter](https://github.com/jup-ag/api-arbs-example)
