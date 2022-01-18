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
