fn process_init_map(accounts: &[AccountInfo], program_id: &Pubkey) -> ProgramResult {
    let account_info_iter = &mut accounts.iter();

    let authority_account = next_account_info(account_info_iter)?;
    let map_account = next_account_info(account_info_iter)?;
    let system_program = next_account_info(account_info_iter)?;

    if !authority_account.is_signer {
        return Err(ProgramError::MissingRequiredSignature)
    }

    let (map_pda, map_bump) = Pubkey::find_program_address(
        &[b"map".as_ref()],
        program_id
    );

    if map_pda != *map_account.key || !map_account.is_writable || !map_account.data_is_empty() {
        return Err(BlogError::InvalidMapAccount.into())
    }

    let rent = Rent::get()?;
    let rent_lamports = rent.minimum_balance(MapAccount::LEN);

    let create_map_ix = &system_instruction::create_account(
        authority_account.key, 
        map_account.key, 
        rent_lamports, 
        MapAccount::LEN.try_into().unwrap(), 
        program_id
    );

    msg!("Creating MapAccount account");
    invoke_signed(
        create_map_ix, 
        &[
            authority_account.clone(),
            map_account.clone(),
            system_program.clone()
        ],
        &[&[
            b"map".as_ref(),
            &[map_bump]
        ]]
    )?;

    msg!("Deserializing MapAccount account");
    let mut map_state = try_from_slice_unchecked::<MapAccount>(&map_account.data.borrow()).unwrap();
    let empty_map: BTreeMap<Pubkey, Pubkey> = BTreeMap::new();

    map_state.is_initialized = 1;
    map_state.map = empty_map;

    msg!("Serializing MapAccount account");
    map_state.serialize(&mut &mut map_account.data.borrow_mut()[..])?;

    Ok(())
}

fn process_insert_entry(accounts: &[AccountInfo], program_id: &Pubkey) -> ProgramResult {
    
    let account_info_iter = &mut accounts.iter();

    let a_account = next_account_info(account_info_iter)?;
    let b_account = next_account_info(account_info_iter)?;
    let map_account = next_account_info(account_info_iter)?;

    if !a_account.is_signer {
        return Err(ProgramError::MissingRequiredSignature)
    }

    if map_account.data.borrow()[0] == 0 || *map_account.owner != *program_id {
        return Err(BlogError::InvalidMapAccount.into())
    }

    msg!("Deserializing MapAccount account");
    let mut map_state = try_from_slice_unchecked::<MapAccount>(&map_account.data.borrow())?;

    if map_state.map.contains_key(a_account.key) {
        return Err(BlogError::AccountAlreadyHasEntry.into())
    }

    map_state.map.insert(*a_account.key, *b_account.key);
    
    msg!("Serializing MapAccount account");
    map_state.serialize(&mut &mut map_account.data.borrow_mut()[..])?;

    Ok(())
}