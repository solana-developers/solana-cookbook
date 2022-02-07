let rpc_url = String::from("https://api.mainnet-beta.solana.com");
let client = RpcClient::new_with_commitment(rpc_url, CommitmentConfig::confirmed());
