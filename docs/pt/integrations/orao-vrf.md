---
title: VRF ORAO
head:
- - meta
- name: title
  content: Livro de Receitas da Solana - Solana Cookbook | Usando a VRF ORAO com a Solana
- - meta
- name: og:title
  content: Livro de Receitas da Solana - Solana Cookbook | Usando a VRF ORAO com a Solana
- - meta
- name: description
  content: Neste tutorial, você aprenderá a usar a VRF ORAO com a Solana e o Anchor.
- - meta
- name: og:description
  content: Neste tutorial, você aprenderá a usar a VRF ORAO com a Solana e o Anchor.
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

# VRF ORAO

A VRF ORAO é uma função de randomização verificável (Verifiable Random Function, ou VRF) baseada em EdDSA (algoritmo de assinatura digital de curva de Edwards), de várias partes. Ela é capaz de fornecer 64 bytes de aleatoriedade verificável em resposta a uma solicitação de aleatoriedade.

## Cenário de uso básico

1.  Crie uma nova solicitação de aleatoriedade.
    *   Esta operação requer uma semente única a ser fornecida pelo cliente. Essa semente é usada para verificação de aleatoriedade.
2.  Use a aleatoriedade gerada assim que a solicitação for atendida.
    *   O Oráculo atenderá as novas solicitações o mais rápido possível. Esse procedimento inclui a etapa de verificação, portanto, nenhuma aleatoriedade não verificada deve aparecer na cadeia.
3.  (Opcional) Verifique a aleatoriedade gerada fora da cadeia.
    *   Você pode [verificar a aleatoriedade gerada](https://github.com/orao-network/solana-vrf/blob/6cc9a80ec280b96a97321b8bfe2904a6e432c38e/rust/examples/off-chain/src/main.rs#L48) (`verify generated randomness`) em relação à lista efetiva de autoridades de cumprimento (que é uma parte da configuração VRF disponível publicamente). Existem assistentes para isso em SDKs.

## SDKs

Existem dois SDKs disponíveis:

1.  O crate [`orao-solana-vrf`](https://docs.rs/orao-solana-vrf) - o código abaixo é baseado neste SDK Rust.
2.  O SDK JS - o SDK JavaScript, bem como o código-fonte do SDK Rust, estão disponíveis no repositório público do GitHub [`solana-vrf`](https://github.com/orao-network/solana-vrf). Todos os testes neste repositório são baseados no SDK JavaScript.

## Anatomia de uma solicitação de aleatoriedade

A estrutura [`RandomnessRequest`][1] é usada para armazenar a aleatoriedade solicitada:

*   Campo `seed` – armazena a semente da solicitação.
*   Campo `randomness` – este é o campo de interesse, que armazena a aleatoriedade atendida. Ele será zerado até que a solicitação de aleatoriedade seja atendida.
*   Campo `responses` –  você pode olhar para este campo caso queira realizar a verificação fora da cadeia (existem assistentes para isso em ambos os SDKs).

## Anatomia de uma configuração VRF

A estrutura [`NetworkState`][2] contém os dados VRF na cadeia. Aqui, falaremos sobre o campo de configuração `config`, que armazena a configuração da rede, [`NetworkConfiguration`][3]. Os campos que podem ser interessantes para você são:

*   `request_fee` – a solicitação de aleatoriedade custará essa quantidade de lamports.
*   `fulfillment_authorities` – chaves públicas das autoridades de cumprimento.
*   `token_fee_cofig` - se definido, é possível pagar taxas em SPL em vez de SOL.

## Exemplo nativo do Rust

Esta seção ilustrará o uso fora da cadeia ([o código completo está disponível no GitHub][4]).

### 1. Configurando a conexão

O SDK Rust é baseado na biblioteca [`anchor-client`](https://docs.rs/anchor-client), portanto, você precisará adquirir a instância `program` para usá-lo:

```rust
let payer: Keypair = ..; // obtenha isso da configuração da solana
let client = Client::new_with_options(Cluster::Devnet, Rc::new(payer), CommitmentConfig::finalized());
let program = client.program(orao_solana_vrf::id());
```

### 2. Criando uma solicitação

Existe um [`RequestBuilder`][5] conveniente para esta finalidade:

```rust
let seed = rand::random();
let tx = RequestBuilder::new(seed)
    .build(&program)
    .expect("Randomness request")
    .send_with_spinner_and_config(RpcSendTransactionConfig::default())
    .expect("Transaction hash");
```

### 3. Aguardando o cumprimento

Existem várias maneiras de esperar pelo cumprimento da solicitação, incluindo pub-sub, mas este exemplo usará um loop simples:

```rust
let randomness_address = orao_solana_vrf::randomness_account_address(&seed);
let randomness_account = loop {
    match program.account::<Randomness>(randomness_address) {
        Ok(randomness) if randomness.fulfilled().is_some() => break randomness,
        _ => {
            std::thread::sleep(Duration::from_secs(1));
            continue;
        }
    }
}
println!("Randomness for seed {:?} is fulfilled with {:?}", seed, randomness_account.randomness);
```

## Exemplo de CPI

CPI é a abreviação em inglês para Invocação de Programas Cruzados - uma maneira de um contrato chamar outro contrato em uma única transação. Esta seção ilustrará isso ([o código completo está disponível no GitHub][6]).

O contrato que usaremos para ilustrar a CPI é um simples jogo de Roleta-Russa para um único jogador, onde o resultado de uma rodada é derivado de uma aleatoriedade atendida.

*Observação*: a aleatoriedade não estará imediatamente disponível para o seu contrato, portanto, você precisará projetá-lo de maneira que ele espere que a aleatoriedade seja cumprida. Em nosso exemplo, um jogador não poderá iniciar outra rodada até que a atual esteja concluída (até que a aleatoriedade seja cumprida).

### 1. Crie o contrato

Este exemplo é baseado no [framework Anchor](https://github.com/coral-xyz/anchor).
Consulte o [Anchor Book](https://book.anchor-lang.com/) para saber como criar um contrato.

Para realizar uma chamada da CPI, você precisará adicionar o SDK Rust para a VRF ORAO com o recurso `cpi` à sua lista de dependências:

```toml
[dependencies]
# ...
orao-solana-vrf = { version = "0.2.3", default-features = false, features = ["cpi"] }
```

### 2. Coletando as contas necessárias

Cada instrução da Solana requer uma lista adequada de contas. Precisaremos chamar a instrução Request, portanto, aqui está a lista de contas necessárias:

* payer – cliente VRF
* network_state – endereço do estado VRF na cadeia
* treasury - endereço do tesouro VRF (obtido do estado VRF na cadeia)
* request - PDA para armazenar a aleatoriedade (derivado da semente)
* system_program – necessário para criar a conta de solicitação

O descrito acima significa que nossa instrução precisa de todas essas contas, além de suas próprias contas. Em particular, a nossa instrução da Roleta-Russa exigirá a seguinte lista de contas:

```rust
#[derive(Accounts)]
#[instruction(force: [u8; 32])]
pub struct SpinAndPullTheTrigger<'info> {
    /// O jogador será a conta `pagadora` na chamada da CPI.
    #[account(mut)]
    player: Signer<'info>,

    /// Esta é a conta do estado do jogador, é exigida pela Roleta-Russa para armazenar os dados do jogador
    // (número de rodadas jogadas e informações para derivar o resultado da última rodada)
    #[account(
        init_if_needed,
        payer = player,
        space = 8 + PlayerState::SIZE,
        seeds = [
            PLAYER_STATE_ACCOUNT_SEED,
            player.key().as_ref()
        ],
        bump
    )]
    player_state: Account<'info, PlayerState>,

    /// Esta conta aponta para a última solicitação de VRF, é necessário validar que o jogador está vivo e apto a jogar mais uma rodada.
    /// CHECK:
    #[account(
        seeds = [RANDOMNESS_ACCOUNT_SEED.as_ref(), player_state.force.as_ref()],
        bump,
        seeds::program = orao_solana_vrf::ID
    )]
    prev_round: AccountInfo<'info>,

    /// Esta conta é a conta de solicitação VRF atual, ela será a conta `request` na chamada da CPI.
    /// CHECK:
    #[account(
        mut,
        seeds = [RANDOMNESS_ACCOUNT_SEED.as_ref(), &force],
        bump,
        seeds::program = orao_solana_vrf::ID
    )]
    random: AccountInfo<'info>,

    /// Conta tesouraria VRF, será a conta `treasury` na chamada da CPI.
    /// CHECK:
    #[account(mut)]
    treasury: AccountInfo<'info>,
    #[account(
        mut,
        seeds = [CONFIG_ACCOUNT_SEED.as_ref()],
        bump,
        seeds::program = orao_solana_vrf::ID
    )]

    /// A conta de estado na cadeia da VRF será a conta `network_state` na chamada da CPI.
    config: Account<'info, NetworkState>,

    /// O endereço do programa VRF para invocar a CPI.
    vrf: Program<'info, OraoVrf>,

    /// O endereço do programa do sistema para criar o player_state e ser usado na chamada da CPI.
    system_program: Program<'info, System>,
}
```

### 3. Realizando uma chamada de CPI

No framework Anchor, existe um `CpiContext` para esse propósito (consulte a [seção correspondente](https://book.anchor-lang.com/anchor_in_depth/CPIs.html) do Anchor Book):

```rust
let cpi_program = ctx.accounts.vrf.to_account_info();
let cpi_accounts = orao_solana_vrf::cpi::accounts::Request {
    payer: ctx.accounts.player.to_account_info(),
    network_state: ctx.accounts.config.to_account_info(),
    treasury: ctx.accounts.treasury.to_account_info(),
    request: ctx.accounts.random.to_account_info(),
    system_program: ctx.accounts.system_program.to_account_info(),
};
let cpi_ctx = anchor_lang::context::CpiContext::new(cpi_program, cpi_accounts);
orao_solana_vrf::cpi::request(cpi_ctx, force)?;
```

### 4. Usando a aleatoriedade cumprida

Nosso contrato deriva o resultado da rodada da aleatoriedade cumprida, sendo que a rodada é considerada em progresso se a aleatoriedade ainda não foi cumprida:

```rust
/// Resultado da última rodada.
#[derive(Debug, Clone, Copy, PartialEq, Eq)]
pub enum CurrentState {
    /// O jogador está vivo e capaz de jogar.
    Alive,
    /// O jogador está morto e não pode mais jogar.
    Dead,
    /// O jogador está esperando a rodada atual terminar.
    Playing,
}

/// Deriva o resultado da última rodada.
pub fn current_state(randomness: &Randomness) -> CurrentState {
    if let Some(randomness) = randomness.fulfilled() {
        if is_dead(randomness) {
            CurrentState::Dead
        } else {
            CurrentState::Alive
        }
    } else {
        CurrentState::Playing
    }
}

/// Decide se o jogador está morto ou vivo.
fn is_dead(randomness: &[u8; 64]) -> bool {
    // Use apenas os primeiros 8 bytes para simplicidade.
    let value = randomness[0..size_of::<u64>()].try_into().unwrap();
    u64::from_le_bytes(value) % 6 == 0
}
```

[1]: https://docs.rs/orao-solana-vrf/latest/orao_solana_vrf/state/struct.Randomness.html
[2]: https://docs.rs/orao-solana-vrf/latest/orao_solana_vrf/state/struct.NetworkState.html
[3]: https://docs.rs/orao-solana-vrf/latest/orao_solana_vrf/state/struct.NetworkConfiguration.html
[4]: https://github.com/orao-network/solana-vrf/tree/master/rust/examples/off-chain
[5]: https://docs.rs/orao-solana-vrf/latest/orao_solana_vrf/struct.RequestBuilder.html
[6]: https://github.com/orao-network/solana-vrf/tree/master/rust/examples/cpi
