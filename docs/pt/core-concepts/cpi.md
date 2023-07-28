---
title: Invocações de Programas Cruzados (CPIs)
head:
  - - meta
    - name: title
      content: Livro de Receitas da Solana - Solana Cookbook | CPIs
  - - meta
    - name: og:title
      content: Livro de Receitas da Solana - Solana Cookbook | CPIs
  - - meta
    - name: description
      content: As CPIs permitem que programas chamem instruções em outros programas, permitindo a componibilidade dos programas Solana. Saiba mais sobre CPIs e outros Conceitos Principais no Livro de Receitas da Solana.
  - - meta
    - name: og:description
      content: As CPIs permitem que programas chamem instruções em outros programas, permitindo a componibilidade dos programas Solana. Saiba mais sobre CPIs e outros Conceitos Principais no Livro de Receitas da Solana.
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

# Invocações de Programas Cruzados (CPIs)

A Invocação de Programas Cruzados (Cross-Program Invocation, ou CPI) é uma chamada direta de um programa em outro, permitindo a componibilidade de programas Solana. Assim como qualquer cliente pode chamar qualquer programa usando o protocolo JSON-RPC, qualquer programa pode chamar outro programa via uma CPI. As CPIs essencialmente transformam todo o ecossistema Solana em uma única API gigante que está à disposição do desenvolvedor.

O objetivo desta seção é fornecer uma visão geral de alto nível das CPIs. Por favor, consulte os recursos vinculados abaixo para explicações mais detalhadas, exemplos e tutoriais passo a passo.

## Fatos

::: tip Ficha Informativa
- Uma Invocação de Programas Cruzados (CPI) é uma chamada de um programa para outro, visando uma instrução específica no programa que está sendo chamado
- As CPIs permitem que o programa chamador estenda seus privilégios de assinatura para o programa chamado
- Os programas podem executar CPIs usando `invoke` ou `invoke_signed` dentro de suas instruções
- `invoke` é usado quando todas as assinaturas necessárias estão acessíveis antes da invocação, sem a necessidade de PDAs atuarem como signatários.
- `invoke_signed` é usado quando PDAs do programa chamador são necessários como signatários na CPI
- Depois que uma CPI é feita para outro programa, o programa chamado pode fazer novas CPIs para outros programas, até uma profundidade máxima de 4
:::

## Mergulho Profundo

As Invocações de Programas Cruzados (CPIs) permitem a componibilidade de programas Solana, o que permite que os desenvolvedores utilizem e construam sobre as instruções de programas existentes.

Para executar CPIs, use a função [invoke](https://docs.rs/solana-program/latest/solana_program/program/fn.invoke.html) or [invoke_signed](https://docs.rs/solana-program/latest/solana_program/program/fn.invoke_signed.html) encontrada no crate `solana_program`.

```rust
// Usado quando não são necessárias assinaturas para PDAs
pub fn invoke(
    instruction: &Instruction,
    account_infos: &[AccountInfo<'_>]
) -> ProgramResult

// Usado quando um programa precisa fornecer uma 'assinatura' para um PDA, daí o parâmetro signer_seeds
pub fn invoke_signed(
    instruction: &Instruction,
    account_infos: &[AccountInfo<'_>],
    signers_seeds: &[&[&[u8]]]
) -> ProgramResult
```

Para fazer uma CPI, você deve especificar e construir uma instrução no programa que está sendo invocado e fornecer uma lista de contas necessárias para essa instrução. Se um PDA for necessário como signatário, `signers_seeds` também deve ser preenchido ao usar a função `invoke_signed`.

### CPI com `invoke`

A função `invoke` é usada ao fazer uma CPI que não requer que nenhum PDA atue como signatário. Ao fazer CPIs, o tempo de execução da Solana estende a assinatura original passada para um programa ao programa chamado.

```rust
invoke(
    &some_instruction,                           // instrução para invocar
    &[account_one.clone(), account_two.clone()], // contas exigidas por instrução
)?;
```

### CPI com `invoke_signed`

Para fazer uma CPI que requer um PDA como signatário, use a função `invoke_signed` e forneça as sementes necessárias para derivar o PDA exigido pelo programa chamador.

```rust
invoke_signed(
    &some_instruction,                   // instrução para invocar
    &[account_one.clone(), pda.clone()], // contas exigidas por instrução, em que a primeira conta é um PDA necessário como signatário
    &[signers_seeds],                    // sementes para derivar o PDA
)?;
```

Embora os PDAs não tenham chaves privadas próprias, eles ainda podem atuar como signatários em uma instrução por meio de uma CPI. Para verificar se um PDA pertence ao programa chamador, as sementes usadas para gerar o PDA necessário como signatário devem ser incluídas como `signers_seeds`.

O tempo de execução da Solana chamará internamente `create_program_address` usando as sementes fornecidas e o `program_id` do programa chamador. O PDA resultante é então comparado com os endereços fornecidos na instrução. Se houver uma correspondência, o PDA é considerado um signatário válido.

### Struct da CPI - `Instruction`

Dependendo do programa para o qual você está fazendo a chamada, pode haver uma crate disponível com funções auxiliares para criar a instrução, ou seja, `Instruction`. Muitas pessoas e organizações criam crates publicamente disponíveis ao lado de seus programas que expõem esses tipos de funções para simplificar a chamada de seus programas.

A definição do tipo `Instruction` exigido para uma CPI inclui:

- `program_id` - a chave pública do programa que executa a instrução
- `accounts` - uma lista de todas as contas que podem ser lidas ou escritas durante a execução da instrução
- `data` - os dados de instrução exigidos pela instrução

```rust
pub struct Instruction {
    pub program_id: Pubkey,
    pub accounts: Vec<AccountMeta>,
    pub data: Vec<u8>,
}
```

A struct `AccountMeta` tem a seguinte definição:

```rust
pub struct AccountMeta {
    pub pubkey: Pubkey,
    pub is_signer: bool,
    pub is_writable: bool,
}
```

Ao criar uma CPI, use a seguinte sintaxe para especificar o `AccountMeta` para cada conta:

- `AccountMeta::new` - indica que é gravável (writable)
- `AccountMeta::new_readonly` - indica que *não* é gravável (not writable)
- `(pubkey, true)` - indica que a conta é signatária
- `(pubkey, false)` - indica que a conta *não* é signatária

Aqui está um exemplo:

```rust
use solana_program::instruction::AccountMeta;

let account_metas = vec![
    AccountMeta::new(account1_pubkey, true),
    AccountMeta::new(account2_pubkey, false),
    AccountMeta::new_readonly(account3_pubkey, false),
    AccountMeta::new_readonly(account4_pubkey, true),
]
```

### Struct da CPI - `AccountInfo`

Para usar `invoke` e `invoke_signed`, também é necessário fornecer uma lista de `account_infos`. Assim como na lista de `AccountMeta` na instrução, é necessário incluir todas as ocorrências de `AccountInfo` de cada conta que o programa chamado lerá ou escreverá.

Para referência, a struct `AccountInfo` tem a seguinte definição:

```rust
/// Informação da conta
#[derive(Clone)]
pub struct AccountInfo<'a> {
    /// Chave pública da conta
    pub key: &'a Pubkey,
    /// A transação foi assinada pela chave pública desta conta?
    pub is_signer: bool,
    /// A conta é gravável?
    pub is_writable: bool,
    /// Os lamports na conta. Modificável por programas.
    pub lamports: Rc<RefCell<&'a mut u64>>,
    /// Os dados mantidos nesta conta. Modificável por programas.
    pub data: Rc<RefCell<&'a mut [u8]>>,
    /// Programa que possui esta conta
    pub owner: &'a Pubkey,
    /// Os dados desta conta contêm um programa carregado (e agora são somente leitura)
    pub executable: bool,
    /// A época em que esta conta deverá o próximo aluguel
    pub rent_epoch: Epoch,
}
```

Você pode criar uma cópia do `AccountInfo` para cada conta necessária usando o trait [Clone](https://docs.rs/solana-program/latest/solana_program/account_info/struct.AccountInfo.html#impl-Clone-for-AccountInfo%3C'a%3E), que é implementado para a struct [AccountInfo](https://docs.rs/solana-program/latest/solana_program/account_info/struct.AccountInfo.html) no crate `solana_program`.

```rust
let accounts_infos = [
    account_one.clone(),
    account_two.clone(),
    account_three.clone(),
];
```

Embora esta seção tenha fornecido uma visão geral de alto nível das CPIs, explicações mais detalhadas, exemplos e tutoriais podem ser encontrados nos recursos vinculados abaixo.

## Outros Recursos
- [Documentação Oficial](https://docs.solana.com/developing/programming-model/calling-between-programs#cross-program-invocations)
- [Referência do Livro de Receitas da Solana](https://solanacookbook.com/references/programs.html#how-to-do-cross-program-invocation)
- [Curso Solana - Lição sobre a CPI nativa](https://www.soldev.app/course/cpi)
- [Curso Solana - Lição sobre a CPI do Anchor](https://www.soldev.app/course/anchor-cpi)
- [Exemplos do Programa de Desenvolvedores da Solana](https://github.com/solana-developers/program-examples/tree/main/basics/cross-program-invocation)
