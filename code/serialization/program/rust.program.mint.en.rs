/// Mint a key/pair to the programs account, which is the first in accounts
fn mint_keypair_to_account(accounts: &[AccountInfo], key: String, value: String) -> ProgramResult {
    msg!("Mint to account");
    let account_info_iter = &mut accounts.iter();
    let program_account = next_account_info(account_info_iter)?;
    let mut account_data = program_account.data.borrow_mut();
    // Unpacking an uninitialized account state will fail
    let mut account_state = ProgramAccountState::unpack(&account_data)?;
    // Add the key value pair to the underlying BTreeMap
    account_state.add(key, value)?;
    // Finally, serialize back to the accounts data
    ProgramAccountState::pack(account_state, &mut account_data)?;
    Ok(())
}
