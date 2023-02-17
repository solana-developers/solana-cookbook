use anchor_lang::prelude::*;

use switchboard_v2::AggregatorAccountData;

declare_id!("HDa6A4wLjEymb8Cv3UGeGBnFUNCUEMpoiVBbkTKAkfrt");

#[program]
pub mod get_result {
    use super::*;
   
    pub fn get_result(ctx: Context<GetResult>) -> Result<()> {
        let aggregator = &ctx.accounts.aggregator_feed.load()?;
        let val:f64 = aggregator
            .get_result()?
            .try_into()?;

        msg!("Current feed result is {}!", val);
        Ok(())
    }
   
}

#[derive(Accounts)]
pub struct GetResult<'info> {
    pub authority: Signer<'info>,
    /// CHECK: field is unsafe
    pub aggregator_feed: AccountLoader<'info, AggregatorAccountData>, // pass aggregator key
}