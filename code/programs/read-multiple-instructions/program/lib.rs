let mut idx = 0;
let num_instructions = read_u16(&mut idx, &instruction_sysvar)
    .map_err(|_| ProgramError::InvalidAccountData)?;

let associated_token =
    Pubkey::from_str("ATokenGPvbdGVxr1b2hvZbsiqW5xWH25efTNsLJA8knL").unwrap();

for index in 0..num_instructions {
    let mut current = 2 + (index * 2) as usize;
    let start = read_u16(&mut current, &instruction_sysvar).unwrap();

    current = start as usize;
    let num_accounts = read_u16(&mut current, &instruction_sysvar).unwrap();
    current += (num_accounts as usize) * (1 + 32);
    let program_id = read_pubkey(&mut current, &instruction_sysvar).unwrap();

    if program_id != nft_candy_machine_v2::id()
        && program_id != spl_token::id()
        && program_id != anchor_lang::solana_program::system_program::ID
        && program_id != associated_token
    {
        msg!("Transaction had ix with program id {}", program_id);
        return Err(ErrorCode::SuspiciousTransaction.into());
    }
}