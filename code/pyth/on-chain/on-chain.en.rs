use anchor_lang::prelude::*;
use pyth_client::{self, load_price, Price};

declare_id!("6B7XgKFmo73geJY8ZboSpLhkTumvwXeCXBpeP7nCT35w");

#[program]
pub mod pyth_test {
    use super::*;

    pub fn get_sol_price(ctx: Context<SolPrice>) -> Result<()> {
        let pyth_price_info = &ctx.accounts.pyth_account;
        let pyth_price_data = &pyth_price_info.try_borrow_data()?;
        let price_account: Price = *load_price(pyth_price_data).unwrap();

        msg!("price_account .. {:?}", pyth_price_info.key);
        msg!("price_type ... {:?}", price_account.ptype);
        msg!("price ........ {}", price_account.agg.price);

        Ok(())
    }
}

#[derive(Accounts)]
pub struct SolPrice<'info> {
    #[account(mut)]
    pub user_account: Signer<'info>,
    pub pyth_account: UncheckedAccount<'info>,
    pub system_program: UncheckedAccount<'info>,
    pub rent: Sysvar<'info, Rent>,
}
