let dest_starting_lamports = dest_account_info.lamports();
**dest_account_info.lamports.borrow_mut() = dest_starting_lamports
    .checked_add(source_account_info.lamports())
    .unwrap();
**source_account_info.lamports.borrow_mut() = 0;

let mut source_data = source_account_info.data.borrow_mut();
source_data.fill(0);
