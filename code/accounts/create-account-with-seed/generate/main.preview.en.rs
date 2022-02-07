use solana_program::pubkey::Pubkey;
use solana_sdk::signature::{Keypair, Signer};

fn main() {
    let base_pubkey = Keypair::new().pubkey();
    let seed = "robot001";
    let program_id = solana_program::system_program::id();

    let derived_pubkey = Pubkey::create_with_seed(&base_pubkey, seed, &program_id).unwrap();

    println!("account pubkey: {:?}", derived_pubkey);
}
