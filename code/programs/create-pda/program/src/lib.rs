use borsh::{BorshDeserialize, BorshSerialize};
use solana_program::{
    account_info::{next_account_info, AccountInfo},
    entrypoint,
    entrypoint::ProgramResult,
    program::invoke_signed,
    program_error::ProgramError,
    pubkey::Pubkey,
    rent::Rent,
    system_instruction,
    sysvar::Sysvar,
};

entrypoint!(process_instruction);

#[derive(BorshSerialize, BorshDeserialize, Debug)]
pub struct HelloState {
    is_initialized: bool,
}

// Accounts required
/// 1. [signer, writable] Funding account
/// 2. [writable] PDA account
/// 3. [] System Program
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
    let system_program = next_account_info(accounts_iter)?;

    // Getting PDA Bump from instruction data
    let (pda_bump, _) = instruction_data
        .split_first()
        .ok_or(ProgramError::InvalidInstructionData)?;

    // Checking if passed PDA and expected PDA are equal
    let signers_seeds: &[&[u8]; 3] = &[
        b"customaddress",
        &funding_account.key.to_bytes(),
        &[*pda_bump],
    ];
    let pda = Pubkey::create_program_address(signers_seeds, program_id)?;

    if pda.ne(&pda_account.key) {
        return Err(ProgramError::InvalidAccountData);
    }

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
        &[
            funding_account.clone(),
            pda_account.clone(),
            system_program.clone(),
        ],
        &[signers_seeds],
    )?;

    // Setting state for PDA
    let mut pda_account_state = HelloState::try_from_slice(&pda_account.data.borrow())?;
    pda_account_state.is_initialized = true;
    pda_account_state.serialize(&mut &mut pda_account.data.borrow_mut()[..])?;

    Ok(())
}
