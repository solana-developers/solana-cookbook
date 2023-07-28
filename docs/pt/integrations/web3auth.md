---
title: web3Auth (Carteira Torus)
head:
  - - meta
    - name: title
      content: Livro de Receitas da Solana - Solana Cookbook | Carteira
  - - meta
    - name: og:title
      content: Livro de Receitas da Solana - Solana Cookbook | Carteira
  - - meta
    - name: description
      content: Aprenda sobre carteiras, integração de logins sociais, assinatura e verificação de mensagens e mais referências para Construir na Solana no Livro de Receitas da Solana.
  - - meta
    - name: og:description
      content: Aprenda sobre carteiras, integração de logins sociais, assinatura e verificação de mensagens e mais referências para Construir na Solana no Livro de Receitas da Solana.
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

# Carteira

## O que é uma carteira?

Uma carteira de criptomoedas é uma carteira digital usada para interagir com a blockchain. Permite que você assine, verifique e envie transações. Existem muitas soluções de carteira de criptomoedas no mercado, que variam de aplicativos da web simples de usar a soluções de segurança de hardware mais complexas.

## Logins sociais na Solana

O [**Web3Auth**](https://docs.web3auth.io/) permite que os usuários façam login usando seus provedores OAuth de Web2 existentes (Facebook, Google, Twitter etc.) em aplicativos Web3. Ele fornece uma abordagem amigável e [não custodial](https://docs.web3auth.io/key-infrastructure/overview) para gerenciar ativos e identidade. Ele remove barreiras técnicas e reduz a curva de aprendizado da propriedade digital para todos os usuários, fornecendo um invólucro em torno do gerenciamento de chaves privadas.

## Guia de integração

Este tutorial irá orientá-lo em um exemplo básico para integrar logins sociais em seu aplicativo descentralizado.

### Instalando dependências

Para começar a usar a carteira com um dapp, você pode instalar o `@toruslabs/solana-embed`. Você pode usar gerenciadores de pacotes populares como yarn e npm para baixá-los.

<CodeGroup>
  <CodeGroupItem title="YARN" active>

```bash
yarn add @toruslabs/solana-embed
```

  </CodeGroupItem>

  <CodeGroupItem title="NPM">

```bash
npm install --save @toruslabs/solana-embed
```

  </CodeGroupItem>
</CodeGroup>

### Importe o SDK e inicialize

No trecho de código abaixo, estamos criando uma instância de solana-embed e, em seguida, inicializando-a com um ambiente de teste que usa a rede de testes da Solana. Você pode passar outras opções de configuração ao inicializar a interface da carteira. Você pode consultar a [referência da API](https://docs.tor.us/solana-wallet/api-reference/class) solana-embed para saber mais sobre isso.

<SolanaCodeGroup>
  <SolanaCodeGroupItem title="TS" active>

  <template v-slot:default>

@[code](@/code/wallet/Web3Auth/initialize-instance.en.ts)

  </template>

  <template v-slot:preview>

@[code](@/code/wallet/Web3Auth/initialize-instance.preview.en.ts)

  </template>

  </SolanaCodeGroupItem>
</SolanaCodeGroup>

### Acione o login do usuário

Basta chamar `torus.login()` para acionar um login sempre que fizer sentido no ciclo de vida do seu aplicativo. Chamar o método de login sem nenhum parâmetro abrirá um modal para o usuário selecionar todos os logins suportados.

![](./assets/Web3Auth/login-modal.png)

Após o login bem-sucedido, o método retornará um array de chaves públicas. O primeiro elemento do array é a chave pública atual da carteira.

<SolanaCodeGroup>
  <SolanaCodeGroupItem title="TS" active>

  <template v-slot:default>

@[code](@/code/wallet/Web3Auth/login.en.ts)

  </template>

  <template v-slot:preview>

@[code](@/code/wallet/Web3Auth/login.preview.en.ts)

  </template>

  </SolanaCodeGroupItem>
</SolanaCodeGroup>

### Usando a instância do Torus para buscar detalhes da conta do usuário​

A instância do Torus fornece uma interface para interações, como assinar transações e mensagens em um estado logado. Ela também pode nos fornecer uma interface para acessar informações de login do usuário, como o e-mail do usuário, imagem do perfil, etc. (dependendo do método de login).

<SolanaCodeGroup>
  <SolanaCodeGroupItem title="TS" active>

  <template v-slot:default>

@[code](@/code/wallet/Web3Auth/user-info.en.ts)

  </template>

  <template v-slot:preview>

@[code](@/code/wallet/Web3Auth/user-info.preview.en.ts)

  </template>

  </SolanaCodeGroupItem>
</SolanaCodeGroup>

### Usando a API Torus da Solana para assinar uma mensagem

Para enviar uma mensagem para o usuário assinar, o aplicativo da web deve fornecer uma string codificada em UTF-8 como um Uint8Array.

Toda vez que um usuário quiser assinar uma mensagem, a carteira abrirá uma janela de confirmação.

<SolanaCodeGroup>
  <SolanaCodeGroupItem title="TS" active>

  <template v-slot:default>

@[code](@/code/wallet/Web3Auth/sign-message.en.ts)

  </template>

  <template v-slot:preview>

@[code](@/code/wallet/Web3Auth/sign-message.preview.en.ts)

  </template>

  </SolanaCodeGroupItem>
</SolanaCodeGroup>

Da mesma forma, você também pode usar os métodos [signTransaction](https://docs.tor.us/solana-wallet/api-reference/solana/sign-transaction) e `signAllTransactions` na instância do Torus para assinar transações únicas e múltiplas, respectivamente.

### Usando a API Torus da Solana para enviar uma transação

Para enviar uma transação, basta chamar o método `sendTransaction` na instância do Torus e passar a Transação.

A carteira abre uma janela de confirmação. Após a aprovação, o SDK assina e envia a transação para a cadeia.

<SolanaCodeGroup>
  <SolanaCodeGroupItem title="TS" active>

  <template v-slot:default>

@[code](@/code/wallet/Web3Auth/send-transaction.en.ts)

  </template>

  <template v-slot:preview>

@[code](@/code/wallet/Web3Auth/send-transaction.preview.en.ts)

  </template>

  </SolanaCodeGroupItem>
</SolanaCodeGroup>

### Recargas

Atualmente, a API suporta recargas do Moonpay.

<SolanaCodeGroup>
  <SolanaCodeGroupItem title="TS" active>

  <template v-slot:default>

@[code](@/code/wallet/Web3Auth/topup.en.ts)

  </template>

  <template v-slot:preview>

@[code](@/code/wallet/Web3Auth/topup.preview.en.ts)

  </template>

  </SolanaCodeGroupItem>
</SolanaCodeGroup>

### Logout

Para deslogar o usuário, basta chamar a função `logout` na instância da carteira do Torus.

<SolanaCodeGroup>
  <SolanaCodeGroupItem title="TS" active>

  <template v-slot:default>

@[code](@/code/wallet/Web3Auth/logout.en.ts)

  </template>
    
  <template v-slot:preview>
    
@[code](@/code/wallet/Web3Auth/logout.preview.en.ts)
    
  </template>

  </SolanaCodeGroupItem>
</SolanaCodeGroup>

## Recursos

* [solana-embed](https://github.com/torusresearch/solana-embed)
* [Referência da API](https://docs.web3auth.io/solana-wallet/api-reference/class)
* [Demonstração hospedada](https://demo-solana.tor.us/)
* [Integração React de exemplo](https://github.com/torusresearch/solana-embed-react-demo)
* [Carteira Solana](https://solana.tor.us/)