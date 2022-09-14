let txn = submit_transaction(
  &connection,
  &wallet_signer,
  // Array of instructions: 0: Set Compute Unit Limt, 1: Set Prioritization Fee, 
  // 2: Do something, 3: Do something else
  [ComputeBudgetInstruction::set_compute_unit_limit(1_000_000u32),
  ComputeBudgetInstruction::set_compute_unit_price(1u32),
  Instruction::new_with_borsh(PROG_KEY, &0u8, accounts.to_vec()),
  Instruction::new_with_borsh(PROG_KEY, &0u8, accounts.to_vec())].to_vec(),
)?;
