/// Setup the test validator passing features
/// you want to deactivate before running transactions
pub fn setup_validator(
    invalidate_features: Vec<Pubkey>,
) -> Result<(TestValidator, Keypair), Box<dyn error::Error>> {
    // Extend environment variable to include our program location
    std::env::set_var("BPF_OUT_DIR", PROG_PATH);
    // Instantiate the test validator
    let mut test_validator = TestValidatorGenesis::default();
    // Once instantiated, TestValidatorGenesis configuration functions follow
    // a builder pattern enabling chaining of settings function calls
    let (test_validator, kp) = test_validator
        // Set the ledger path and name
        // maps to `solana-test-validator --ledger <DIR>`
        .ledger_path(LEDGER_PATH)
        // Load our program. Ignored if reusing ledger
        // maps to `solana-test-validator --bpf-program <ADDRESS_OR_PATH BPF_PROGRAM.SO>`
        .add_program(PROG_NAME, PROG_KEY)
        // Identify features to deactivate. Ignored if reusing ledger
        // maps to `solana-test-validator --deactivate-feature <FEATURE_PUBKEY>`
        .deactivate_features(&invalidate_features)
        // Start the test validator
        .start();
    Ok((test_validator, kp))
}

/// Convenience function to remove existing ledger before TestValidatorGenesis setup
/// maps to `solana-test-validator ... --reset`
pub fn clean_ledger_setup_validator(
    invalidate_features: Vec<Pubkey>,
) -> Result<(TestValidator, Keypair), Box<dyn error::Error>> {
    if PathBuf::from_str(LEDGER_PATH).unwrap().exists() {
        std::fs::remove_dir_all(LEDGER_PATH).unwrap();
    }
    setup_validator(invalidate_features)
}

/// Submits a transaction with programs instruction
/// Boiler plate
fn submit_transaction(
    rpc_client: &RpcClient,
    wallet_signer: &dyn Signer,
    instructions: Vec<Instruction>,
) -> Result<Signature, Box<dyn std::error::Error>> {
    let mut transaction =
        Transaction::new_unsigned(Message::new(&instructions, Some(&wallet_signer.pubkey())));
    let recent_blockhash = rpc_client
        .get_latest_blockhash()
        .map_err(|err| format!("error: unable to get recent blockhash: {}", err))?;
    transaction
        .try_sign(&vec![wallet_signer], recent_blockhash)
        .map_err(|err| format!("error: failed to sign transaction: {}", err))?;
    let signature = rpc_client
        .send_and_confirm_transaction(&transaction)
        .map_err(|err| format!("error: send transaction: {}", err))?;
    Ok(signature)
}
