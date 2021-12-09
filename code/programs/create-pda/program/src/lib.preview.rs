pub fn process_instruction(
    program_id: &Pubkey,
    accounts: &[AccountInfo],
    instruction_data: &[u8],
) -> ProgramResult {
    const ACCOUNT_DATA_LEN: usize = 1;

    let accounts_iter = &mut accounts.iter();
    // Getting required accounts
    let funding_account = next_account_info(accounts_iter)?;
    let pda_account = next_account_info(accounts_iter)?;

    // Assessing required lamports and creating transaction instruction
    let lamports_required = Rent::get()?.minimum_balance(ACCOUNT_DATA_LEN);
    let create_pda_account_ix = system_instruction::create_account(
        &funding_account.key,
        &pda_account.key,
        lamports_required,
        ACCOUNT_DATA_LEN.try_into().unwrap(),
        &program_id,
    );
    // Invoking the instruction but with PDAs as additional signer
    invoke_signed(
        &create_pda_account_ix,
        &[funding_account.clone(), pda_account.clone()],
        &[signers_seeds],
    )?;

    Ok(())
}
