---
title: Escrevendo Programas
head:
  - - meta
    - name: title
      content: Livro de Receitas da Solana - Solana Cookbook | Referências de Programas da Solana
  - - meta
    - name: og:title
      content: Livro de Receitas da Solana - Solana Cookbook | Referências de Programas da Solana
  - - meta
    - name: description
      content: Aprenda como escrever programas na Solana, com referências sobre a invocação de programas cruzados, leitura de contas e muito mais.
  - - meta
    - name: og:description
      content: Aprenda como escrever programas na Solana, com referências sobre a invocação de programas cruzados, leitura de contas e muito mais.
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

# Escrevendo Programas

## Como transferir SOL em um programa

Seu programa Solana pode transferir lamports de uma conta para outra sem 'invocar' o programa do Sistema. A regra fundamental é que seu programa pode transferir lamports de qualquer conta possuída pelo seu programa para qualquer outra conta.

A conta receptora *não precisa ser* uma conta possuída pelo seu programa.

<CodeGroup>
  <CodeGroupItem title="Program">

@[code](@/code/programs/transferring-lamports/transferring-lamports.rs)

  </CodeGroupItem>
</CodeGroup>

## Como obter o relógio (clock) em um programa

Obter um relógio pode ser feito de duas maneiras:

1. Passando `SYSVAR_CLOCK_PUBKEY` em uma instrução
2. Acessando o relógio diretamente dentro de uma instrução

É bom saber os dois métodos, porque alguns programas legados ainda esperam que o `SYSVAR_CLOCK_PUBKEY` seja uma conta.

### Passando o Relógio como uma conta dentro de uma instrução

Vamos criar uma instrução que recebe uma conta para inicializar e a chave pública do sysvar.

<SolanaCodeGroup>
  <SolanaCodeGroupItem title="Rust" active>

  <template v-slot:default>

@[code](@/code/programs/get-clock/method-one/program/src/lib.rs)

  </template>

  <template v-slot:preview>

@[code](@/code/programs/get-clock/method-one/program/src/lib.preview.rs)

  </template>

  </SolanaCodeGroupItem>
</SolanaCodeGroup>

Agora passamos o endereço público do sysvar do relógio por meio do cliente.

<SolanaCodeGroup>
  <SolanaCodeGroupItem title="TS" active>

  <template v-slot:default>

@[code](@/code/programs/get-clock/method-one/client/main.en.ts)

  </template>

  <template v-slot:preview>

@[code](@/code/programs/get-clock/method-one/client/main.preview.en.ts)

  </template>

  </SolanaCodeGroupItem>
</SolanaCodeGroup>

### Acessando o Relógio diretamente dentro de uma instrução

Vamos criar a mesma instrução, mas sem esperar o `SYSVAR_CLOCK_PUBKEY` do lado do cliente.

<SolanaCodeGroup>
  <SolanaCodeGroupItem title="Rust" active>

  <template v-slot:default>

@[code](@/code/programs/get-clock/method-two/program/src/lib.rs)

  </template>

  <template v-slot:preview>

@[code](@/code/programs/get-clock/method-two/program/src/lib.preview.rs)

  </template>

  </SolanaCodeGroupItem>
</SolanaCodeGroup>

A instrução do lado do cliente agora só precisa passar as contas de estado e de pagamento.

<SolanaCodeGroup>
  <SolanaCodeGroupItem title="TS" active>

  <template v-slot:default>

@[code](@/code/programs/get-clock/method-two/client/main.en.ts)

  </template>

  <template v-slot:preview>

@[code](@/code/programs/get-clock/method-two/client/main.preview.en.ts)

  </template>

  </SolanaCodeGroupItem>
</SolanaCodeGroup>

## Como alterar o tamanho da conta

Você pode alterar o tamanho de uma conta de propriedade do programa usando a função `realloc`. `realloc` pode redimensionar uma conta de até 10KB. Quando você usa `realloc` para aumentar o tamanho de uma conta, deve transferir lamports para manter essa conta isenta de aluguel.

<SolanaCodeGroup>
  <SolanaCodeGroupItem title="Rust" active>

  <template v-slot:default>

@[code](@/code/programs/realloc/realloc.en.rs)

  </template>

  <template v-slot:preview>

@[code](@/code/programs/realloc/realloc.preview.en.rs)

  </template>

  </SolanaCodeGroupItem>
</SolanaCodeGroup>

## Como fazer uma Invocação de Programas Cruzados

Uma invocação de programas cruzados, em poucas palavras, é chamar a instrução de outro programa dentro do nosso programa. Um dos melhores exemplos é a funcionalidade de `swap`, ou troca, da Uniswap. O contrato `UniswapV2Router` chama a lógica necessária para a troca e chama a função de transferência do contrato `ERC20` para trocar de uma pessoa para outra. Da mesma forma, podemos chamar a instrução de um programa para ter uma infinidade de propósitos.

Vamos dar uma olhada em nosso primeiro exemplo, que é a instrução de transferência do programa de tokens SPL (`SPL Token Program's transfer`). As contas necessárias para que ocorra uma transferência são:

1. A conta de token de origem (a conta na qual estamos mantendo nossos tokens)
2. A conta de token de destino (a conta para a qual estaremos transferindo nossos tokens)
3. O titular da conta de token de origem (nosso endereço de carteira pelo qual estaríamos assinando)

<SolanaCodeGroup>
  <SolanaCodeGroupItem title="Rust" active>

  <template v-slot:default>

@[code](@/code/programs/cpi-transfer/program/src/lib.rs)

  </template>

  <template v-slot:preview>

@[code](@/code/programs/cpi-transfer/program/src/lib.preview.rs)

  </template>

  </SolanaCodeGroupItem>
</SolanaCodeGroup>
<br />
A instrução do lado do cliente correspondente seria a seguinte. Para saber as instruções de cunhagem e criação de tokens, consulte o código completo nas proximidades.
<br />
<br />
<SolanaCodeGroup>
  <SolanaCodeGroupItem title="TS" active>

  <template v-slot:default>

@[code](@/code/programs/cpi-transfer/client/main.en.ts)

  </template>

  <template v-slot:preview>

@[code](@/code/programs/cpi-transfer/client/main.preview.en.ts)

  </template>

  </SolanaCodeGroupItem>
</SolanaCodeGroup>

Agora vamos dar uma olhada em outro exemplo, que é a instrução de criação de conta do programa do Sistema (`System Program's create_account`). Há uma pequena diferença entre a instrução mencionada acima e esta. Lá, nunca foi necessário passar o `token_program` como uma das contas dentro da função `invoke`. No entanto, há exceções em que você precisa passar o `program_id` da instrução invocadora. Em nosso caso, seria o `program_id` do programa do Sistema ("11111111111111111111111111111111"). Agora as contas necessárias serão:

1. A conta pagadora que financia o aluguel
2. A conta que vai ser criada
3. A conta do programa do Sistema

<SolanaCodeGroup>
  <SolanaCodeGroupItem title="Rust" active>

  <template v-slot:default>

@[code](@/code/programs/cpi-transfer/program-system/src/lib.rs)

  </template>

  <template v-slot:preview>

@[code](@/code/programs/cpi-transfer/program-system/src/lib.preview.rs)

  </template>

  </SolanaCodeGroupItem>
</SolanaCodeGroup>

O código do lado do cliente correspondente ficará assim:

<SolanaCodeGroup>
  <SolanaCodeGroupItem title="TS" active>

  <template v-slot:default>

@[code](@/code/programs/cpi-transfer/client-system/main.en.ts)

  </template>

  <template v-slot:preview>

@[code](@/code/programs/cpi-transfer/client-system/main.preview.en.ts)

  </template>

  </SolanaCodeGroupItem>
</SolanaCodeGroup>

## Como criar um PDA

Um Endereço Derivado de Programa (PDA) é simplesmente uma conta de propriedade do programa, mas que não tem uma chave privada. Em vez disso, sua assinatura é obtida por um conjunto de sementes e um bump (um nonce que garante que ele está fora da curva). "**Gerar**" um endereço de programa é diferente de "**criá-lo**". Pode-se gerar um PDA usando `Pubkey::find_program_address`. Criar um PDA significa essencialmente inicializar o endereço com espaço e definir o estado para ele. Uma conta de par de chaves (Keypair) normal pode ser criada fora de nosso programa e depois alimentada para inicializar seu estado. Infelizmente, para os PDAs, isso deve ser criado na cadeia, devido à natureza de não poder assinar em nome de si mesmo. Portanto, usamos `invoke_signed` para passar as sementes do PDA, juntamente com a assinatura da conta de financiamento, o que resulta na criação de uma conta de PDA.

<SolanaCodeGroup>
  <SolanaCodeGroupItem title="Rust" active>

  <template v-slot:default>

@[code](@/code/programs/create-pda/program/src/lib.rs)

  </template>

  <template v-slot:preview>

@[code](@/code/programs/create-pda/program/src/lib.preview.rs)

  </template>

  </SolanaCodeGroupItem>
</SolanaCodeGroup>

Podemos enviar as contas necessárias por meio do cliente da seguinte forma:

<SolanaCodeGroup>
  <SolanaCodeGroupItem title="TS" active>

  <template v-slot:default>

@[code](@/code/programs/create-pda/client/main.en.ts)

  </template>

  <template v-slot:preview>

@[code](@/code/programs/create-pda/client/main.preview.en.ts)

  </template>

  </SolanaCodeGroupItem>
</SolanaCodeGroup>

## Como ler contas

Quase todas as instruções na Solana exigem pelo menos 2 a 3 contas, e elas são mencionadas nos manipuladores de instruções sobre em que ordem a instrução espera aquele conjunto de contas. É bem simples se aproveitarmos o método `iter()` do Rust, em vez de indicar manualmente as contas. O método `next_account_info` basicamente corta o primeiro índice do iterável e retorna a conta presente dentro do array de contas. Vamos ver uma instrução simples que espera um conjunto de contas e exige que cada uma delas seja analisada.

<SolanaCodeGroup>
  <SolanaCodeGroupItem title="Rust" active>

  <template v-slot:default>

@[code](@/code/programs/read-account/program/src/lib.rs)

  </template>

  <template v-slot:preview>

@[code](@/code/programs/read-account/program/src/lib.preview.rs)

  </template>

  </SolanaCodeGroupItem>
</SolanaCodeGroup>

## Como verificar contas

Como os programas na Solana são sem estado, nós, como criadores de programas, temos que garantir que as contas passadas sejam validadas o máximo possível para evitar qualquer entrada maliciosa na conta. As verificações básicas que podemos fazer são:

1. Verificar se a conta do signatário esperado realmente assinou
2. Verificar se as contas de estado esperadas foram verificadas como graváveis
3. Verificar se o proprietário das contas de estado esperadas é o ID do programa chamado
4. Se estiver inicializando o estado pela primeira vez, verifique se a conta já foi inicializada ou não
5. Verificar se os IDs de programa cruzados passados (sempre que necessário) estão como esperado

Uma instrução básica que inicializa uma conta de estado "herói" (hero state account), mas com as verificações mencionadas acima, é definida abaixo:

<SolanaCodeGroup>
  <SolanaCodeGroupItem title="Rust" active>

  <template v-slot:default>

@[code](@/code/programs/verify-account/program/src/lib.rs)

  </template>

  <template v-slot:preview>

@[code](@/code/programs/verify-account/program/src/lib.preview.rs)

  </template>

  </SolanaCodeGroupItem>
</SolanaCodeGroup>

## Como ler várias instruções de uma transação

A Solana nos permite verificar todas as instruções na transação atual. Podemos armazená-las em uma variável e iterar sobre elas. Podemos fazer muitas coisas com isso, como verificar transações suspeitas.

<SolanaCodeGroup>
  <SolanaCodeGroupItem title="Rust" active>

  <template v-slot:default>

@[code](@/code/programs/read-multiple-instructions/program/lib.rs)

  </template>

  <template v-slot:preview>
  
@[code](@/code/programs/read-multiple-instructions/program/lib.preview.rs)

  </template>

  </SolanaCodeGroupItem>
</SolanaCodeGroup>
