#[program]
pub mod cookbook {
    use super::*;

    pub fn print_name(ctx: Context<PrintName>, name: String) -> Result<()> {
        msg!("Hello, {}!", name);
        Ok(())
    }

    pub fn print_time(ctx: Context<PrintTime>) -> Result<()> {
        let clock = Clock::get().unwrap();

        msg!("It is {}", clock.unix_timestamp);

        Ok(())
    }

    pub fn print_random(ctx: Context<PrintRandom>) -> Result<()> {
        let recent_slothashes = &ctx.accounts.slot_hashes;
        let signer = &ctx.accounts.authority;

        if recent_slothashes.key().to_string() != "SysvarS1otHashes111111111111111111111111111" {
            return err!(MyError::InvalidSlotHashesKey);
        }

        let slots = recent_slothashes.data.borrow();
        let key_bytes = signer.key().to_bytes();
        let mut combo = vec![0u8; 32];
        for i in 0..key_bytes.len() {
            combo[i] = key_bytes[i] + slots[i];
        }
        let parsed = array_ref![combo, 4, 8];
        let random = u64::from_le_bytes(*parsed);

        msg!("Random number: {}", random);

        Ok(())
    }
}