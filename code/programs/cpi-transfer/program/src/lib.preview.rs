pub fn process_instruction(
    _program_id: &Pubkey,
    accounts: &[AccountInfo],
    instruction_data: &[u8],
) -> ProgramResult {
    let accounts_iter = &mut accounts.iter();

    let source_token_account = next_account_info(accounts_iter)?;
    let destination_token_account = next_account_info(accounts_iter)?;
    let source_token_account_holder = next_account_info(accounts_iter)?;
    let token_program = next_account_info(accounts_iter)?;

    let token_transfer_amount = instruction_data
        .get(..8)
        .and_then(|slice| slice.try_into().ok())
        .map(u64::from_le_bytes)
        .ok_or(ProgramError::InvalidAccountData)?;

    msg!(
        "Transferring {} tokens from {} to {}",
        token_transfer_amount,
        source_token_account.key.to_string(),
        destination_token_account.key.to_string()
    );

    let transfer_tokens_instruction = transfer(
        &token_program.key,
        &source_token_account.key,
        &destination_token_account.key,
        &source_token_account_holder.key,
        &[&source_token_account_holder.key],
        token_transfer_amount,
    )?;

    let required_accounts_for_transfer = [
        source_token_account.clone(),
        destination_token_account.clone(),
        source_token_account_holder.clone(),
    ];

    invoke(
        &transfer_tokens_instruction,
        &required_accounts_for_transfer,
    )?;

    msg!("Transfer successful :)");

    Ok(())
}