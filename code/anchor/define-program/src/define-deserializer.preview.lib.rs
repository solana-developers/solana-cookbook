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
