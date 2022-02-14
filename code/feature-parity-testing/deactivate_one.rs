#[test]
fn test_base_pass() {
    // Run with all features activated (default for TestValidatorGenesis)
    let inv_feat = vec![];
    // Start validator with clean (new) ledger
    let (test_validator, main_payer) = clean_ledger_setup_validator(inv_feat).unwrap();
    // Get the RpcClient
    let connection = test_validator.get_rpc_client();
    // Capture our programs log statements
    solana_logger::setup_with_default("solana_runtime::message=debug");

    // This example doesn't require sending any accounts to program
    let accounts = &[];
    // Build instruction array and submit transaction
    let txn = submit_transaction(
        &connection,
        &main_payer,
        // Add two (2) instructions to transaction to demonstrate
        // that each instruction CU draws down from default Transaction CU (200_000)
        // Replace with instructions that make sense for your program
        [
            Instruction::new_with_borsh(PROG_KEY, &0u8, accounts.to_vec()),
            Instruction::new_with_borsh(PROG_KEY, &1u8, accounts.to_vec()),
        ]
        .to_vec(),
    );
    assert!(txn.is_ok());
}
