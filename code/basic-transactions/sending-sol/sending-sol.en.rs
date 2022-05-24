use solana_client::rpc_client::RpcClient;
use solana_program::system_instruction;
use solana_sdk::commitment_config::CommitmentConfig;
use solana_sdk::native_token::LAMPORTS_PER_SOL;
use solana_sdk::signature::{Keypair, Signer};
use solana_sdk::transaction::Transaction;

fn main() {
    let from = Keypair::new();
    let frompubkey = Signer::pubkey(&from);

    let to = Keypair::new();
    let topubkey = Signer::pubkey(&to);

    let lamports_to_send = 1_000_000;

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

    ///Creating the transfer sol instruction
    let ix = system_instruction::transfer(&frompubkey, &topubkey, lamports_to_send);

    ///Putting the transfer sol instruction into a transaction
    let recent_blockhash = connection.get_latest_blockhash().expect("Failed to get latest blockhash.");
    let txn = Transaction::new_signed_with_payer(&[ix], Some(&frompubkey), &[&from], recent_blockhash);

    ///Sending the transfer sol transaction
    match connection.send_and_confirm_transaction(&txn){
        Ok(sig) => loop {
            if let Ok(confirmed) = connection.confirm_transaction(&sig) {
                if confirmed {
                    println!("Transaction: {} Status: {}", sig, confirmed);
                    break;
                }
            }
        },
        Err(e) => println!("Error transferring Sol:, {}", e),
    }

}
