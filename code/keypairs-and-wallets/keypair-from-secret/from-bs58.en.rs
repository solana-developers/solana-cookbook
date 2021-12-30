use solana_sdk::signature::{Keypair, Signer};

fn main() {
    let wallet = Keypair::from_base58_string(
        "5MaiiCavjCmn9Hs1o3eznqDEhRwxo7pXiAYez7keQUviUkauRiTMD8DrESdrNjN8zd9mTmVhRvBJeg5vhyvgrAhG",
    );
    let pubkey = Signer::pubkey(&wallet);
    println!("Created keypair: {}", pubkey)
}
