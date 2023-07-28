---
title: Reenviando Transações
head:
  - - meta
    - name: title
      content: Livro de Receitas da Solana - Solana Cookbook | Reenviando Transações
  - - meta
    - name: og:title
      content: Livro de Receitas da Solana - Solana Cookbook | Reenviando Transações
  - - meta
    - name: description
      content: Em algumas ocasiões, uma transação aparentemente válida pode ser descartada antes de ser incluída em um bloco. Para combater isso, os desenvolvedores de aplicativos podem desenvolver sua própria lógica personalizada de retransmissão. Saiba mais sobre como reenviar transações e outros tópicos no Livro de Receitas da Solana.
  - - meta
    - name: og:description
      content: Em algumas ocasiões, uma transação aparentemente válida pode ser descartada antes de ser incluída em um bloco. Para combater isso, os desenvolvedores de aplicativos podem desenvolver sua própria lógica personalizada de retransmissão. Saiba mais sobre como reenviar transações e outros tópicos no Livro de Receitas da Solana.
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

# Reenviando Transações

Em algumas ocasiões, uma transação aparentemente válida pode ser descartada antes de ser incluída em um bloco. Isso ocorre mais frequentemente durante períodos de congestão de rede, quando um nó RPC falha ao retransmitir a transação para o [líder](https://docs.solana.com/terminology#leader). Para um usuário final, pode parecer que sua transação desapareceu completamente. Embora os nós RPC estejam equipados com um algoritmo genérico de retransmissão, os desenvolvedores de aplicativos também são capazes de desenvolver sua própria lógica de retransmissão personalizada.

## Fatos

::: tip Ficha Informativa
- Os nós RPC tentarão retransmitir transações usando um algoritmo genérico
- Os desenvolvedores de aplicativos podem implementar sua própria lógica de retransmissão personalizada
- Os desenvolvedores devem aproveitar o parâmetro `maxRetries` no método JSON-RPC `sendTransaction`
- Os desenvolvedores devem habilitar as verificações prévias para gerar erros antes que as transações sejam enviadas
- Antes de reassinar qualquer transação, é muito importante garantir que o hash do bloco (blockhash) da transação inicial tenha expirado
:::

## A Jornada de Uma Transação

### Como os Clientes Enviam Transações

Na Solana, não há conceito de mempool. Todas as transações, sejam elas iniciadas programaticamente ou por um usuário final, são encaminhadas de forma eficiente para os líderes para que possam ser processadas em um bloco. Existem duas maneiras principais pelas quais uma transação pode ser enviada para líderes:
1. Por proxy via um servidor RPC e o método JSON-RPC [sendTransaction](https://docs.solana.com/developing/clients/jsonrpc-api#sendtransaction)
2. Diretamente para os líderes por meio de um [cliente TPU](https://docs.rs/solana-client/1.7.3/solana_client/tpu_client/index.html)

A grande maioria dos usuários finais enviará transações por meio de um servidor RPC. Quando um cliente envia uma transação, o nó RPC receptor tentará transmitir a transação para os líderes atuais e próximos. Até que a transação seja processada por um líder, não há registro da transação fora do que o cliente e os nós RPC de retransmissão estão cientes. No caso de um cliente TPU, a retransmissão e o encaminhamento para líderes são tratados inteiramente pelo software do cliente.

![Jornada da Transação](./retrying-transactions/tx-journey.png)

### Como os Nós RPC Transmitem Transações

Após receber uma transação via `sendTransaction`, um nó RPC a converte em um pacote [UDP](https://en.wikipedia.org/wiki/User_Datagram_Protocol) antes de encaminhá-la para os líderes relevantes. O UDP permite que os validadores se comuniquem rapidamente entre si, mas não fornece garantias quanto à entrega da transação.

Como o cronograma de líderes da Solana é conhecido antecipadamente a cada [época](https://docs.solana.com/terminology#epoch) (~2 dias), um nó RPC transmitirá sua transação diretamente aos líderes atuais e futuros. Isso difere de outros protocolos de fofoca (gossip protocols), como a Ethereum, que propagam transações aleatória e amplamente em toda a rede. Por padrão, os nós RPC tentarão encaminhar transações aos líderes a cada dois segundos até que a transação seja finalizada ou o hash do bloco da transação expire (150 blocos ou ~1 minuto e 19 segundos a partir do momento desta escrita). Se o tamanho da fila de retransmissão pendente for maior que [10.000 transações](https://github.com/solana-labs/solana/blob/bfbbc53dac93b3a5c6be9b4b65f679fdb13e41d9/send-transaction-service/src/send_transaction_service.rs#L20), as transações recém-enviadas serão descartadas. Existem [argumentos](https://github.com/solana-labs/solana/blob/bfbbc53dac93b3a5c6be9b4b65f679fdb13e41d9/validator/src/main.rs#L1172) de linha de comando que os operadores RPC podem ajustar para alterar o comportamento padrão dessa lógica de retransmissão.

Quando um nó RPC transmite uma transação, ele tentará encaminhá-la para a [Unidade de Processamento de Transação (Transaction Processing Unit, ou TPU)](https://github.com/solana-labs/solana/blob/cd6f931223181d5a1d47cba64e857785a175a760/core/src/validator.rs#L867) de um líder. A TPU processa as transações em cinco estágios distintos: 
- [Estágio de Busca (Fetch Stage)](https://github.com/solana-labs/solana/blob/cd6f931223181d5a1d47cba64e857785a175a760/core/src/fetch_stage.rs#L21)
- [Estágio de Verificação de Assinatura (SigVerify Stage)](https://github.com/solana-labs/solana/blob/cd6f931223181d5a1d47cba64e857785a175a760/core/src/tpu.rs#L91)
- [Estágio de Contabilidade (Banking Stage)](https://github.com/solana-labs/solana/blob/cd6f931223181d5a1d47cba64e857785a175a760/core/src/banking_stage.rs#L249)
- [Serviço de Prova de Histórico (Proof-of-History Service)](https://github.com/solana-labs/solana/blob/cd6f931223181d5a1d47cba64e857785a175a760/poh/src/poh_service.rs)
- [Estágio de Transmissão (Broadcast Stage)](https://github.com/solana-labs/solana/blob/cd6f931223181d5a1d47cba64e857785a175a760/core/src/tpu.rs#L136)

![Visão Geral da TPU](./retrying-transactions/tpu-jito-labs.png)
<small style="display:block;text-align:center;">Cortesia da imagem de Jito Labs</small>

Dos cinco estágios, o Estágio de Busca é responsável por receber transações. Dentro do Estágio de Busca, os validadores categorizam as transações recebidas em três portas:
- A porta [tpu](https://github.com/solana-labs/solana/blob/cd6f931223181d5a1d47cba64e857785a175a760/gossip/src/contact_info.rs#L27) lida com transações regulares, como transferências de tokens, criação de NFTs e instruções de programas
- A porta [tpu_vote](https://github.com/solana-labs/solana/blob/cd6f931223181d5a1d47cba64e857785a175a760/gossip/src/contact_info.rs#L31) foca exclusivamente em transações de votação
- A porta [tpu_forwards](https://github.com/solana-labs/solana/blob/cd6f931223181d5a1d47cba64e857785a175a760/gossip/src/contact_info.rs#L29) encaminha pacotes não processados ​​para o próximo líder se o líder atual não puder processar todas as transações 

Para obter mais informações sobre a TPU, consulte [este excelente artigo da Jito Labs](https://jito-labs.medium.com/solana-validator-101-transaction-processing-90bcdc271143).

## Como as Transações são Descartadas

Durante a jornada de uma transação, há algumas situações em que ela pode ser descartada inadvertidamente da rede.

### Antes de uma transação ser processada

Se a rede descartar uma transação, é mais provável que isso ocorra antes que a transação seja processada por um líder. A [perda de pacotes](https://en.wikipedia.org/wiki/Packet_loss) UDP é o motivo mais simples pelo qual isso pode ocorrer. Durante períodos de carga de rede intensa, também é possível que os validadores fiquem sobrecarregados com o número excessivo de transações necessárias para o processamento. Embora os validadores sejam capazes de encaminhar transações excedentes via `tpu_forwards`, há um limite para a quantidade de dados que podem ser [encaminhados](https://github.com/solana-labs/solana/blob/master/core/src/banking_stage.rs#L389). Além disso, cada encaminhamento é limitado a um único salto entre validadores. Ou seja, as transações recebidas na porta `tpu_forwards` não são encaminhadas para outros validadores.

Existem também duas razões menos conhecidas pelas quais uma transação pode ser descartada antes de ser processada. O primeiro cenário envolve transações que são enviadas por meio de um pool RPC. Às vezes, parte do pool RPC pode estar suficientemente à frente do restante do pool. Isso pode causar problemas quando os nós dentro do pool são obrigados a trabalhar juntos. Nesse exemplo, o [hash do bloco mais recente (recentBlockhash)](https://docs.solana.com/developing/programming-model/transactions#recent-blockhash) da transação é consultado na parte avançada do pool (Backend A). Quando a transação é enviada para a parte atrasada do pool (Backend B), os nós não reconhecerão o hash do bloco mais avançado e descartarão a transação. Isso pode ser detectado durante o envio da transação se os desenvolvedores ativarem as [verificações prévias](https://docs.solana.com/developing/clients/jsonrpc-api#sendtransaction) em `sendTransaction`.

![Descartada por meio do pool RPC](./retrying-transactions/dropped-via-rpc-pool.png)

Bifurcações (Forks) temporárias na rede também podem resultar em transações descartadas. Se um validador for lento para retransmitir seus blocos dentro do estágio de contabilidade, ele pode acabar criando uma bifurcação minoritária. Quando um cliente constrói uma transação, é possível que a transação faça referência a um `recentBlockhash` que só existe na bifurcação minoritária. Depois que a transação é enviada, o cluster pode mudar da bifurcação minoritária antes que a transação seja processada. Nesse cenário, a transação é descartada devido à falta do hash do bloco.

![Descartada devido à Bifurcação Minoritária (Antes de Processada)](./retrying-transactions/dropped-minority-fork-pre-process.png)

### Depois que uma transação é processada e antes de ser finalizada

No caso de uma transação fazer referência a um `recentBlockhash` de uma bifurcação minoritária, ainda é possível que a transação seja processada. Nesse caso, no entanto, seria processada pelo líder da bifurcação minoritária. Quando esse líder tenta compartilhar suas transações processadas com o restante da rede, ele não conseguirá chegar a um consenso com a maioria dos validadores que não reconhecem a bifurcação minoritária. Nesse momento, a transação seria descartada antes de poder ser finalizada.

![Descartada devido à Bifurcação Minoritária (Depois de Processada)](./retrying-transactions/dropped-minority-fork-post-process.png)

## Manipulando Transações Descartadas

Enquanto os nós RPC tentarem retransmitir transações, o algoritmo que eles empregam é genérico e muitas vezes inadequado para as necessidades de aplicativos específicos. Para se preparar para momentos de congestionamento de rede, os desenvolvedores de aplicativos devem personalizar sua própria lógica de retransmissão.

### Uma Análise Detalhada de sendTransaction

Quando se trata de enviar transações, o método RPC `sendTransaction` é a principal ferramenta disponível para os desenvolvedores. O `sendTransaction` é responsável apenas por transmitir uma transação de um cliente para um nó RPC. Se o nó receber a transação, o `sendTransaction` retornará o ID da transação que pode ser usado para rastreá-la. Uma resposta bem-sucedida não indica se a transação será processada ou finalizada pelo cluster.

:::tip
#### Parâmetros de Requisição
- `transaction`: `string` - transação totalmente assinada, como uma string codificada
- (opcional) `configuration object`: `object` 
    - `skipPreflight`: `boolean` - se verdadeiro, pula as verificações prévias da transação (padrão: false)
    - (opcional) `preflightCommitment`: `string` - nível de [comprometimento](https://docs.solana.com/developing/clients/jsonrpc-api#configuring-state-commitment) a ser usado para simulações prévias do slot "bank" (padrão: "finalized")
    - (opcional) `encoding`: `string` - codificação usada para os dados da transação. Ou "base58" (lento) ou "base64" (padrão: "base58")
    - (opcional) `maxRetries`: `usize` - número máximo de tentativas para o nó RPC enviar novamente a transação ao líder. Se esse parâmetro não for fornecido, o nó RPC tentará enviar a transação novamente até que ela seja finalizada ou até que o hash do bloco expire

#### Resposta
- `transaction id`: `string` - primeira assinatura de transação incorporada na transação, como uma string codificada em base 58. Esse ID de transação pode ser usado com [getSignatureStatuses](https://docs.solana.com/developing/clients/jsonrpc-api#getsignaturestatuses) para fazer verificações de status da transação
:::

## Customizando a Lógica de Retransmissão

Para desenvolver sua própria lógica de retransmissão, os desenvolvedores devem aproveitar o parâmetro `maxRetries` do `sendTransaction`. Se fornecido, `maxRetries` substituirá a lógica de reenvio padrão do nó RPC, permitindo que os desenvolvedores controlem manualmente o processo de reenvio [dentro de limites razoáveis](https://github.com/solana-labs/solana/blob/98707baec2385a4f7114d2167ef6dfb1406f954f/validator/src/main.rs#L1258-L1274).

Um padrão comum para reenviar manualmente transações envolve armazenar temporariamente o `lastValidBlockHeight` que vem do [getLatestBlockhash](https://docs.solana.com/developing/clients/jsonrpc-api#getlatestblockhash). Uma vez armazenado, um aplicativo pode então [consultar a altura do bloco do cluster](https://docs.solana.com/developing/clients/jsonrpc-api#getblockheight) e tentar reenviar manualmente a transação em um intervalo apropriado. Em tempos de congestionamento de rede, é vantajoso definir `maxRetries` como 0 e retransmitir manualmente por meio de um algoritmo personalizado. Enquanto algumas aplicações podem empregar um algoritmo de [espera exponencial](https://en.wikipedia.org/wiki/Exponential_backoff), outras, como o [Mango](https://www.mango.markets/), optam por [reenviar continuamente](https://github.com/blockworks-foundation/mango-ui/blob/b6abfc6c13b71fc17ebbe766f50b8215fa1ec54f/src/utils/send.tsx#L713) as transações em um intervalo constante até que algum tempo limite tenha ocorrido.

<SolanaCodeGroup>
  <SolanaCodeGroupItem title="TS" active>

  <template v-slot:default>

@[code](@/code/retrying-transactions/retry.en.ts)

  </template>

  <template v-slot:preview>

@[code](@/code/retrying-transactions/retry.preview.en.ts)

  </template>

  </SolanaCodeGroupItem>
</SolanaCodeGroup>

Ao consultar através de `getLatestBlockhash`, os aplicativos devem especificar seu nível de [comprometimento](https://docs.solana.com/developing/clients/jsonrpc-api#configuring-state-commitment) pretendido. Ao definir seu comprometimento como `confirmed` (votado) ou `finalized` (~30 blocos após confirmado), um aplicativo pode evitar consultar um hash de bloco de uma bifurcação minoritária.

Se um aplicativo tiver acesso a nós RPC atrás de um balanceador de carga, ele também poderá escolher dividir sua carga de trabalho entre nós específicos. Nós RPC que atendem a solicitações intensivas de dados, como [getProgramAccounts](./get-program-accounts.md), podem ficar para trás e não ser adequados para encaminhar também transações. Para aplicativos que lidam com transações sensíveis ao tempo, pode ser prudente ter nós dedicados que lidem apenas com o `sendTransaction`.

### O Custo de Pular a Verificação Prévia

Por padrão, `sendTransaction` realizará três verificações prévias antes de enviar uma transação. Especificamente, `sendTransaction` irá:
- Verificar se todas as assinaturas são válidas
- Verificar se o hash do bloco referenciado está dentro dos últimos 150 blocos
- Simular a transação no slot "bank" especificado pelo `preflightCommitment`

No caso de qualquer uma dessas três verificações prévias falhar, `sendTransaction` emitirá um erro antes de enviar a transação. Verificações prévias podem muitas vezes ser a diferença entre perder uma transação e permitir que um cliente trate um erro de forma adequada. Para garantir que esses erros comuns sejam considerados, é recomendado que os desenvolvedores mantenham `skipPreflight` definido como `false`.

### Quando Reassinar Transações

Apesar de todas as tentativas de retransmitir, pode haver momentos em que um cliente precise reassinar uma transação. Antes de reassinar qualquer transação, é **muito importante** garantir que o hash do bloco inicial da transação tenha expirado. Se o hash do bloco inicial ainda for válido, é possível que ambas as transações sejam aceitas pela rede. Para um usuário final, isso pareceria como se tivessem enviado inadvertidamente a mesma transação duas vezes.

Na Solana, uma transação descartada pode ser descartada com segurança assim que o hash do bloco que ela referenciou for mais antigo do que `lastValidBlockHeight` recebido de `getLatestBlockhash`. Os desenvolvedores devem acompanhar `lastValidBlockHeight` consultando [`getEpochInfo`](https://docs.solana.com/developing/clients/jsonrpc-api#getepochinfo) e comparando com `blockHeight` na resposta. Assim que um hash de bloco for invalidado, os clientes podem reassinar com um novo hash de bloco consultado.

## Agradecimentos

Muito obrigado a Trent Nelson, [Jacob Creech](https://twitter.com/jacobvcreech), White Tiger, Le Yafo, [Buffalu](https://twitter.com/buffalu__) e [Jito Labs](https://twitter.com/jito_labs) por sua revisão e feedback.
