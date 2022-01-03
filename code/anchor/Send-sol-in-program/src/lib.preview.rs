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

// this is the struct that holds context to give to the send sol function
#[derive(Accounts)]
pub struct SendSol<'info> {
    #[account(mut)]
    from: Signer<'info>,
    #[account(mut)]
    to:AccountInfo<'info>,
    system_program: Program<'info, System>,
}