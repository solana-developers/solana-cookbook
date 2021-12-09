invoke_signed(
    &system_instruction::create_account(
        &payer_account_info.key,
        &pda_account_info.key,
        rent_lamports,
        space.into(),
        program_id
    ),
    &[
        payer_account_info.clone(),
        pda_account_info.clone()
    ],
    &[&[&payer_account_info.key.as_ref(), &[bump]]]
)?;