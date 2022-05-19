fn process_create_post(
    accounts: &[AccountInfo],
    slug: String,
    title: String,
    content: String,
    program_id: &Pubkey
) -> ProgramResult {
    if slug.len() > 10 || content.len() > 20 || title.len() > 50 {
        return Err(BlogError::InvalidPostData.into())
    }

    let account_info_iter = &mut accounts.iter();

    let authority_account = next_account_info(account_info_iter)?;
    let blog_account = next_account_info(account_info_iter)?;
    let post_account = next_account_info(account_info_iter)?;
    let system_program = next_account_info(account_info_iter)?;

    if !authority_account.is_signer {
        return Err(ProgramError::MissingRequiredSignature);
    }

    let (blog_pda, _blog_bump) = Pubkey::find_program_address(
        &[b"blog".as_ref(), authority_account.key.as_ref()],
        program_id
    );
    if blog_pda != *blog_account.key || !blog_account.is_writable || blog_account.data_is_empty() {
        return Err(BlogError::InvalidBlogAccount.into())
    }

    let (post_pda, post_bump) = Pubkey::find_program_address(
        &[b"post".as_ref(), slug.as_ref(), authority_account.key.as_ref()],
        program_id
    );
    if post_pda != *post_account.key {
        return Err(BlogError::InvalidPostAccount.into())
    }

    let post_len: usize = 32 + 32 + 1 + (4 + slug.len()) + (4 + title.len()) + (4 + content.len());

    let rent = Rent::get()?;
    let rent_lamports = rent.minimum_balance(post_len);

    let create_post_pda_ix = &system_instruction::create_account(
        authority_account.key,
        post_account.key,
        rent_lamports,
        post_len.try_into().unwrap(),
        program_id
    );
    msg!("Creating post account!");
    invoke_signed(
        create_post_pda_ix, 
        &[
            authority_account.clone(),
            post_account.clone(),
            system_program.clone()
        ],
        &[&[
            b"post".as_ref(),
            slug.as_ref(),
            authority_account.key.as_ref(),
            &[post_bump]
        ]]
    )?;

    let mut post_account_state = try_from_slice_unchecked::<Post>(&post_account.data.borrow()).unwrap();
    post_account_state.author = *authority_account.key;
    post_account_state.blog = *blog_account.key;
    post_account_state.bump = post_bump;
    post_account_state.slug = slug;
    post_account_state.title = title;
    post_account_state.content = content;

    msg!("Serializing Post data");
    post_account_state.serialize(&mut &mut post_account.data.borrow_mut()[..])?;


    let mut blog_account_state = Blog::try_from_slice(&blog_account.data.borrow())?;
    blog_account_state.post_count += 1;

    msg!("Serializing Blog data");
    blog_account_state.serialize(&mut &mut blog_account.data.borrow_mut()[..])?;

    Ok(())
}

fn process_init_blog(
    accounts: &[AccountInfo],
    program_id: &Pubkey
) -> ProgramResult {
    let account_info_iter = &mut accounts.iter();
    
    let authority_account = next_account_info(account_info_iter)?;
    let blog_account = next_account_info(account_info_iter)?;
    let system_program = next_account_info(account_info_iter)?;

    if !authority_account.is_signer {
        return Err(ProgramError::MissingRequiredSignature);
    }

    let (blog_pda, blog_bump) = Pubkey::find_program_address(
        &[b"blog".as_ref(), authority_account.key.as_ref()],
        program_id 
    );
    if blog_pda != *blog_account.key {
        return Err(BlogError::InvalidBlogAccount.into())
    }

    let rent = Rent::get()?;
    let rent_lamports = rent.minimum_balance(Blog::LEN);
    
    let create_blog_pda_ix = &system_instruction::create_account(
        authority_account.key,
        blog_account.key,
        rent_lamports,
        Blog::LEN.try_into().unwrap(),
        program_id
    );
    msg!("Creating blog account!");
    invoke_signed(
        create_blog_pda_ix, 
        &[
            authority_account.clone(),
            blog_account.clone(),
            system_program.clone()
        ],
        &[&[
            b"blog".as_ref(),
            authority_account.key.as_ref(),
            &[blog_bump]
        ]]
    )?;

    let mut blog_account_state = Blog::try_from_slice(&blog_account.data.borrow())?;
    blog_account_state.authority = *authority_account.key;
    blog_account_state.bump = blog_bump;
    blog_account_state.post_count = 0;
    blog_account_state.serialize(&mut &mut blog_account.data.borrow_mut()[..])?;
    

    Ok(())
}