use solana_program::{
    account_info::{next_account_info, AccountInfo},
    entrypoint,
    entrypoint::ProgramResult,
    msg,
    program::invoke,
    program_error::ProgramError,
    pubkey::Pubkey,
    rent::Rent,
    system_instruction::create_account,
    sysvar::Sysvar,
};

entrypoint!(process_instruction);

// Accounts required
/// 1. [signer, writable] Payer Account
/// 2. [signer, writable] General State Account
/// 3. [] System Program
pub fn process_instruction(
    program_id: &Pubkey,
    accounts: &[AccountInfo],
    instruction_data: &[u8],
) -> ProgramResult {
    let accounts_iter = &mut accounts.iter();

    // Accounts required for token transfer

    // 1. Payer account for the state account creation
    let payer_account = next_account_info(accounts_iter)?;
    // 2. Token account we hold
    let general_state_account = next_account_info(accounts_iter)?;
    // 3. System Program
    let system_program = next_account_info(accounts_iter)?;

    msg!(
        "Creating account for {}",
        general_state_account.key.to_string()
    );

    // Parsing the token transfer amount from instruction data
    // a. Getting the 0th to 8th index of the u8 byte array
    // b. Converting the obtained non zero u8 to a proper u8 (as little endian integers)
    // c. Converting the little endian integers to a u64 number
    let account_span = instruction_data
        .get(..8)
        .and_then(|slice| slice.try_into().ok())
        .map(u64::from_le_bytes)
        .ok_or(ProgramError::InvalidAccountData)?;

    let lamports_required = (Rent::get()?).minimum_balance(account_span as usize);

    // Creating a new TransactionInstruction
    /*
        Internal representation of the instruction's return value (Instruction)

        Instruction::new_with_bincode(
            system_program::id(), // NOT PASSED FROM USER
            &SystemInstruction::CreateAccount {
                lamports,
                space,
                owner: *owner,
            },
            account_metas,
        )
    */

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

    // Passing the TransactionInstruction to send (with the issused program_id)
    invoke(&create_account_instruction, &required_accounts_for_create)?;

    msg!("Transfer successful");

    Ok(())
}
