---
title: Endereços Derivados de Programa (PDAs)
head:
  - - meta
    - name: title
      content: Livro de Receitas da Solana - Solana Cookbook | PDAs
  - - meta
    - name: og:title
      content: Livro de Receitas da Solana - Solana Cookbook | PDAs
  - - meta
    - name: description
      content: Os PDAs abrigam contas criadas para serem controladas por um programa específico. Saiba mais sobre os PDAs e outros conceitos fundamentais no Livro de Receitas da Solana.
  - - meta
    - name: og:description
      content: Os PDAs abrigam contas criadas para serem controladas por um programa específico. Saiba mais sobre os PDAs e outros conceitos fundamentais no Livro de Receitas da Solana.
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

# Endereços Derivados de Programa (PDAs)

Os Endereços Derivados de Programa (PDAs) abrigam contas que são projetadas para serem controladas por um programa específico. Com os PDAs, os programas podem assinar programaticamente para determinados endereços sem precisar de uma chave privada. Os PDAs servem como base para a [Invocação de Programas Cruzados (CPI)](https://docs.solana.com/developing/programming-model/calling-between-programs#cross-program-invocations), que permite que os aplicativos da Solana sejam componíveis uns com os outros.

## Fatos

::: tip Ficha Informativa
- Os PDAs são strings de 32 bytes que se parecem com chaves públicas, mas não possuem chaves privadas correspondentes
- A função `findProgramAddress` é usada para derivar de forma determinística um PDA a partir de um programId e sementes (coleção de bytes)
- Um bump (um byte) é usado para afastar potenciais PDAs da curva elíptica ed25519
- Programas podem assinar seus PDAs fornecendo as sementes e o bump para a função [invoke_signed](https://docs.solana.com/developing/programming-model/calling-between-programs#program-signed-accounts)
- Um PDA só pode ser assinado pelo programa do qual foi derivado
- Além de permitir que programas assinem diferentes instruções, os PDAs também fornecem uma interface similar a um hashmap para [indexar contas](../guides/account-maps.md)
:::

## Mergulho Profundo

Os PDAs são blocos de construção essenciais para o desenvolvimento de programas na Solana. Com os PDAs, os programas podem assinar contas garantindo que nenhum usuário externo possa gerar uma assinatura válida para a mesma conta. Além de assinar as contas, certos programas também podem modificar as contas mantidas em seus PDAs.

![Matriz de Contas](./account-matrix.png)

<small style="text-align:center;display:block;">Imagem cortesia de <a href="https://twitter.com/pencilflip">Pencilflip</a></small>

### Gerando PDAs

Para entender o conceito por trás dos PDAs, pode ser útil considerar que os PDAs não são tecnicamente criados, mas sim encontrados. Os PDAs são gerados a partir de uma combinação de sementes (como a string `"vote_account"`) e um ID de programa. Essa combinação de sementes e ID de programa é então executada através de uma função hash sha256 para verificar se é gerada uma chave pública que está na curva elíptica ed25519.

Ao executar nosso ID de programa e sementes através de uma função hash, há uma chance de ~50% de que acabaremos com uma chave pública válida que está na curva elíptica. Nesse caso, simplesmente adicionamos algo para ajustar nossa entrada um pouco e tentamos novamente. O termo técnico para esse fator de ajuste é um bump. Na Solana, começamos com bump = 255 e simplesmente iteramos para baixo através de bump = 254, bump = 253, etc. até obtermos um endereço que não esteja na curva elíptica. Isso pode parecer rudimentar, mas uma vez encontrado, nos dá uma maneira determinística de derivar o mesmo PDA repetidamente.

![O PDA na curva elíptica](./pda-curve.png)

### Interagindo com PDAs

Quando um PDA é gerado, `findProgramAddress` retornará tanto o endereço quanto o bump usado para remover o endereço da curva elíptica. Com esse bump, um programa pode [assinar](../references/accounts.md#sign-with-a-pda) qualquer instrução que requer o PDA. Para assinar, os programas devem passar a instrução, a lista de contas e as sementes e o bump usados para derivar o PDA para `invoke_signed`. Além de assinar as instruções, os PDAs também devem assinar a própria criação através de `invoke_signed`.

Ao construir com PDAs, é comum [armazenar a semente do bump](https://github.com/solana-labs/solana-program-library/blob/78e29e9238e555967b9125799d7d420d7d12b959/token-swap/program/src/state.rs#L100) nos dados da conta em si. Isso permite que os desenvolvedores validem facilmente um PDA sem precisar passar o bump como um argumento de instrução.

## Outros recursos:
- [Documentação Oficial](https://docs.solana.com/developing/programming-model/calling-between-programs#program-derived-addresses)
- [Compreendendo os Endereços Derivados de Programa](https://www.brianfriel.xyz/understanding-program-derived-addresses/)
