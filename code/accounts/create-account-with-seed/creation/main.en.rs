use solana_client::rpc_client::RpcClient;
use solana_program::pubkey::Pubkey;
use solana_program::system_instruction;
use solana_sdk::commitment_config::CommitmentConfig;
use solana_sdk::native_token::LAMPORTS_PER_SOL;
use solana_sdk::signature::{Keypair, Signer};

fn main() {
    let rpc_url = String::from("https://api.devnet.solana.com");
    let connection = RpcClient::new_with_commitment(rpc_url, CommitmentConfig::confirmed());

    let fee_payer_keypair = Keypair::new();
    let fee_payer_pubkey = Signer::pubkey(&fee_payer_keypair);

    let base_keypair = Keypair::new();
    let base_pubkey = Signer::pubkey(&base_keypair);

    let seed = "robot001";
    let program_id = solana_program::system_program::id();

    let derived_pubkey = Pubkey::create_with_seed(&base_pubkey, seed, &program_id).unwrap();

    match connection.request_airdrop(&fee_payer_pubkey, LAMPORTS_PER_SOL) {
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

    let ix = system_instruction::create_account_with_seed(
        &fee_payer_pubkey,
        &derived_pubkey,
        &base_pubkey,
        seed,
        LAMPORTS_PER_SOL / 10,
        0,
        &program_id,
    );

    let (recent_blockhash, _) = connection.get_recent_blockhash().unwrap();

    let tx = solana_sdk::transaction::Transaction::new_signed_with_payer(
        &[ix],
        Some(&fee_payer_pubkey),
        &[&fee_payer_keypair, &base_keypair],
        recent_blockhash,
    );

    match connection.send_and_confirm_transaction(&tx) {
        Ok(sig) => loop {
            if let Ok(confirmed) = connection.confirm_transaction(&sig) {
                if confirmed {
                    println!("Transaction: {} Status: {}", sig, confirmed);
                    break;
                }
            }
        },
        Err(_) => println!("Error creating account with seed"),
    };
}
