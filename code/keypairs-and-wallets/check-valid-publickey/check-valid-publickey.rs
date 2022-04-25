use solana_sdk::pubkey::{Pubkey};
use std::str::FromStr;

fn main() {
    // Note that Keypair::new() will always give a public key that is valid for users
    let pubkey = Pubkey::from_str("5oNDL3swdJJF1g9DzJiZ4ynHXgszjAEpUkxVYejchzrY").unwrap(); // Valid public key
    println!("{:?}", pubkey.is_on_curve()); // Lies on the ed25519 curve and is suitable for users

    let off_curve_address = Pubkey::from_str("4BJXYkfvg37zEmBbsacZjeQDpTNx91KppxFJxRqrz48e").unwrap(); // Valid public key
    println!("{:?}", off_curve_address.is_on_curve()); // Not on the ed25519 curve, therefore not suitable for users

    let error_pubkey = Pubkey::from_str("testPubkey").unwrap(); // Is not a valid public key
}
