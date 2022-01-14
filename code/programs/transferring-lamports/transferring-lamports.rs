/// Transfers lamports from one account (must be program owned)
/// to another account. The recipient can by any account
fn transfer_service_fee_lamports(
    from_account: &AccountInfo,
    to_account: &AccountInfo,
    amount_of_lamports: u64,
) -> ProgramResult {
    // Does the from account have enough lamports to transfer?
    if **from_account.try_borrow_lamports()? < amount_of_lamports {
        return Err(CustomError::InsufficientFundsForTransaction.into());
    }
    // Debit from_account and credit to_account
    **from_account.try_borrow_mut_lamports()? -= amount_of_lamports;
    **to_account.try_borrow_mut_lamports()? += amount_of_lamports;
    Ok(())
}

/// Primary function handler associated with instruction sent
/// to your program
fn instruction_handler(accounts: &[AccountInfo]) -> ProgramResult {
    // Get the 'from' and 'to' accounts
    let account_info_iter = &mut accounts.iter();
    let from_account = next_account_info(account_info_iter)?;
    let to_service_account = next_account_info(account_info_iter)?;

    // Extract a service 'fee' of 5 lamports for performing this instruction
    transfer_service_fee_lamports(from_account, to_service_account, 5u64)?;

    // Perform the primary instruction
    // ... etc.

    Ok(())
}
