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
