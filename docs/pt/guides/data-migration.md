---
title: Migrando Contas de Dados do Programa
head:
  - - meta
    - name: title
      content: Livro de Receitas da Solana - Solana Cookbook | Migração de Dados de Contas do Programa
  - - meta
    - name: og:title
      content: Livro de Receitas da Solana - Solana Cookbook | Migração de Dados de Contas do Programa
  - - meta
    - name: description
      content: Basicamente, versionar dados em suporte à migração significa criar uma referência única para uma coleção de dados. Essa referência pode assumir a forma de uma consulta, um ID ou também comumente um identificador de data e hora. Saiba mais sobre Serialização e outros ingredientes para o seu prato no Livro de Receitas da Solana.
  - - meta
    - name: og:description
      content: Basicamente, versionar dados em suporte à migração significa criar uma referência única para uma coleção de dados. Essa referência pode assumir a forma de uma consulta, um ID ou também comumente um identificador de data e hora. Saiba mais sobre Serialização e outros ingredientes para o seu prato no Livro de Receitas da Solana.
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

# Migrando Contas de Dados do Programa

## Como você pode migrar as contas de dados de um programa?

Quando você cria um programa, cada conta de dados associada a esse programa terá uma estrutura de dados específica. Se você precisar atualizar uma conta derivada de programa, acabará tendo várias contas derivadas de programa remanescentes com a estrutura antiga.

Com o versionamento de contas, você pode atualizar suas contas antigas para a nova estrutura.

:::tip Observação
Essa é apenas uma das muitas maneiras de migrar dados em Contas de Propriedade do Programa (Program Owned Accounts, ou POA).
:::

## Cenário

Para versionar e migrar nossos dados de conta, forneceremos um **ID** para cada conta. Esse ID nos permitirá identificar a versão da conta quando a passarmos para o programa e, assim, lidar com a conta corretamente.

Considere o seguinte estado de conta e programa:

<img src="./data-migration/pav1.png" alt="Program Account v1">

<SolanaCodeGroup>
  <SolanaCodeGroupItem title="Account" active>

  <template v-slot:default>

@[code](@/code/data-migration/account-v0.en.rs)

  </template>

  <template v-slot:preview>

@[code](@/code/data-migration/account-v0.preview.en.rs)

  </template>

  </SolanaCodeGroupItem>

<SolanaCodeGroupItem title="Instruction" active>

  <template v-slot:default>

@[code](@/code/data-migration/rust.instruction.en.rs)

  </template>

  <template v-slot:preview>

@[code](@/code/data-migration/rust.instruction.preview.en.rs)

  </template>

  </SolanaCodeGroupItem>

<SolanaCodeGroupItem title="Processor" active>

  <template v-slot:default>

@[code](@/code/data-migration/rust.processor.en.rs)

  </template>

  <template v-slot:preview>

@[code](@/code/data-migration/rust.processor.preview.en.rs)

  </template>

  </SolanaCodeGroupItem>

</SolanaCodeGroup>

Na nossa primeira versão de uma conta, estamos fazendo o seguinte:

| ID | Ação |
| - | - |
|1| Incluindo um campo 'versão de dados' em seus dados. Ele pode ser um ordinal simples que incrementa (por exemplo, u8) ou algo mais sofisticado
|2| Alocando espaço suficiente para o crescimento de dados
|3| Inicializando um número de constantes para serem usadas em versões do programa
|4| Adicionando uma função de atualização de conta dentro de `fn conversion_logic` para atualizações futuras

Vamos supor que agora queremos atualizar as contas do nosso programa para incluir um novo campo obrigatório, o campo `somestring`.

Se não alocamos espaço extra na conta anterior, não poderíamos atualizar a conta e ficaríamos presos.

## Atualizando a conta

Em nosso novo programa, queremos adicionar uma nova propriedade para o estado do conteúdo. As alterações que seguem mostram como utilizamos as construções iniciais do programa à medida que são utilizadas agora.

### 1. Adicionar lógica de conversão de conta

<SolanaCodeGroup>
  <SolanaCodeGroupItem title="Account">

  <template v-slot:default>

@[code](@/code/data-migration/account-v1.en.rs)

  </template>

  <template v-slot:preview>

@[code](@/code/data-migration/account-v1.preview.en.rs)

  </template>

  </SolanaCodeGroupItem>
</SolanaCodeGroup>

| Linha(s) | Observação |
| ------- | - |
| 6 | Adicionamos o `solana_program::borsh::try_from_slice_unchecked` da Solana para simplificar a leitura de subconjuntos de dados do bloco de dados maior
| 13-26| Aqui, preservamos a estrutura antiga de conteúdo, linha 24 do `AccountContentOld`, antes de estender o `AccountContentCurrent` a partir da linha 17
| 60 | Incrementamos a constante `DATA_VERSION`
| 71 | Agora temos uma versão 'anterior' e queremos saber o seu tamanho
| 86 | O toque final é adicionar a canalização para atualizar o estado de conteúdo anterior para o novo (atual) estado de conteúdo

Em seguida, atualizamos nossas instruções para adicionar uma nova para atualizar `somestring` e um processador para lidar com a nova instrução. Note que a 'atualização' da estrutura de dados está encapsulada atrás do `pack/unpack`.

<CodeGroup>
  <CodeGroupItem title="Instruction">

@[code](@/code/data-migration/rust.instruction1.en.rs)

  </CodeGroupItem>

  <CodeGroupItem title="Processor">

@[code](@/code/data-migration/rust.processor1.en.rs)

  </CodeGroupItem>
</CodeGroup>

Depois de construir e enviar uma instrução `VersionProgramInstruction::SetString(String)`, agora temos o seguinte layout de dados de conta 'atualizado':

<img src="./data-migration/pav2.png" alt="Program Account v2">

## Recursos

* [Especificação do Borsh](https://borsh.io/)
* [`try_from_slice_unchecked` da Solana](https://github.com/solana-labs/solana/blob/master/sdk/program/src/borsh.rs#L67)
* [Implementação de Referência](https://github.com/FrankC01/versioning-solana)