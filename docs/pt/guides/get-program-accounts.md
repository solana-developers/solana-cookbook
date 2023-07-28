---
title: Obter Contas do Programa
head:
  - - meta
    - name: title
      content: Livro de Receitas da Solana - Solana Cookbook | Obter Contas do Programa
  - - meta
    - name: og:title
      content: Livro de Receitas da Solana - Solana Cookbook | Obter Contas do Programa
  - - meta
    - name: description
      content: Aprenda como consultar dados na Solana usando getProgramAccounts e accountsDB.
  - - meta
    - name: og:description
      content: Aprenda como consultar dados na Solana usando getProgramAccounts e accountsDB.
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

# Obter Contas do Programa

`getProgramAccounts` é um método RPC que retorna todas as contas pertencentes a um programa. Atualmente, a paginação não é suportada. As solicitações para `getProgramAccounts` devem incluir os parâmetros `dataSlice` e/ou `filters` para melhorar o tempo de resposta e retornar apenas os resultados pretendidos. 

## Fatos

::: tip Parâmetros

- `programId`: `string` - A chave pública (pubkey) do programa a ser consultado, fornecida como uma string codificada em base58
- (opcional) `configOrCommitment`: `object` - Parâmetros de configuração contendo os seguintes campos opcionais:
    - (opcional) `commitment`: `string` - [Compromisso de estado](https://docs.solana.com/developing/clients/jsonrpc-api#configuring-state-commitment)
    - (opcional) `encoding`: `string` - Codificação para dados da conta: `base58`, `base64`, ou `jsonParsed`. Observe que os usuários do web3js devem usar [getParsedProgramAccounts](https://solana-labs.github.io/solana-web3.js/classes/Connection.html#getParsedProgramAccounts)
    - (opcional) `dataSlice`: `object` - Limite os dados da conta retornados com base em:
        - `offset`: `number` - Número de bytes para começar a retornar os dados da conta
        - `length`: `number` - Número de bytes dos dados da conta a serem retornados
    - (opcional) `filters`: `array` - Filtra os resultados usando os seguintes objetos de filtro:
        - `memcmp`: `object` - Combina uma série de bytes aos dados da conta:
            - `offset`: `number` - Número de bytes nos dados da conta para iniciar a comparação
            - `bytes`: `string` - Dados para combinar, como uma string codificada em base58 limitada a 129 bytes
        - `dataSize`: `number` - Compara o tamanho dos dados da conta com o tamanho de dados fornecido
    - (opcional) `withContext`: `boolean` - Envolva o resultado em um [objeto JSON RpcResponse](https://docs.solana.com/developing/clients/jsonrpc-api#rpcresponse-structure)

##### Resposta

Por padrão, `getProgramAccounts` retornará um array de objetos JSON com a seguinte estrutura:

- `pubkey`: `string` - A chave pública da conta como uma string codificada em base58
- `account`: `object` - Um objeto JSON, com os seguintes subcampos:
    - `lamports`: `number`, número de lamports atribuídos à conta
    - `owner`: `string`, a chave pública codificada em base58 do programa ao qual a conta foi atribuída
    - `data`: `string` | `object` - dados associados à conta, seja como dados binários codificados ou formato JSON, dependendo do parâmetro de codificação fornecido
    - `executable`: `boolean`, indicação se a conta contém um programa
    - `rentEpoch`: `number`, época na qual esta conta deverá pagar aluguel novamente
:::

## Mergulho Profundo

`getProgramAccounts` é um método RPC versátil que retorna todas as contas de propriedade de um programa. Podemos usar `getProgramAccounts` para várias consultas úteis, como encontrar:

- Todas as contas de token para uma carteira específica
- Todas as contas de token para uma cunhagem de tokens específica (ou seja, todos os detentores de [SRM](https://www.projectserum.com/))
- Todas as contas personalizadas para um programa específico (ou seja, todos os usuários do [Mango](https://mango.markets/))

Apesar de sua utilidade, `getProgramAccounts` é frequentemente mal compreendido devido às suas limitações atuais. Muitas das consultas suportadas pelo `getProgramAccounts` exigem que os nós RPC verifiquem grandes conjuntos de dados. Essas verificações são intensivas em recursos e em memória. Como resultado, chamadas muito frequentes ou muito grandes em escopo podem resultar em tempo limite de conexão. Além disso, no momento em que este texto foi escrito, o ponto de extremidade `getProgramAccounts` não suporta paginação. Se os resultados de uma consulta forem muito grandes, a resposta será truncada.

Para contornar essas limitações atuais, `getProgramAccounts` oferece vários parâmetros úteis, como `dataSlice` e as opções de filtros (`filters`) `memcmp` e `dataSize`. Ao fornecer combinações desses parâmetros, podemos reduzir o escopo de nossas consultas a tamanhos gerenciáveis e previsíveis.

Um exemplo comum de `getProgramAccounts` envolve a interação com o [Programa de Tokens SPL](https://spl.solana.com/token). Solicitar todas as contas de propriedade do Programa de Tokens com uma [chamada básica](../references/accounts.md#get-program-accounts) envolveria uma enorme quantidade de dados. No entanto, fornecendo parâmetros, podemos solicitar eficientemente apenas os dados que pretendemos usar.

### `filters`
O parâmetro mais comum a ser usado com `getProgramAccounts` é o array `filters`. Este array aceita dois tipos de filtros, `dataSize` e `memcmp`. Antes de usar qualquer um desses filtros, devemos estar familiarizados com a forma como os dados que estamos solicitando são organizados e serializados.

#### `dataSize`
No caso do Programa de Tokens, podemos ver que [as contas de token têm 165 bytes de comprimento](https://github.com/solana-labs/solana-program-library/blob/08d9999f997a8bf38719679be9d572f119d0d960/token/program/src/state.rs#L86-L106). Especificamente, uma conta de token tem oito campos diferentes, e cada campo requer um número previsível de bytes. Podemos visualizar como esses dados estão organizados usando a ilustração abaixo.

![Tamanho da Conta](./get-program-accounts/account-size.png)

Se quisermos encontrar todas as contas de token de propriedade do nosso endereço de carteira, podemos adicionar `{dataSize: 165}` ao nosso array `filters` para reduzir o escopo da nossa consulta apenas para as contas que têm exatamente 165 bytes de comprimento. No entanto, isso por si só seria insuficiente. Também precisaríamos adicionar um filtro que procurasse contas de propriedade do nosso endereço. Podemos alcançar isso com o filtro `memcmp`.

#### `memcmp`
O filtro `memcmp`, ou filtro de "comparação de memória", nos permite comparar dados em qualquer campo armazenado em nossa conta. Especificamente, podemos consultar apenas as contas que correspondem a um determinado conjunto de bytes em uma posição específica. `memcmp` requer dois argumentos:

- `offset`: A posição onde iniciar a comparação dos dados. Essa posição é medida em bytes e é expressa como um número inteiro.
- `bytes`: Os dados que devem corresponder aos dados da conta. Isso é representado como uma string codificada em base58 e deve ser limitado a menos de 129 bytes.

É importante observar que `memcmp` somente retornará resultados que correspondem exatamente aos `bytes`. Atualmente, ele não oferece suporte a comparações para valores menores ou maiores que os `bytes` que fornecemos.

Seguindo com nosso exemplo do Programa de Tokens, podemos modificar nossa consulta para retornar somente contas de token que são de propriedade do nosso endereço de carteira. Ao olhar para uma conta de token, podemos ver que os dois primeiros campos armazenados em uma conta de token são chaves públicas e cada chave pública tem 32 bytes de comprimento. Dado que `owner` é o segundo campo, devemos iniciar nosso `memcmp` em um `offset` de 32 bytes. A partir daqui, estaremos procurando por contas cujo campo de proprietário corresponda ao nosso endereço de carteira.

![Tamanho da Conta](./get-program-accounts/memcmp.png)

Podemos invocar essa consulta por meio do exemplo a seguir:

<CodeGroup>
  <CodeGroupItem title="TS" active>

@[code](@/code/get-program-accounts/memcmp/memcmp.en.ts)

  </CodeGroupItem>

  <CodeGroupItem title="Rust Client" active>

@[code](@/code/get-program-accounts/memcmp/memcmp.en.rs)

  </CodeGroupItem>

  <CodeGroupItem title="cURL" active>

@[code](@/code/get-program-accounts/memcmp/memcmp.en.sh)

  </CodeGroupItem>
</CodeGroup>

### `dataSlice`
Fora dos dois parâmetros de filtro, o terceiro parâmetro mais comum para `getProgramAccounts` é `dataSlice`. Ao contrário do parâmetro `filters`, o `dataSlice` não reduzirá o número de contas retornadas por uma consulta. Em vez disso, o `dataSlice` limitará a quantidade de dados para cada conta.

Assim como o `memcmp`, o `dataSlice` aceita dois argumentos:

- `offset`: A posição (em número de bytes) onde iniciar o retorno dos dados da conta
- `length`: O número de bytes que devem ser retornados

O `dataSlice` é particularmente útil quando executamos consultas em um grande conjunto de dados, mas na verdade não nos importamos com os dados da conta em si. Um exemplo disso seria se quiséssemos encontrar o número de contas de token (ou seja, número de detentores de token) para uma determinada cunhagem de tokens.

<CodeGroup>
  <CodeGroupItem title="TS" active>

@[code](@/code/get-program-accounts/dataSlice/dataSlice.en.ts)

  </CodeGroupItem>

  <CodeGroupItem title="Rust Client" active>

@[code](@/code/get-program-accounts/dataSlice/dataSlice.en.rs)

  </CodeGroupItem>

  <CodeGroupItem title="cURL" active>

@[code](@/code/get-program-accounts/dataSlice/dataSlice.en.sh)

  </CodeGroupItem>
</CodeGroup>

Ao combinar os três parâmetros  (`dataSlice`, `dataSize`, e `memcmp`), podemos limitar o escopo da nossa consulta e retornar eficientemente apenas os dados que nos interessam.

## Outros recursos

- [Documentação da API RPC](https://docs.solana.com/developing/clients/jsonrpc-api#getprogramaccounts)
- [Documentação do Web3js](https://solana-labs.github.io/solana-web3.js/classes/Connection.html#getProgramAccounts)
- [Documentação do Web3js analisado em JSON](https://solana-labs.github.io/solana-web3.js/classes/Connection.html#getParsedProgramAccounts)
