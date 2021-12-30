use anchor_lang::prelude::*;

#[program]
pub mod program {
    use super::*;
    pub fn instruction(ctx: Context<InitializeAccount>, text: String, vector_capacity: u16)
        -> Result<()> {
        let account = &mut ctx.accounts.account;
        account.text = text;
        account.vector_capacity = vector_capacity;
        Ok(())
    }
}

#[derive(Accounts)]
#[instruction(text: String, vector_capacity: u16)]
pub struct NewAccount<'info> {
    #[account(init, payer=user, space=Account::space(&text, vector_capacity))]
    pub account: Account<'info, Account>,
    #[account(mut)]
    pub user: Signer<'info>,
    pub system_program: Program<'info, System>,
}

#[account]
pub struct Account {
    pub unsigned8bit: u8,
    pub unsigned16bit: u16,
    pub unsigned32bit: u32,
    pub unsigned64bit: u64,
    pub unsigned128bit: u128,
    pub signed8bit: i8,
    pub signed16bit: i16,
    pub signed32bit: i32,
    pub signed64bit: i64,
    pub signed128bit: i128,
    pub boolean: bool,
    pub character: char,
    pub pubkey: Pubkey,
    pub text: String, // dynamically-sized
    pub vector_capacity: u16, 
    pub vector: vec<Pubkey> // dynamically-sized
}

impl Account {
    fn space(text: &str, vector_capacity: u16) -> usize {
        // discriminator
        8 +
        // u8 + u16 + u32 + u64 + u128
        1 + 2 + 4 + 8 + 16 +
        // i8 + i16 + i32 + i64 + i128
        1 + 2 + 4 + 8 + 16 +
        // bool + char
        1 + 4 +
        // String (discriminator + content)
        4 + text.len() + 
        // vec of pubkeys (discriminator + content)
        4 + (vector_capacity as usize) * std::mem::size_of::<Pubkey>()
    }
}