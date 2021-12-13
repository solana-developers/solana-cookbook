let account_span = instruction_data
    .get(..8)
    .and_then(|slice| slice.try_into().ok())
    .map(u64::from_le_bytes)
    .ok_or(ProgramError::InvalidAccountData)?;

let lamports_required = (Rent::get()?).minimum_balance(account_span as usize);

let create_account_instruction = create_account(
    &payer_account.key,
    &general_state_account.key,
    lamports_required,
    account_span,
    program_id,
);

let required_accounts_for_create = [
    payer_account.clone(),
    general_state_account.clone(),
    system_program.clone(),
];

invoke(&create_account_instruction, &required_accounts_for_create)?;
