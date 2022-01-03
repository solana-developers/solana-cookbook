use solana_client::rpc_client::RpcClient;
use solana_program::system_instruction;
use solana_sdk::commitment_config::CommitmentConfig;
use solana_sdk::native_token::LAMPORTS_PER_SOL;
use solana_sdk::signature::{Keypair, Signer};

fn main() {
    let rpc_url = String::from("https://api.devnet.solana.com");
    let connection = RpcClient::new_with_commitment(rpc_url, CommitmentConfig::confirmed());

    let from_keypair = Keypair::new();
    let from_pubkey = Signer::pubkey(&from_keypair);

    match connection.request_airdrop(&from_pubkey, LAMPORTS_PER_SOL) {
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

    let space = 0;
    let rent_exemption_amount = connection
        .get_minimum_balance_for_rent_exemption(space)
        .unwrap();

    let new_account_keypair = Keypair::new();
    let new_account_pubkey = Signer::pubkey(&new_account_keypair);

    let create_account_ix = system_instruction::create_account(
        &from_pubkey,
        &new_account_pubkey,
        rent_exemption_amount,
        space as u64,
        &from_pubkey,
    );

    let (recent_blockhash, _) = connection.get_recent_blockhash().unwrap();

    let create_account_tx = solana_sdk::transaction::Transaction::new_signed_with_payer(
        &[create_account_ix],
        Some(&from_pubkey),
        &[&from_keypair, &new_account_keypair],
        recent_blockhash,
    );

    match connection.send_and_confirm_transaction(&create_account_tx) {
        Ok(sig) => loop {
            if let Ok(confirmed) = connection.confirm_transaction(&sig) {
                if confirmed {
                    println!("Transaction: {} Status: {}", sig, confirmed);
                    break;
                }
            }
        },
        Err(_) => println!("Error creating system account"),
    };
}
