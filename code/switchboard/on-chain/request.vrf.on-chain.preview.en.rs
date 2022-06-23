let vrf_request_randomness = VrfRequestRandomness {
    authority: ctx.accounts.state.to_account_info(),
    vrf: ctx.accounts.vrf.to_account_info(),
    oracle_queue: ctx.accounts.oracle_queue.to_account_info(),
    queue_authority: ctx.accounts.queue_authority.to_account_info(),
    data_buffer: ctx.accounts.data_buffer.to_account_info(),
    permission: ctx.accounts.permission.to_account_info(),
    escrow: ctx.accounts.escrow.clone(),
    payer_wallet: ctx.accounts.payer_wallet.clone(),
    payer_authority: ctx.accounts.payer_authority.to_account_info(),
    recent_blockhashes: ctx.accounts.recent_blockhashes.to_account_info(),
    program_state: ctx.accounts.program_state.to_account_info(),
    token_program: ctx.accounts.token_program.to_account_info(),
};

let vrf_key = ctx.accounts.vrf.key.clone();
let authority_key = ctx.accounts.authority.key.clone();

msg!("bump: {}", bump);
msg!("authority: {}", authority_key);
msg!("vrf: {}", vrf_key);

let state_seeds: &[&[&[u8]]] = &[&[
    &STATE_SEED,
    vrf_key.as_ref(),
    authority_key.as_ref(),
    &[bump],
]];
msg!("requesting randomness");
vrf_request_randomness.invoke_signed(
    switchboard_program,
    params.switchboard_state_bump,
    params.permission_bump,
    state_seeds,
)?;