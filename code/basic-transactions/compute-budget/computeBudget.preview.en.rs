let txn = submit_transaction(
  &connection,
  &wallet_signer,
  // Array of instructions: 0: Increase Budget, 1: Do something, 2: Do something else
  [ComputeBudgetInstruction::request_units(400_000u32),
  Instruction::new_with_borsh(PROG_KEY, &0u8, accounts.to_vec()),
  Instruction::new_with_borsh(PROG_KEY, &0u8, accounts.to_vec())].to_vec(),
)?;