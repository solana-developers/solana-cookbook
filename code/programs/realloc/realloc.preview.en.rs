// adding a publickey to the account
let new_size = pda_account.data.borrow().len() + 32;

let rent = Rent::get()?;
let new_minimum_balance = rent.minimum_balance(new_size);

let lamports_diff = new_minimum_balance.saturating_sub(pda_account.lamports());
invoke(
    &system_instruction::transfer(funding_account.key, pda_account.key, lamports_diff),
    &[
        funding_account.clone(),
        pda_account.clone(),
        system_program.clone(),
    ],
)?;

pda_account.realloc(new_size, false)?;