use solana_client::rpc_client::RpcClient;
use solana_program::native_token::LAMPORTS_PER_SOL;
use solana_program::pubkey::Pubkey;
use solana_sdk::commitment_config::CommitmentConfig;
use std::str::FromStr;

fn main() {
    let rpc_url = String::from("https://api.devnet.solana.com");
    let connection = RpcClient::new_with_commitment(rpc_url, CommitmentConfig::confirmed());

    let wallet = Pubkey::from_str("G2FAbFQPFa5qKXCetoFZQEvF9BVvCKbvUZvodpVidnoY").unwrap();
    let balance = connection.get_balance(&wallet).unwrap();

    println!(
        "The account {}, has {} SOL ",
        wallet,
        balance / LAMPORTS_PER_SOL
    );
}
