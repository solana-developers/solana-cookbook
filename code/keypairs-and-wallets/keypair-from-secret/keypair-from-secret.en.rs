use solana_sdk::signature::{Keypair, Signer};

fn main() {
    let secret_key: [u8; 64] = [
        174, 47, 154, 16, 202, 193, 206, 113, 199, 190, 53, 133, 169, 175, 31, 56, 222, 53, 138,
        189, 224, 216, 117, 173, 10, 149, 53, 45, 73, 251, 237, 246, 15, 185, 186, 82, 177, 240,
        148, 69, 241, 227, 167, 80, 141, 89, 240, 121, 121, 35, 172, 247, 68, 251, 226, 218, 48,
        63, 176, 109, 168, 89, 238, 135,
    ];

    if let Ok(wallet) = Keypair::from_bytes(&secret_key) {
        let pubkey = Signer::pubkey(&wallet);
        println!("Created keypair: {}", pubkey)
    }
}
