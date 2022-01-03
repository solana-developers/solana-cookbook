use solana_program::pubkey::Pubkey;
use std::str::FromStr;

fn main() {
    let program_id = Pubkey::from_str("G1DCNUQTSGHehwdLCAmRyAG8hf51eCHrLNUqkgGKYASj").unwrap();

    let pda = Pubkey::create_program_address(&[b"test"], &program_id).unwrap();
    println!("pda: {}", pda);
}
