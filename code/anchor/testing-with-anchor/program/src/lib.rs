use anchor_lang::prelude::*;
//use std::collections::HashMap;

declare_id!("Fg6PaFpoGXkYsidMpWTK6W2BeZ7FEfcYkg476zPFsLnS");

#[program]
pub mod testing_with_anchor {
    use super::*;
    pub fn initialize(ctx: Context<Initialize>, authority: Pubkey) -> ProgramResult {
        let base_account = &mut ctx.accounts.base_account;
        base_account.authority = authority;
        base_account.count = 0;
        Ok(())
    }

    pub fn increment(ctx: Context<Increment>) -> ProgramResult {
        let base_account = &mut ctx.accounts.base_account;
        base_account.count+=1;
        Ok(())
    }
}

#[derive(Accounts)]
pub struct Initialize<'info> {
    #[account(init, payer = user, space = 9000)]
    pub base_account: Account<'info, BaseAccount>,
    #[account(mut)]
    pub user:Signer<'info>,
    pub system_program: Program<'info, System>,
}

#[derive(Accounts)]
pub struct Increment<'info> {
    #[account(mut, has_one = authority)]
    pub base_account: Account<'info, BaseAccount>,
    pub authority: Signer<'info>
}

#[account]
pub struct BaseAccount {
    pub count: u64,
    pub authority: Pubkey,
}
