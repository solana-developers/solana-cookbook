/// Initialize a new program account, which is the first in AccountInfo array
fn initialize_account(accounts: &[AccountInfo]) -> ProgramResult {
    msg!("Initialize account");
    let account_info_iter = &mut accounts.iter();
    let program_account = next_account_info(account_info_iter)?;
    let mut account_data = program_account.data.borrow_mut();
    // Here we use unpack_unchecked as we have yet to initialize
    // Had we tried to use unpack it would fail because, well, chicken and egg
    let mut account_state = ProgramAccountState::unpack_unchecked(&account_data)?;
    // We double check that we haven't already initialized this accounts data
    // more than once. If we are good, we set the initialized flag
    if account_state.is_initialized() {
        return Err(SampleError::AlreadyInitializedState.into());
    } else {
        account_state.set_initialized();
    }
    // Finally, we store back to the accounts space
    ProgramAccountState::pack(account_state, &mut account_data).unwrap();
    Ok(())
}
