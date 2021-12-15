let dest_starting_lamports = dest_account_info.lamports();
**dest_account_info.lamports.borrow_mut() = dest_starting_lamports
    .checked_add(source_account_info.lamports())
    .unwrap();
**source_account_info.lamports.borrow_mut() = 0;
