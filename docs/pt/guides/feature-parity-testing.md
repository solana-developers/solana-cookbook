---
title: Teste de Paridade de Recursos
head:
  - - meta
    - name: title
      content: Livro de Receitas da Solana - Solana Cookbook | Teste de Paridade de Recursos
  - - meta
    - name: og:title
      content: Livro de Receitas da Solana - Solana Cookbook | Teste de Paridade de Recursos
  - - meta
    - name: description
      content: Os recursos variam de acordo com o cluster da Solana. Testes de recursos garantem resultados previsíveis.
  - - meta
    - name: og:description
      content: Os recursos variam de acordo com o cluster da Solana. Testes de recursos garantem resultados previsíveis.
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

# Teste de Paridade de Recursos

Ao testar seu programa, garantir que ele funcionará da mesma maneira em vários clusters é essencial tanto para a qualidade quanto para a obtenção de resultados esperados.

## Fatos

::: tip Ficha Informativa
- Os recursos são capacidades que são introduzidas aos validadores da Solana e exigem ativação para serem usadas.
- Os recursos podem ser ativados em um cluster (por exemplo, testnet) mas não em outro (por exemplo, mainnet-beta).
- No entanto, ao executar o solana-test-validator padrão localmente, todos os recursos disponíveis em sua versão da Solana são ativados automaticamente. O resultado é que, ao testar localmente, as capacidades e resultados dos seus testes podem não ser os mesmos ao implantar e executar em um cluster diferente!
:::

## Cenário
Suponha que você tenha uma Transação que contém três (3) instruções e cada instrução consome aproximadamente 100.000 Unidades de Computação (CU). Ao executar na versão Solana 1.8.x, você observaria que o consumo de CU de suas instruções é semelhante ao seguinte:

| Instrução | CU Inicial | Execução | CU Restante|
| - | - | - | - |
| 1 | 200_000 | -100_000| 100_000
| 2 | 200_000 | -100_000| 100_000
| 3 | 200_000 | -100_000| 100_000

Na versão da Solana 1.9.2, foi introduzido um recurso chamado 'transaction wide compute cap' (recurso de computação ampla de transação), em que uma Transação, por padrão, tem um orçamento de 200.000 CU e as instruções encapsuladas ***são deduzidas*** desse orçamento de Transação. Executar a mesma transação como observado acima teria um comportamento muito diferente:

| Instrução | CU Inicial | Execução | CU Restante|
| - | - | - | - |
| 1 | 200_000 | -100_000| 100_000
| 2 | 100_000 | -100_000| 0
| 3 | 0 | FALHA!!! | FALHA!!!

Uau! Se você não estivesse ciente disso, provavelmente ficaria frustrado, já que não houve mudança no comportamento da sua instrução que pudesse causar isso. Na devnet funcionou bem, mas localmente falhou?!?

Existe a possibilidade de aumentar o orçamento total da Transação, para digamos 300.000 CU, e recuperar sua sanidade, mas isso demonstra por que testar com a ***Paridade de Recursos*** fornece uma maneira proativa de evitar qualquer confusão.

## Status do Recurso
É bem fácil verificar quais recursos estão habilitados para um cluster específico com o comando `solana feature status`.
```console
solana feature status -ud   // Exibe por status de recurso para a devnet
solana feature status -ut   // Exibe para a testnet
solana feature status -um   // Exibe para a mainnet-beta
solana feature status -ul   // Exibe para a rede local, requer a execução do solana-test-validator
```
Alternativamente, você pode usar uma ferramenta como o [scfsd](#resources) para observar todos os estados dos recursos em todos os clusters, o que exibiria uma parte da tela mostrada aqui e não requer que o `solana-test-validator` esteja em execução:

<img src="./feature-parity-testing/scfsd.png" alt="Feature Status Heatmap">

## Teste de Paridade
Conforme observado anteriormente, o `solana-test-validator` ativa automaticamente **todos** os recursos. Então, para responder à pergunta "como posso testar localmente em um ambiente que tenha paridade com a devnet, a testnet ou até mesmo a mainnet-beta?".

Solução: Foram adicionados PRs à versão da Solana 1.9.6 para permitir a desativação dos recursos:

```console
solana-test-validator --deactivate-feature <FEATURE_PUBKEY> ...
```

## Demonstração Simples
Suponha que você tenha um programa simples que registra os dados que recebe em seu ponto de entrada. E você está testando uma transação que adiciona duas (2) instruções ao seu programa.

### Todos os recursos ativados
1. Você inicia o validador de teste em um terminal:

```console
solana config set -ul
solana-test-validator -l ./ledger --bpf-program ADDRESS target/deploy/PROGNAME.so --reset`
```

2. Em outro terminal, você inicia o registro de logs:
```console
solana logs
```

3. Em seguida, você executa sua transação. Você veria algo semelhante no terminal de registro (editado para maior clareza):
```console
Program PWDnx8LkjJUn9bAVzG6Fp6BuvB41x7DkBZdo9YLMGcc invoke [1]
Program log: process_instruction: PWDnx8LkjJUn9bAVzG6Fp6BuvB41x7DkBZdo9YLMGcc: 0 accounts, data=[0]
Program PWDnx8LkjJUn9bAVzG6Fp6BuvB41x7DkBZdo9YLMGcc consumed 12843 of 200000 compute units
Program PWDnx8LkjJUn9bAVzG6Fp6BuvB41x7DkBZdo9YLMGcc success
Program PWDnx8LkjJUn9bAVzG6Fp6BuvB41x7DkBZdo9YLMGcc invoke [1]
Program log: process_instruction: PWDnx8LkjJUn9bAVzG6Fp6BuvB41x7DkBZdo9YLMGcc: 0 accounts, data=[1]
Program PWDnx8LkjJUn9bAVzG6Fp6BuvB41x7DkBZdo9YLMGcc consumed 12843 of 187157 compute units
Program PWDnx8LkjJUn9bAVzG6Fp6BuvB41x7DkBZdo9YLMGcc success[
```
Como nosso recurso 'transaction wide compute cap' é ativado automaticamente por padrão, observamos que cada instrução consome CUs do orçamento inicial da transação de 200.000 CU.

### Recursos seletivos desativados
1. Para esta execução, queremos executar para que o comportamento do orçamento de CU esteja em paridade com o que está sendo executado na devnet. Usando as ferramentas descritas no [Status do Recurso](#feature-status), isolamos a chave pública do `transaction wide compute cap` e usamos a opção `--deactivate-feature` na inicialização do validador de teste.

```console
solana-test-validator -l ./ledger --deactivate-feature 5ekBxc8itEnPv4NzGJtr8BVVQLNMQuLMNQQj7pHoLNZ9 --bpf-program target/deploy/PROGNAME.so --reset`
```
2. Agora podemos ver em nossos logs que as instruções têm agora seu próprio orçamento de 200.000 CU (editado para maior clareza), que é o estado atual em todos os clusters upstream:
```console
Program PWDnx8LkjJUn9bAVzG6Fp6BuvB41x7DkBZdo9YLMGcc invoke [1]
Program log: process_instruction: PWDnx8LkjJUn9bAVzG6Fp6BuvB41x7DkBZdo9YLMGcc: 0 accounts, data=[0]
Program PWDnx8LkjJUn9bAVzG6Fp6BuvB41x7DkBZdo9YLMGcc consumed 12843 of 200000 compute units
Program PWDnx8LkjJUn9bAVzG6Fp6BuvB41x7DkBZdo9YLMGcc success
Program PWDnx8LkjJUn9bAVzG6Fp6BuvB41x7DkBZdo9YLMGcc invoke [1]
Program log: process_instruction: PWDnx8LkjJUn9bAVzG6Fp6BuvB41x7DkBZdo9YLMGcc: 0 accounts, data=[0]
Program PWDnx8LkjJUn9bAVzG6Fp6BuvB41x7DkBZdo9YLMGcc consumed 12843 of 200000 compute units
Program PWDnx8LkjJUn9bAVzG6Fp6BuvB41x7DkBZdo9YLMGcc success
```

## Teste de Paridade Total
Você pode estar em total paridade com um cluster específico identificando cada recurso que ainda não está ativado e adicionando um `--deactivate-feature <FEATURE_PUBKEY>` para cada um ao invocar o `solana-test-validator`:
```console
solana-test-validator --deactivate-feature PUBKEY_1 --deactivate-feature PUBKEY_2 ...
```

Alternativamente, o [scfsd](#resources) fornece uma opção de comando para gerar uma saída do conjunto completo de recursos desativados para um cluster, para ser alimentado diretamente na inicialização do `solana-test-validator`:
```console
solana-test-validator -l ./.ledger $(scfsd -c devnet -k -t)
```

Se você abrir outro terminal, enquanto o validador está em execução, e executar o comando `solana feature status`, você verá recursos desativados que foram encontrados desativados na devnet.

## Teste de Paridade Total Programática

Para aqueles que controlam a execução do validador de teste em seu código de teste, é possível modificar os recursos ativados/desativados do validador de teste usando o `TestValidatorGenesis`. Com a versão da Solana 1.9.6, uma função foi adicionada ao construtor do validador para suportar isso.

Na raiz da pasta do seu programa, crie uma nova pasta chamada `tests` e adicione um arquivo `parity_test.rs`. Aqui estão as funções de boilerplate usadas por cada teste.

<SolanaCodeGroup>
  <SolanaCodeGroupItem title="Test Boiler Plate" active>

  <template v-slot:default>

@[code](@/code/feature-parity-testing/preamble.rs)

  </template>

  <template v-slot:preview>

@[code](@/code/feature-parity-testing/preamble_short.rs)

  </template>

  </SolanaCodeGroupItem>

</SolanaCodeGroup>

Agora podemos adicionar funções de teste no corpo de `mod test {...}` para demonstrar a configuração padrão do validador (todos os recursos ativados) e, em seguida, desativar o `transaction wide compute cap`, conforme exemplos anteriores de execução do `solana-test-validator` a partir da linha de comando.

<CodeGroup>
  <CodeGroupItem title="All Features Test">

  @[code](@/code/feature-parity-testing/deactivate_one.rs)

  </CodeGroupItem>

  <CodeGroupItem title="Disable Tx CU Test" active>

  @[code](@/code/feature-parity-testing/deactivate_two.rs)

  </CodeGroupItem>

</CodeGroup>

Alternativamente, o [mecanismo SCFS](#resources) pode produzir um vetor completo de recursos desativados para um cluster. O seguinte demonstra o uso desse mecanismo para obter uma lista de todos os recursos desativados para a devnet.

<CodeGroup>
  <CodeGroupItem title="Devnet Parity">

  @[code](@/code/feature-parity-testing/deactivate_scfs.rs)

  </CodeGroupItem>

</CodeGroup>


Feliz codificação!


## Recursos
[scfsd](https://github.com/FrankC01/solana-gadgets/tree/main/rust/scfsd)

[Mecanismo scfs](https://github.com/FrankC01/solana-gadgets/tree/main/rust/gadgets-scfs)