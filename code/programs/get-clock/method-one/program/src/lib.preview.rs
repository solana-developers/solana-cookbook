let clock = Clock::from_account_info(&sysvar_clock_pubkey)?;
let current_timestamp = clock.unix_timestamp;