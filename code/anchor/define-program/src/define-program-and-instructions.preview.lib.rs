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
}
