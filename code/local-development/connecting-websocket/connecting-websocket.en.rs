use solana_client::pubsub_client::PubsubClient;
use solana_client::rpc_config::RpcAccountInfoConfig;
use solana_sdk::commitment_config::CommitmentConfig;
use solana_sdk::signature::{Keypair, Signer};

fn main() {
    let wallet = Keypair::new();
    let pubkey = Signer::pubkey(&wallet);
    let ws_url = String::from("wss://api.devnet.solana.com/");
    println!("{}", ws_url);
    if let Ok(subscription) = PubsubClient::account_subscribe(
        &ws_url,
        &pubkey,
        Some(RpcAccountInfoConfig {
            encoding: None,
            data_slice: None,
            commitment: Some(CommitmentConfig::confirmed()),
        }),
    ) {
        let (mut ws_client, receiver) = subscription;
        println!("Subscription successful, listening for events");
        let handle = std::thread::spawn(move || loop {
            println!("Waiting for a message");
            match receiver.recv() {
                Ok(message) => println!("{:?}", message),
                Err(err) => {
                    println!("Connection broke with {:}", err);
                    break;
                }
            }
        });
        handle.join().unwrap();
        ws_client.shutdown().unwrap()
    } else {
        println!("Errooooor");
    }
}