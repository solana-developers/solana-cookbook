let ws_url = String::from("wss://api.devnet.solana.com/");
let (mut client, receiver) = PubsubClient::account_subscribe(
    &ws_url,
    &pubkey,
    Some(RpcAccountInfoConfig {
        encoding: None,
        data_slice: None,
        commitment: Some(CommitmentConfig::confirmed()),
    }),
).unwrap();
let message = match receiver.recv().unwrap();
println!("{:?}", message)