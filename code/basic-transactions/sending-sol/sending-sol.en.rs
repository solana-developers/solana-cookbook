use solana_client::rpc_client::RpcClient;
use solana_program::system_instruction;
use solana_sdk::commitment_config::CommitmentConfig;
use solana_sdk::native_token::LAMPORTS_PER_SOL;
use solana_sdk::signature::{Keypair, Signer};

fn main() {
    let from = Keypair::new();
    let frompubkey = Signer::pubkey(&from);

    let to = Keypair::new();
    let topubkey = Signer::pubkey(&to);

    let lamports_to_send = 69;

    let rpc_url = String::from("https://api.devnet.solana.com");
    let connection = RpcClient::new_with_commitment(rpc_url, CommitmentConfig::confirmed());

    ///Airdropping some Sol to the 'from' account
    match connection.request_airdrop(&frompubkey, LAMPORTS_PER_SOL) {
        Ok(sig) => loop {
            if let Ok(confirmed) = connection.confirm_transaction(&sig) {
                if confirmed {
                    println!("Transaction: {} Status: {}", sig, confirmed);
                    break;
                }
            }
        },
        Err(_) => println!("Error requesting airdrop"),
    };

    ///Transferring to the 'to' account
    system_instruction::transfer(&frompubkey, &topubkey, lamports_to_send);
    /// Transaction: 5Y68VpHLT66GRDi7FUdV63pjUS33VGcwVnaonPR29d4rcPRxmNgnL1sGQ4EXHdJqck4QS8XZJpCXBvMCN2FMqqPL Status: true
}
