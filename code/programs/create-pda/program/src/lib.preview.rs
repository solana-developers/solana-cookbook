let create_pda_account_ix = system_instruction::create_account(
    &funding_account.key,
    &pda_account.key,
    lamports_required,
    ACCOUNT_DATA_LEN.try_into().unwrap(),
    &program_id,
);

invoke_signed(
    &create_pda_account_ix,
    &[funding_account.clone(), pda_account.clone()],
    &[signers_seeds],
)?;