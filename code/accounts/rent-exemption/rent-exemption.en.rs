use solana_client::rpc_client::RpcClient;
use solana_sdk::commitment_config::CommitmentConfig;

fn main() {
    let rpc_url = String::from("https://api.devnet.solana.com");
    let connection = RpcClient::new_with_commitment(rpc_url, CommitmentConfig::confirmed());
    let data_length = 1500;

    let rent_exemption_amount = connection
        .get_minimum_balance_for_rent_exemption(data_length)
        .unwrap();

    println!("rent exemption amount: {}", rent_exemption_amount);
}
