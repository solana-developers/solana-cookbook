#[derive(Accounts)]
#[instruction(text: String, vector_capacity: u16)]
pub struct InitializeAccount<'info> {
    #[account(init, payer=user, space=Account::space(&text, vector_capacity))]
    pub account: Account<'info, Account>,
    #[account(mut)]
    pub user: Signer<'info>,
    pub system_program: Program<'info, System>,
}
