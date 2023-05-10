---
title: Transações Versionadas
head:
  - - meta
    - name: title
      content: Livro de Receitas da Solana - Solana Cookbook | Transações Versionadas
  - - meta
    - name: og:title
      content: Livro de Receitas da Solana - Solana Cookbook | Transações Versionadas
  - - meta
    - name: description
      content: Formato novo e aprimorado de transações na Solana.
  - - meta
    - name: og:description
      content: Formato novo e aprimorado de transações na Solana.
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

# Transações Versionadas

A Solana lançou recentemente as "Transações Versionadas". As mudanças propostas são as seguintes:

1. Introdução de um novo programa que gerencia tabelas de pesquisa de endereços na cadeia
    
2. Adição de um novo formato de transação que pode utilizar as tabelas de pesquisa de endereços na cadeia

## Fatos

::: tip Ficha Informativa
- As Transações legadas (legacy) da Solana têm um problema importante: o tamanho máximo permitido é de 1232 bytes, o que limita o número de contas que podem ser incluídas em uma transação atômica a 35 endereços.
- As Tabelas de Pesquisa de Endereços (Address Lookup Tables, ou LUTs): Depois que as contas são armazenadas em uma tabela LUT, o endereço da tabela pode ser referenciado em uma mensagem de transação usando índices u8 de 1 byte.
- A função `createLookupTable()` do `solana/web3.js` pode ser usada para construir uma nova tabela de pesquisa, bem como determinar seu endereço. 
- Uma vez criada uma LUT, ela pode ser estendida, ou seja, contas podem ser adicionadas à tabela.
- As Transações Versionadas mudam a estrutura das transações legadas para incorporar as LUTs.
- Antes da introdução do versionamento, as transações deixavam um bit superior não utilizado no primeiro byte de seus cabeçalhos, que agora pode ser usado para declarar explicitamente a versão das transações.
:::

Vamos falar mais sobre as mudanças introduzidas acima e o que elas significam para os desenvolvedores. No entanto, para entender melhor as mudanças, precisamos primeiro entender a anatomia de uma transação regular (ou legada).

## Transação Legada

A rede Solana usa um tamanho máximo de unidade transacional (MTU) de 1280 bytes, em conformidade com as restrições de tamanho do [MTU IPv6](https://en.wikipedia.org/wiki/IPv6_packet) para garantir velocidade e confiabilidade. Isso deixa **1232 bytes** para dados do pacote, como transações serializadas.

Uma transação é composta por:

1. Um array compacto de assinaturas, onde cada assinatura é um [ed25519](https://ed25519.cr.yp.to/) de 64 bytes  
2. Uma mensagem (legada)
    

![Formato da Transação](./versioned-transactions/tx_format.png)

::: tip Formato de Array Compacto
 
Um array compacto é um array serializado que tem os seguintes componentes:
 
1. O comprimento do array em uma codificação de vários bytes chamada [Compact-u16](https://beta.docs.solana.com/developing/programming-model/transactions#compact-u16-format)
2. Seguido de cada item do array 

![Formato do Array Compacto](./versioned-transactions/compact_array_format.png)
:::

## Mensagem Legada

Uma Mensagem Legada tem os seguintes componentes:

1. Um cabeçalho
2. Um array compacto de endereços de conta, onde cada endereço de conta ocupa 32 bytes
3. Um hash de bloco recente
  * um hash SHA-256 de 32 bytes usado para indicar quando o livro-razão foi visitado pela última vez. Se um hash de bloco for muito antigo, os validadores o rejeitarão.
4. Um array compacto de instruções
    
![Mensagem Legada](./versioned-transactions/legacy_message.png)

### Cabeçalho

O cabeçalho da mensagem tem 3 bytes de comprimento e contém 3 inteiros u8:

1. O número de assinaturas necessárias: o tempo de execução da Solana verifica este número com o comprimento do array compacto de assinaturas na transação.
2. O número de endereços de contas somente leitura que exigem assinaturas.
3. O número de endereços de contas somente leitura que não exigem assinaturas.
    
![Cabeçalho da Mensagem](./versioned-transactions/message_header.png)

### Array compacto de endereços de conta

Este array compacto começa com uma codificação compact-u16 do número de endereços de conta, seguido por:

1. **Endereços de conta que exigem assinaturas**: os endereços que solicitam acesso de leitura e gravação são listados primeiro, seguidos pelos que solicitam acesso somente de leitura
2. **Endereços de conta que não exigem assinaturas**: mesmo que acima, os endereços que solicitam acesso de leitura e gravação são listados primeiro, seguidos pelos que solicitam acesso somente de leitura
    
![Array compacto de endereços de conta](./versioned-transactions/compat_array_of_account_addresses.png)

### Array compacto de instruções

Assim como o array de endereços de conta, este array compacto começa com uma codificação compact-u16 do número de instruções, seguido por um array de instruções. Cada instrução no array tem os seguintes componentes:

1. **ID do programa**: identifica um programa na cadeia que processará a instrução. Isso é representado como um índice u8 para um endereço no array compacto de endereços de conta dentro da mensagem.   
2. **Array compacto de índices de endereços de conta**: índices u8 para um subconjunto de endereços de conta no array compacto de endereços de conta, que exigem assinaturas.
3. **Array compacto de dados u8 opacos**: um array de bytes de propósito geral que é específico para o ID do programa mencionado anteriormente. Este array de dados especifica quaisquer operações que o programa deve realizar e qualquer informação adicional que as contas podem não conter.
    
![Array compacto de instruções](./versioned-transactions/compact_array_of_ixs.png)

## Problemas com as Transações Legadas

Qual é o problema com o modelo de transação acima?

**O tamanho máximo de uma transação, e consequentemente o número de contas que podem caber em uma única transação atômica.**

Como discutido anteriormente, o tamanho máximo permitido de uma transação é de **1232 bytes**. O tamanho de um endereço de conta é de 32 bytes. Assim, uma transação pode no máximo armazenar **35 contas**, levando em consideração algum espaço para cabeçalhos, assinaturas e outros metadados.

![Problemas com as Transações Legadas](./versioned-transactions/issues_with_legacy_txs.png)

Isso é problemático, já que há vários casos em que os desenvolvedores precisam incluir centenas de contas sem assinatura em uma única transação. Isso atualmente não é possível com o modelo de transação legada. A solução atualmente utilizada é armazenar temporariamente o estado na cadeia e consumi-lo posteriormente em transações. Essa solução alternativa não funciona quando vários programas precisam ser compostos em uma única transação. Cada programa requer várias contas como entrada e, portanto, caímos no mesmo problema de antes.

É aqui que as **Tabelas de Pesquisa de Endereços (LUT)** são introduzidas.

## Tabelas de Pesquisa de Endereços (LUT)

A ideia por trás das Tabelas de Pesquisa de Endereços é armazenar endereços de contas em uma estrutura de dados em forma de tabela (array) na cadeia. Uma vez que as contas são armazenadas nesta tabela, o endereço da tabela pode ser referenciado em uma mensagem de transação. Para apontar para uma conta individual dentro da tabela, é necessário um índice u8 de 1 byte.

![LUTs](./versioned-transactions/luts.png)

Isso libera espaço, já que os endereços não precisam mais ser armazenados dentro da mensagem da transação. Eles apenas precisam ser referenciados na forma de um índice dentro da tabela em forma de array. Isso leva a uma possibilidade de referenciar 2^8=**256** contas, já que as contas são referenciadas usando um índice u8.

As LUTs precisam estar isentas de aluguel ao serem inicializadas ou sempre que um novo endereço é adicionado à tabela. Os endereços podem ser adicionados a essa tabela por meio de um buffer na cadeia, ou diretamente anexando-os à tabela por meio da instrução `Extension`. Além disso, as LUTs podem armazenar metadados associados seguidos por um array compacto de contas. Abaixo, você pode ver a estrutura de uma típica Tabela de Pesquisa de Endereços.

![LUT Format](./versioned-transactions/lut_format.png)

Uma ponto de atenção importante das LUTs é que, como as pesquisas de endereço exigem sobrecarga extra durante o processamento da transação, elas geralmente incorrem em custos mais altos para uma transação.

## Transações Versionadas: Transação V0 (TransactionV0)

A estrutura da transação legada precisa ser modificada para incorporar as pesquisas de tabela de endereços. Essas mudanças não devem quebrar o processamento de transações na Solana, nem indicar quaisquer mudanças de formato para os programas invocados.

Para garantir o que foi descrito acima, é importante mencionar explicitamente o tipo de transação: `legacy` ou `versioned`. Como incluímos essas informações em uma transação?

Antes da introdução ao versionamento, as transações deixavam um bit superior não utilizado nos cabeçalhos de mensagem: `num_required_signatures`. Agora podemos usar esse bit para declarar explicitamente a versão de nossas transações.

```rust
pub enum VersionedMessage {
    Legacy(Message),
    V0(v0::Message),
}
```

Se o primeiro bit estiver definido, os bits restantes no primeiro byte codificarão um número de versão. A Solana está começando com a "Versão 0", que é a versão necessária para começar a usar as LUTs.

Se o primeiro bit não estiver definido, a transação será considerada uma "Transação Legada" e o restante do primeiro byte será tratado como o primeiro byte de uma Mensagem Legada codificada.

## Mensagem V0 (MessageV0)

A estrutura da nova Mensagem V0 é mais ou menos a mesma, exceto por duas pequenas, mas importantes mudanças:

1. **Cabeçalho da mensagem**: inalterado em relação à versão legada
2. **Array compacto de chaves de conta**: inalterado em relação à versão legada. Vamos denotar o array de índices apontando para elementos neste array como *array de índices A* (você verá por que estamos denominando isso em breve)
3. **Hash recente do bloco**: inalterado em relação à versão legada
4. **Array compacto de instruções**: mudança em relação à versão legada
5. **Array compacto de pesquisas de tabela de endereços**: introduzido na V0
    
![Mensagem v0](./versioned-transactions/messagev0.png)

Vamos discutir primeiro a estrutura do array compacto de pesquisas na tabela de endereços antes de vermos o que mudou no array de instruções.

### Array compacto de pesquisas na tabela de endereços

Essa estrutura introduz as Tabelas de Pesquisa de Endereços (LUT) em Transações Versionadas, permitindo assim o uso de LUTs para carregar mais contas somente leitura e graváveis em uma única transação.

O array compacto começa com uma codificação compact-u16 do número de pesquisas na tabela de endereços, seguido por um array de pesquisas na tabela de endereços. Cada pesquisa tem a seguinte estrutura:

1. **Chave da conta**: chave da conta da tabela de pesquisa de endereços.
2. **Índices graváveis**: array compacto de índices usados para carregar endereços de conta graváveis. Vamos denotar esse array como *array de índices B*.
3. **Índices somente leitura**: array compacto de índices usados para carregar endereços de conta somente leitura. Vamos denotar esse array como *array de índices C*.
    
![Array compacto de LUTs](./versioned-transactions/compact_array_of_luts.png)

Vamos ver agora quais mudanças foram feitas na estrutura do array compacto de instruções.

### Array compacto de instruções

Como discutido anteriormente, o array compacto de instruções legado armazena instruções legadas individuais que, por sua vez, armazenam o seguinte:

1. Índice do ID do programa   
2. Array compacto de índices de endereços de conta
3. Array compacto de dados opacos de 8 bits

A mudança na nova instrução não está na estrutura da instrução em si, mas no array sendo usado para obter índices para 1 e 2. Em transações legadas, é usado um subconjunto do array compacto A de contas armazenadas na mensagem, enquanto em Transações Versionadas, é usado um subconjunto do array combinado dos seguintes:

1. **array de índices A**: Array compacto de contas armazenadas na mensagem   
2. **array de índices B**: índices graváveis na tabela de pesquisa de endereços
3. **array de índices C**: índices somente leitura na tabela de pesquisa de endereços
    
![Novo array compacto de Instruções](./versioned-transactions/new_compact_array_of_ixs.png)

## Mudanças na RPC

As respostas de transações exigirão um novo campo de versão: `maxSupportedTransactionVersion` para indicar aos clientes qual estrutura de transação deve ser seguida para desserialização.

Os seguintes métodos precisam ser atualizados para evitar erros:

* `getTransaction`
* `getBlock`

O seguinte parâmetro precisa ser adicionado às solicitações:

`maxSupportedTransactionVersion: 0`

Se `maxSupportedTransactionVersion` não for adicionado explicitamente à solicitação, a versão da transação será revertida para `legacy`. Qualquer bloco que contenha uma transação versionada retornará um erro ao cliente no caso de uma transação legada.

Você pode definir isso por meio de solicitações formatadas em JSON para o ponto de extremidade RPC como abaixo:

```plaintext
curl http://localhost:8899 -X POST -H "Content-Type: application/json" -d \
'{"jsonrpc": "2.0", "id":1, "method": "getBlock", "params": [430, {
  "encoding":"json",
  "maxSupportedTransactionVersion":0,
  "transactionDetails":"full",
  "rewards":false
}]}'
```

Você também pode fazer o mesmo usando a biblioteca [`@solana/web3.js`](https://solana-labs.github.io/solana-web3.js/).

```js
// conecte-se ao cluster `devnet` e obtenha o `slot` atual
const connection = new web3.Connection(web3.clusterApiUrl("devnet"));
const slot = await connection.getSlot();

// obtenha o bloco mais recente (permitindo transações v0)
const block = await connection.getBlock(slot, {
  maxSupportedTransactionVersion: 0,
});

// obtenha uma transação específica (permitindo transações v0)
const getTx = await connection.getTransaction(
  "3jpoANiFeVGisWRY5UP648xRXs3iQasCHABPWRWnoEjeA93nc79WrnGgpgazjq4K9m8g2NJoyKoWBV1Kx5VmtwHQ",
  {
    maxSupportedTransactionVersion: 0,
  },
);
```

## Outros recursos
* [Como construir uma Transação Versionada](https://beta.docs.solana.com/developing/versioned-transactions#how-create-a-versioned-transaction)
* [Como construir uma Transação Versionada com pesquisa de endereço usando LUTs](https://beta.docs.solana.com/developing/lookup-tables#how-to-create-an-address-lookup-table)
* [Limitações das Transações Versionadas](https://beta.docs.solana.com/proposals/transactions-v2#limitations)
* [Preocupações de segurança das Transações Versionadas](https://beta.docs.solana.com/proposals/transactions-v2#security-concerns)
* [Soluções alternativas propostas para as Transações Versionadas](https://beta.docs.solana.com/proposals/transactions-v2#other-proposals)
    

## Referências
* [Proposta de Transações V2](https://beta.docs.solana.com/proposals/transactions-v2)
* [Desenvolvendo com as Transações Versionadas](https://beta.docs.solana.com/developing/versioned-transactions)