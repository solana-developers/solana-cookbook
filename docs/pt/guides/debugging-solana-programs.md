---
title: Depurando Programas da Solana
head:
  - - meta
    - name: title
      content: Livro de Receitas da Solana - Solana Cookbook | Depurando Programas da Solana
  - - meta
    - name: og:title
      content: Livro de Receitas da Solana - Solana Cookbook | Depurando Programas da Solana
  - - meta
    - name: description
      content: Há várias opções e ferramentas de suporte para testar e depurar um programa BPF da Solana.
  - - meta
    - name: og:description
      content: Há várias opções e ferramentas de suporte para testar e depurar um programa BPF da Solana.
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

# Depurando Programas da Solana

Há várias opções e ferramentas de suporte para testar e depurar um programa da Solana.

## Fatos

::: tip Ficha Informativa
- O crate `solana-program-test` permite o uso de um ***ambiente de execução local*** básico onde é possível testar e depurar seu programa de forma interativa (por exemplo, no vscode).
- O crate `solana-validator` permite o uso da implementação `solana-test-validator` para testes mais robustos que ocorrem em um ***nó validador local***. Você pode executar a partir do editor, mas ***os pontos de interrupção no programa são ignorados***.
- A ferramenta de CLI `solana-test-validator` executa e carrega seu programa e processa a execução de transações a partir de aplicativos de linha de comando em Rust ou aplicativos Javascript/Typescript usando web3.
- Para todos os casos acima, é recomendado o uso liberal da macro `msg!` em seu programa no início e, em seguida, removê-las à medida que você testa e garante um comportamento sólido. Lembre-se de que `msg!` consome Unidades de Computação que podem eventualmente fazer com que seu programa falhe atingindo os limites do orçamento de Unidades de Computação.
:::

Os passos nas seções seguintes usam o [solana-program-bpf-template](#resources). Clone-o em sua máquina:
```bash
git clone git@github.com:mvines/solana-bpf-program-template.git
cd solana-bpf-program-template
code .
```
## Testes de Tempo de Execução e Depuração no Editor

Abra o arquivo `src/lib.rs`.

Você verá que o programa é bem simples e basicamente apenas registra o conteúdo recebido pela função de ponto de entrada do programa: `process_instruction`.

1. Vá para a seção `#[cfg(test)]` e clique em `Run Tests`. Isso irá compilar o programa e, em seguida, executar o teste `async fn test_transaction()`. Você verá as mensagens de log (simplificadas) no terminal do vscode abaixo da fonte.
```bash
running 1 test
"bpf_program_template" program loaded as native code
Program 4uQeVj5tqViQh7yWWGStvkEG1Zmhx6uasJtWCJziofM invoke [1]
Program log: process_instruction: 4uQeVj5tqViQh7yWWGStvkEG1Zmhx6uasJtWCJziofM: 1 accounts, data=[1, 2, 3]
Program 4uQeVj5tqViQh7yWWGStvkEG1Zmhx6uasJtWCJziofM success
test test::test_transaction ... ok
test result: ok. 1 passed; 0 failed; 0 ignored; 0 measured; 0 filtered out; finished in 33.41s
```
2. Defina um ponto de interrupção na linha `msg!` do programa (linha 11)
3. De volta ao módulo de teste, clique em `Debug` e em alguns segundos o depurador parará no ponto de interrupção e agora você pode examinar dados, percorrer funções, etc.

Esses testes também podem ser executados a partir da linha de comando com: `cargo test` ou `cargo test-bpf`. É claro que todos os pontos de interrupção serão ignorados.

Como é legal isso!

:::tip Observação
Lembre-se de que você não está usando um nó validador, portanto, programas padrão, hashes de bloco, etc. não são representados ou não se comportarão como seriam ao serem executados em um nó validador. É por isso que o time da Solana nos deu o teste de Nó Validador Local (Local Validator Node)!
:::

## Teste de Nó Validador Local no Editor

Os testes de integração usando o carregamento programático de um nó validador local são definidos no arquivo `tests/integration.rs`.

Por padrão, os testes de integração do modelo de repositório só poderão ser executados a partir da linha de comando usando `cargo test-bpf`. As seguintes etapas permitirão que você execute dentro do editor, bem como exibir logs do validador do programa e saídas `msg!` do seu programa:

1. No diretório do repositório, execute `cargo build-bpf` para construir o programa de amostra
2. No editor, abra `tests/integration.rs`
3. Comente a linha 1 -> `// #![cfg(feature = "test-bpf")]`
4. Na linha 19, altere para ler: `.add_program("target/deploy/bpf_program_template", program_id)`
5. Insira o seguinte na linha 22: `solana_logger::setup_with_default("solana_runtime::message=debug");`
6. Clique em `Run Test` acima da função `test_validator_transaction()`

Isso carregará o nó validador, permitindo que você construa uma transação (da maneira Rust) e envie ao nó usando o `RcpClient`.

A saída do programa também será impressa no terminal do editor. Por exemplo (simplificado):
```bash
running 1 test
Waiting for fees to stabilize 1...
Waiting for fees to stabilize 2...
Program 4uQeVj5tqViQh7yWWGStvkEG1Zmhx6uasJtWCJziofM invoke [1]
Program log: process_instruction: 4uQeVj5tqViQh7yWWGStvkEG1Zmhx6uasJtWCJziofM: 1 accounts, data=[1, 2, 3]
Program 4uQeVj5tqViQh7yWWGStvkEG1Zmhx6uasJtWCJziofM consumed 13027 of 200000 compute units
Program 4uQeVj5tqViQh7yWWGStvkEG1Zmhx6uasJtWCJziofM success

test test_validator_transaction ... ok
test result: ok. 1 passed; 0 failed; 0 ignored; 0 measured; 0 filtered out; finished in 6.40s
```
A depuração aqui permitirá que você depure as funções e métodos usados no ***corpo do teste***, mas não permitirá que você insira pontos de interrupção em seu programa.

Muito legal, né?

## Teste de Nó Validador Local a partir de Aplicativos Cliente
Por fim, você pode iniciar um nó validador local e carregar seu programa e todas as contas usando o `solana-test-validator` a partir da linha de comando.

Nessa abordagem, você precisará de um aplicativo cliente usando o [RcpClient](#resources) do Rust ou em clientes [JavaScript ou Typescript](#resources).

Consulte `solana-test-validator --help` para obter mais detalhes e opções. Para o programa exemplo, aqui está a configuração padrão:
1. Abra um terminal na pasta do repositório
2. Execute `solana config set -ul` para definir a configuração para apontar para 'local'
3. Execute `solana-test-validator --bpf-program target/deploy/bpf_program_template-keypair.json target/deploy/bpf_program_template.so`
4. Abra outro terminal e execute `solana logs` para iniciar o registro de logs
5. Você pode então executar seu programa cliente e observar a saída do programa no terminal onde você iniciou o registro de logs

UAU! Isso é demais!

## Recursos
[solana-program-bpf-template](https://github.com/mvines/solana-bpf-program-template)

[RcpClient](https://docs.rs/solana-client/latest/solana_client/rpc_client/struct.RpcClient.html)

[Biblioteca JavaScript/Typescript](https://solana-labs.github.io/solana-web3.js/)
