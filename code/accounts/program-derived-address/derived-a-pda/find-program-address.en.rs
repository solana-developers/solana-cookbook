use solana_program::pubkey::Pubkey;
use std::str::FromStr;

fn main() {
    let program_id = Pubkey::from_str("G1DCNUQTSGHehwdLCAmRyAG8hf51eCHrLNUqkgGKYASj").unwrap();

    let (pda, bump_seed) = Pubkey::find_program_address(&[b"test"], &program_id);
    println!("pda: {}, bump: {}", pda, bump_seed);
}
