#[test]
fn test_devnet_parity_pass() {
    // Use gadget-scfs to get all deactivated features from devnet
    // must have `gadgets-scfs = "0.2.0" in Cargo.toml to use
    // Here we setup for a run that samples features only
    // from devnet
    let mut my_matrix = ScfsMatrix::new(Some(ScfsCriteria {
        clusters: Some(vec![SCFS_DEVNET.to_string()]),
        ..Default::default()
    }))
    .unwrap();
    // Run the sampler matrix
    assert!(my_matrix.run().is_ok());
    // Get all deactivated features
    let deactivated = my_matrix
        .get_features(Some(&ScfsMatrix::any_inactive))
        .unwrap();
    // Confirm we have them
    assert_ne!(deactivated.len(), 0);
    // Setup test validator and logging while deactivating all
    // features that are deactivated in devnet
    let (test_validator, main_payer) = clean_ledger_setup_validator(deactivated).unwrap();
    let connection = test_validator.get_rpc_client();
    solana_logger::setup_with_default("solana_runtime::message=debug");

    let accounts = &[];
    let txn = submit_transaction(
        &connection,
        &main_payer,
        [
            // Add two (2) instructions to transaction
            // Replace with instructions that make sense for your program
            Instruction::new_with_borsh(PROG_KEY, &0u8, accounts.to_vec()),
            Instruction::new_with_borsh(PROG_KEY, &1u8, accounts.to_vec()),
        ]
        .to_vec(),
    );
    assert!(txn.is_ok());
}
