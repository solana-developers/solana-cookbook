#[test]
fn test_deactivate_tx_cu_pass() {
    // Run with all features activated except 'transaction wide compute cap'
    let inv_feat = vec![TXWIDE_LIMITS];
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
        [
            // This instruction adds CU to transaction budget (1.9.2) but does nothing
            // when we deactivate the 'transaction wide compute cap' feature
            ComputeBudgetInstruction::request_units(400_000u32),
            // Add two (2) instructions to transaction
            // Replace with instructions that make sense for your program
            // You will see that each instruction has the 1.8.x 200_000 CU per budget
            Instruction::new_with_borsh(PROG_KEY, &0u8, accounts.to_vec()),
            Instruction::new_with_borsh(PROG_KEY, &1u8, accounts.to_vec()),
        ]
        .to_vec(),
    );
    assert!(txn.is_ok());
}
