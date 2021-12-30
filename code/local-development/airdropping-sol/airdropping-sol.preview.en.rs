match client.request_airdrop(&pubkey, LAMPORTS_PER_SOL) {
    Ok(sig) => loop {
        if let Ok(confirmed) = client.confirm_transaction(&sig) {
            if confirmed {
                println!("Transaction: {} Status: {}", sig, confirmed);
                break;
            }
        }
    },
    Err(_) => println!("Error requesting airdrop"),
};