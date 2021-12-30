use anchor_lang::prelude::*;

#[program]
pub mod program {
    use super::*;
    // example instruction that receives
    // an account and a boolean value as input
    pub fn instruction(ctx: Context<AccountsDeserializer>, data: bool)
        -> Result<()> {
        // get the deserialized account with permission to modify it
        let account = &mut ctx.accounts.account;
        // assign the input to a selected account's field (data)
        account.data = data;
        // declare an Ok(()) at the end to indicates no error
        Ok(())
    }

    pub fn initialize(ctx: Context<InitializeAccount>, data: bool)
        -> Result<()> {
        let account = &mut ctx.accounts.account;
        account.data = data;
        Ok(())
    }

    pub fn update(ctx: Context<UpdateAccount>, data: bool)
        -> Result<()> {
        let account = &mut ctx.accounts.account;
        account.data = data;
        Ok(())
    }
}

#[derive(Accounts)]
pub struct AccountsDeserializer<'info> {
    // account used by the instruction
    #[account(init, payer=user, space=8+1)]
    pub account: Account<'info, Account>,
    // transaction signer
    #[account(mut)]
    pub user: Signer<'info>,
    pub system_program: Program<'info, System>,
}

#[derive(Accounts)]
pub struct InitializeAccount<'info> {
    // account used by the instruction
    #[account(init, payer=user, space=8+1)]
    pub account: Account<'info, Account>,
    // transaction signer
    #[account(mut)]
    pub user: Signer<'info>,
    pub system_program: Program<'info, System>,
}

#[derive(Accounts)]
pub struct UpdateAccount<'info> {
    // account used by the instruction
    #[account(mut, has_one=authority)]
    pub account: Account<'info, Account>,
    // transaction signer
    pub user: Signer<'info>,
    pub system_program: Program<'info, System>,
}

#[account]
pub struct Account {
    pub data: bool,
}
