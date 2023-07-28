---
title: Mapeamentos de Conta
---

# Mapeamentos de Conta

Mapeamentos são estruturas de dados que usamos frequentemente na programação para associar uma **chave** com um **valor** de algum tipo. A chave e o valor podem ser de qualquer tipo arbitrário e a chave atua como um identificador para um determinado valor que está sendo salvo. Em seguida, dada sua chave, nos é permitido inserir, recuperar e atualizar esses valores de forma eficiente.

O modelo de conta da Solana, como sabemos, requer que os dados do programa e seus dados de estado relevantes sejam armazenados em contas diferentes. Essas contas têm um endereço associado a elas. Isso, por si só, atua como um mapeamento! Saiba mais sobre o modelo de conta da Solana [aqui][AccountCookbook].

Portanto, faria sentido armazenar seus **valores** em contas separadas, com seu endereço sendo a **chave** necessária para recuperar o valor. Mas isso traz algumas questões, como: 

* Os endereços mencionados acima provavelmente não serão **chaves** ideais, que você pode lembrar e recuperar o valor necessário.

* Os endereços mencionados acima referem-se a chaves públicas de diferentes pares de chaves, ou **Keypairs**, em que cada chave pública (ou *endereço*) teria uma **chave privada** associada a ela também. Essa chave privada seria necessária para assinar diferentes instruções quando necessário, exigindo que armazenemos a chave privada em algum lugar, o que definitivamente **não** é recomendado!

Isso apresenta um problema que muitos desenvolvedores da Solana enfrentam, que é implementar uma lógica semelhante a um `Map` em seus programas. Vamos analisar algumas maneiras de como lidar com esse problema.

## Derivando PDAs

PDA significa [Endereços Derivados de Programa][PDA], que são, em resumo, endereços **derivados** de um conjunto de sementes (seeds) e um ID do programa (ou _endereço_).

O aspecto único dos PDAs é que esses endereços **não** estão associados a nenhuma chave privada. Isso ocorre porque esses endereços não estão na curva ED25519. Portanto, **apenas** o programa do qual este _endereço_ foi derivado pode assinar uma instrução com a chave, desde que as sementes também sejam fornecidas. Saiba mais sobre isso [aqui][CPI].

Agora que temos uma ideia do que são os PDAs, vamos usá-los para mapear algumas contas! Vamos usar um exemplo de um programa de **blog** para demonstrar como isso seria implementado.

Neste programa de blog, gostaríamos que cada usuário (`User`) tivesse um único blog. Este blog pode ter qualquer número de `Posts`. Isso significa que estamos **mapeando** cada usuário para um blog e cada postagem é **mapeada** para um determinado blog.

Em resumo, há uma correspondência `1:1` entre um usuário e seu blog, enquanto uma correspondência `1:N` entre um blog e suas postagens.

Para a correspondência `1:1`, gostaríamos que o endereço de um blog fosse derivado **apenas** do seu usuário, o que nos permitiria recuperar um blog, dada sua autoridade (ou usuário). Portanto, as sementes para um blog consistiriam na **chave de sua autoridade** e possivelmente um prefixo de **"blog"**, para atuar como um identificador de tipo.

Para a correspondência `1:N`, gostaríamos que o endereço de cada postagem fosse derivado **não apenas** do blog com o qual está associado, mas também de outro **identificador**, permitindo-nos diferenciar entre as `N` postagens no blog. No exemplo abaixo, o endereço de cada postagem é derivado da **chave do blog**, um **slug** para identificar cada postagem e um prefixo de **"post"**, para atuar como um identificador de tipo.

O código é mostrado abaixo: 

<SolanaCodeGroup>
  <SolanaCodeGroupItem title="Anchor" active>

  <template v-slot:default>

@[code](@/code/account-maps/deriving-pda/anchor-pda-map.rs)

  </template>

  <template v-slot:preview>

@[code](@/code/account-maps/deriving-pda/anchor-pda-map.preview.rs)

  </template>

  </SolanaCodeGroupItem>

  <SolanaCodeGroupItem title="Rust" active>

  <template v-slot:default>

@[code](@/code/account-maps/deriving-pda/vanilla-pda-map.rs)

  </template>

  <template v-slot:preview>

@[code](@/code/account-maps/deriving-pda/vanilla-pda-map.preview.rs)

  </template>

  </SolanaCodeGroupItem>

</SolanaCodeGroup>

No lado do cliente, você pode usar `PublicKey.findProgramAddress()` para obter os endereços da conta do `Blog` e do `Post` necessários, que você pode passar para `connection.getAccountInfo()` para buscar os dados da conta. Um exemplo é mostrado abaixo:

<SolanaCodeGroup>
  <SolanaCodeGroupItem title="TS" active>

  <template v-slot:default>

@[code](@/code/account-maps/deriving-pda/client.ts)

  </template>

  <template v-slot:preview>

@[code](@/code/account-maps/deriving-pda/client.preview.ts)

  </template>

  </SolanaCodeGroupItem>

</SolanaCodeGroup>

## Conta Única de Mapeamento

Outra forma de implementar mapeamento seria ter uma estrutura de dados `BTreeMap` armazenada explicitamente em uma única conta. O endereço dessa conta em si poderia ser um PDA, ou a chave pública de um par de chaves gerado.

Este método de mapeamento de contas não é ideal pelas seguintes razões:

* Você terá que inicializar a conta que armazena o `BTreeMap` antes de poder inserir os pares de chave-valor necessários nele. Em seguida, você também terá que armazenar o endereço desta conta em algum lugar, para atualizá-lo sempre que necessário.

* Existem limitações de memória para uma conta, onde uma conta pode ter um tamanho máximo de **10 megabytes**, o que limita o `BTreeMap` de armazenar um grande número de pares chave-valor.

Portanto, após considerar seu caso de uso, você pode implementar este método como mostrado abaixo:

<SolanaCodeGroup>
  <SolanaCodeGroupItem title="Rust" active>

  <template v-slot:default>

@[code](@/code/account-maps/trivial/vanilla-trivial-map.rs)

  </template>

  <template v-slot:preview>

@[code](@/code/account-maps/trivial/vanilla-trivial-map.preview.rs)

  </template>

  </SolanaCodeGroupItem>
</SolanaCodeGroup>

O código do lado do cliente para testar o programa acima seria algo como mostrado abaixo:

<SolanaCodeGroup>
  <SolanaCodeGroupItem title="TS" active>

  <template v-slot:default>

@[code](@/code/account-maps/trivial/client.ts)

  </template>

  <template v-slot:preview>

@[code](@/code/account-maps/trivial/client.preview.ts)

  </template>

  </SolanaCodeGroupItem>
</SolanaCodeGroup>



[AccountCookbook]: https://solanacookbook.com/core-concepts/accounts.html
[PDA]: https://solanacookbook.com/references/accounts.html#program-derived-address
[CPI]: https://solanacookbook.com/references/programs.html#create-a-program-derived-address