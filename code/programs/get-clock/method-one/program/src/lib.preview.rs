pub fn process_instruction(
    _program_id: &Pubkey,
    accounts: &[AccountInfo],
    _instruction_data: &[u8],
) -> ProgramResult {
    let accounts_iter = &mut accounts.iter();
    // Payer account
    let payer_account = next_account_info(accounts_iter)?;
    // Hello state account
    // let some_account = ....

    // Clock sysvar
    let sysvar_clock_pubkey = next_account_info(accounts_iter)?;

    // Getting Clock's time stamp
    let clock = Clock::from_account_info(&sysvar_clock_pubkey)?;
    let current_timestamp = clock.unix_timestamp;
    msg!("Current Timestamp: {}", current_timestamp);

    Ok(())
}
