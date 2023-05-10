---
title: Système d'Energie
head:
  - - meta
    - name: title
      content: Solana Cookbook | Système d'Energie
  - - meta
    - name: og:title
      content: Solana Cookbook | Système d'Energie dans des jeux Solana
  - - meta
    - name: description
      content: Construisez des Systèmes d'Energie pour des Casual Games sur Solana avec ces étapes simples
  - - meta
    - name: og:description
      content: Construisez des Systèmes d'Energie pour des Casual Games sur Solana avec ces étapes simples
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

# Système d'Energie

Les Casual Games utilisent généralement des systèmes d'énergie, ce qui signifie que les actions effectuées dans le jeu coûtent de l'énergie qui se recharge au fil du temps. Dans ce guide, nous allons voir comment en construire un sur Solana.
Il est recommandé de commencer par [Exemple Hello World](../gaming/hello-world) si vous n'avez pas de connaissances préalables de Solana.

Voici un exemple de code source complet basé sur le *Solana dapp scaffold* avec un client react :

[Source](https://github.com/solana-developers/solana-game-starter-kits/tree/main/lumberjack)

## Program Anchor

Dans ce tutoriel, nous vous guiderons à travers le processus de création d'un programme qui recharge progressivement les réserves d'énergie du joueur au fil du temps. Cela leur permettra ensuite d'exécuter diverses actions dans le jeu.
Dans notre exemple, un bûcheron coupera des arbres, chaque arbre rapportant un bois et coûtant une énergie.

### Création du compte du joueur

Tout d'abord, le joueur doit créer un compte qui enregistre l'état de notre joueur. Remarquez que last_login enregistre l'horodatage Unix du joueur qui interagit avec le programme.
Grâce à cet état, nous pourrons calculer la quantité d'énergie dont dispose le joueur à un moment donné.
Nous disposons également d'une valeur pour la quantité de bois que le bûcheron peut transporter dans le jeu.

```rust

pub fn init_player(ctx: Context<InitPlayer>) -> Result<()> {
    ctx.accounts.player.energy = MAX_ENERGY;
    ctx.accounts.player.last_login = Clock::get()?.unix_timestamp;
    Ok(())
}

...

#[derive(Accounts)]
pub struct InitPlayer <'info> {
    #[account(
        init,
        payer = signer,
        space = 1000,
        seeds = [b"player".as_ref(), signer.key().as_ref()],
        bump,
    )]
    pub player: Account<'info, PlayerData>,
    #[account(mut)]
    pub signer: Signer<'info>,
    pub system_program: Program<'info, System>,
}

#[account]
pub struct PlayerData {
    pub name: String,
    pub level: u8,
    pub xp: u64,
    pub wood: u64,
    pub energy: u64,
    pub last_login: i64
}
```

### Coupe des arbres

Ensuite, à chaque fois que le joueur appelle l'instruction `chop_tree`, nous vérifions si le joueur a assez d'énergie et le récompensons avec un bois.

```rust
    #[error_code]
    pub enum ErrorCode {
        #[msg("Not enough energy")]
        NotEnoughEnergy,
    }

    pub fn chop_tree(mut ctx: Context<ChopTree>) -> Result<()> {
        let account = &mut ctx.accounts;
        update_energy(account)?;

        if ctx.accounts.player.energy == 0 {
            return err!(ErrorCode::NotEnoughEnergy);
        }

        ctx.accounts.player.wood = ctx.accounts.player.wood + 1;
        ctx.accounts.player.energy = ctx.accounts.player.energy - 1;
        msg!("You chopped a tree and got 1 wood. You have {} wood and {} energy left.", ctx.accounts.player.wood, ctx.accounts.player.energy);
        Ok(())
    }
```

### Calcul de l'énergie

La partie intéressante se situe dans la fonction `update_energy`. Nous vérifions le temps écoulé et calculons l'énergie dont disposera le joueur à l'instant donné.
Nous ferons de même côté client. Nous mettons à jour l'énergie au lieu de l'interroger en permanence.
Il s'agit d'une technique courante dans le développement de jeux.

```rust

const TIME_TO_REFILL_ENERGY: i64 = 60;
const MAX_ENERGY: u64 = 10;

pub fn update_energy(ctx: &mut ChopTree) -> Result<()> {
    let mut time_passed: i64 = &Clock::get()?.unix_timestamp - &ctx.player.last_login;
    let mut time_spent: i64 = 0;
    while time_passed > TIME_TO_REFILL_ENERGY {
        ctx.player.energy = ctx.player.energy + 1;
        time_passed -= TIME_TO_REFILL_ENERGY;
        time_spent += TIME_TO_REFILL_ENERGY;
        if ctx.player.energy == MAX_ENERGY {
            break;
        }
    }

    if ctx.player.energy >= MAX_ENERGY {
        ctx.player.last_login = Clock::get()?.unix_timestamp;
    } else {
        ctx.player.last_login += time_spent;
    }

    Ok(())
}
```

## Client Js

Voici un exemple de code source complet basé sur le *Solana dapp scaffold* avec un client react :
[Source](https://github.com/solana-developers/solana-game-starter-kits/tree/main/lumberjack)


### Créer une connexion

Dans le fichier Anchor.ts, nous créons une connexion :

```js
export const connection = new Connection(
    "https://api.devnet.solana.com",
    "confirmed"
);
```

Notez que le paramètre de confirmation est fixé à 'confirmed'. Cela signifie que nous attendons que les transactions soient confirmées au lieu d'être finalisées. Cela signifie que nous attendons que la super majorité du réseau déclare que la transaction est valide. Cela prend environ 400 ms et il n'y a jamais eu de transaction confirmée qui n'ait pas été finalisée. Ainsi, pour les jeux, il s'agit du paramètre de confirmation parfait.

### Initialisation des données du joueur

La première chose à faire est de trouver l'adresse du compte du joueur en utilisant la chaîne de caractères `player` et la clé publique du joueur comme seeds. Ensuite, nous appelons `initPlayer` pour créer le compte.

```js
const [pda] = PublicKey.findProgramAddressSync(
  [Buffer.from("player", "utf8"), publicKey.toBuffer()],
  new PublicKey(LUMBERJACK_PROGRAM_ID)
);

const transaction = program.methods
  .initPlayer()
  .accounts({
    player: pda,
    signer: publicKey,
    systemProgram: SystemProgram.programId,
  })
  .transaction();

const tx = await transaction;
const txSig = await sendTransaction(tx, connection, {
  skipPreflight: true,
});

await connection.confirmTransaction(txSig, "confirmed");

```

### S'abonner aux mises à jour du compte

Vous pouvez voir ici comment obtenir les données d'un compte dans le client JS et comment s'abonner à un compte. `connection.onAccountChange` crée une connexion au nœud RPC qui transmettra au client toutes les modifications apportées au compte.
Cette méthode est plus rapide que de récupérer les nouvelles données du compte après chaque modification.
Nous pouvons alors utiliser `program.coder` pour décoder les données du compte et les utiliser directement dans le jeu.

```js
useEffect(() => {
    if (!publicKey) {return;}
    const [pda] = PublicKey.findProgramAddressSync(
        [Buffer.from("player", "utf8"), publicKey.toBuffer()],
        new PublicKey(LUMBERJACK_PROGRAM_ID)
      );
    try {
      program.account.playerData.fetch(pda).then((data) => {
        setGameState(data);
      });
    } catch (e) {
      window.alert("No player data found, please init!");
    }

    connection.onAccountChange(pda, (account) => {
        setGameState(program.coder.accounts.decode("playerData", account.data));
    });

  }, [publicKey]);
```

### Calculer l'énergie et afficher le décompte

Dans le client javascript, nous pouvons alors exécuter la même logique que dans le programme pour précalculer la quantité d'énergie dont dispose le joueur à ce moment-là et afficher un décompte pour le joueur afin qu'il sache quand la prochaine énergie sera disponible :

```js
useEffect(() => {
    const interval = setInterval(async () => {
        if (gameState == null || gameState.lastLogin == undefined || gameState.energy >= 10) {return;}
        const lastLoginTime = gameState.lastLogin * 1000;
        let timePassed = ((Date.now() - lastLoginTime) / 1000);
        while (timePassed > TIME_TO_REFILL_ENERGY && gameState.energy < MAX_ENERGY) {
            gameState.energy = (parseInt(gameState.energy) + 1);
            gameState.lastLogin = parseInt(gameState.lastLogin) + TIME_TO_REFILL_ENERGY;
            timePassed -= TIME_TO_REFILL_ENERGY;
        }
        setTimePassed(timePassed);
        let nextEnergyIn = Math.floor(TIME_TO_REFILL_ENERGY - timePassed);
        if (nextEnergyIn < TIME_TO_REFILL_ENERGY && nextEnergyIn > 0) {
            setEnergyNextIn(nextEnergyIn);
        } else {
            setEnergyNextIn(0);
        }

    }, 1000);

    return () => clearInterval(interval);
}, [gameState, timePassed]);

...

{(gameState && <div className="flex flex-col items-center">
    {("Wood: " + gameState.wood + " Energy: " + gameState.energy + " Next energy in: " + nextEnergyIn )}
</div>)}

```

Avec cela, vous pouvez maintenant construire n'importe quel jeu basé sur un système d'énergie. Même si quelqu'un construit un bot pour le jeu, le mieux qu'il puisse faire est de jouer de manière optimale. Selon la logique de votre jeu, cela peut même être plus simple à atteindre en jouant normalement.

Ce jeu devient encore meilleur lorsqu'il est combiné avec le chapitre [Interagir avec des jetons](../gaming/interact-with-tokens) et que vous distribuez des jetons aux joueurs.
