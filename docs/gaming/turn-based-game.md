---
title: How to build a turn based game
description: How to build a turn based game with a Tic Tac Toe example
---

# How to build a turn based game 

Let's have a look on how a turn based multiplayer game could be built on Solana.
For a turn based game we need to save the whole game state on chain. So we need a list of Players and a turn counter so we can use the figure out whos turn it currently is: 

```js 
#[account]
pub struct Game {
    players: [Pubkey; 2],          // (32 * 2)
    turn: u8,                      // 1
    board: [[Option<Sign>; 3]; 3], // 9 * (1 + 1) = 18
    state: GameState,              // 32 + 1
}
```

Then we can use current_player to figure out who is currently allowed to perform his turn: 

```js 
    fn current_player_index(&self) -> usize {
        ((self.turn - 1) % 2) as usize
    }

    pub fn current_player(&self) -> Pubkey {
        self.players[self.current_player_index()]
    }
```

Whenever a player wants to perform a turn we can then check if the player is currently allowed to play:

```js 
pub fn play(ctx: Context<Play>, tile: Tile) -> Result<()> {
    let game = &mut ctx.accounts.game;

    require_keys_eq!(
        game.current_player(),
        ctx.accounts.player.key(),
        TicTacToeError::NotPlayersTurn
    );

    game.play(&tile)
}
```

Here you can find a complete example:  <br/>

[Open Source Example Tic Tac Toe](https://github.com/coral-xyz/anchor-book/tree/master/programs/tic-tac-toe/programs/tic-tac-toe) <br/>
[Full Tutorial Tic Tac Toe](https://book.anchor-lang.com/anchor_in_depth/milestone_project_tic-tac-toe.html)<br/>
[On Chain Chess](https://github.com/vicyyn/sol-chess/) <br/>



