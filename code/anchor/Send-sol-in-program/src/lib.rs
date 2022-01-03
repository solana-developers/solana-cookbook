use anchor_lang::prelude::*;

declare_id!("8Lc81NeVg8UUfQiM1dRsxRhfAn7exEixmXFUhR4vjnYs");

#[program]
pub mod sendsoltokey {
    use super::*;
    pub fn start(ctx: Context<Start>) -> ProgramResult {
      
        let base_account = &mut ctx.accounts.base_account;
        if base_account.initialized == false{
            base_account.initialized = true;
        }
        
        Ok(())
    }
 
    pub fn send_sol(ctx: Context<SendSol>, amount: u64) -> ProgramResult {
        
        let ix = anchor_lang::solana_program::system_instruction::transfer(
            &ctx.accounts.from.key(),
            &ctx.accounts.to.key(),
            amount,
        );
        anchor_lang::solana_program::program::invoke(
            &ix,
            &[
                ctx.accounts.from.to_account_info(),
                ctx.accounts.to.to_account_info(),
            ],
        )
    }
}


#[derive(Accounts)]
pub struct Start<'info> {
    #[account(init, payer = user, space = 9000)]
    pub base_account: Account<'info, BaseAccount>,
    #[account(mut)]
    pub user: Signer<'info>,
    pub system_program: Program<'info, System>,
}

//Send sol struct
#[derive(Accounts)]
pub struct SendSol<'info> {
    #[account(mut)]
    from: Signer<'info>,
    #[account(mut)]
    to:AccountInfo<'info>,
    system_program: Program<'info, System>,
}

#[account]
pub struct BaseAccount {
   pub initialized: bool 
}