let rpc_url = String::from("http://127.0.0.1:8899");
let client = RpcClient::new_with_commitment(rpc_url, CommitmentConfig::confirmed());