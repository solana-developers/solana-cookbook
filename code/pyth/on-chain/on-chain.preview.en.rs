let pyth_price_info = &ctx.accounts.pyth_account;
let pyth_price_data = &pyth_price_info.try_borrow_data()?;
let price_account: Price = *load_price(pyth_price_data).unwrap();