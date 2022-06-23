use crate::*;
use anchor_lang::prelude::*;
pub use switchboard_v2::{VrfAccountData, VrfRequestRandomness};
use anchor_spl::token::Token;
use anchor_lang::solana_program::clock;

#[derive(Accounts)]
#[instruction(params: RequestResultParams)] // rpc parameters hint
pub struct RequestResult<'info> {
    #[account(
        mut,
        seeds = [
            STATE_SEED,
            vrf.key().as_ref(),
            authority.key().as_ref(),
        ],
        bump = state.load()?.bump,
        has_one = vrf,
        has_one = authority
    )]
    pub state: AccountLoader<'info, VrfClient>,
    #[account(signer)]
    pub authority: AccountInfo<'info>,
    #[account(constraint = switchboard_program.executable == true)]
    pub switchboard_program: AccountInfo<'info>,
    #[account(mut, constraint = vrf.owner.as_ref() == switchboard_program.key().as_ref())]
    pub vrf: AccountInfo<'info>,
    #[account(mut, constraint = oracle_queue.owner.as_ref() == switchboard_program.key().as_ref())]
    pub oracle_queue: AccountInfo<'info>,
    pub queue_authority: UncheckedAccount<'info>,
    #[account(constraint = data_buffer.owner.as_ref() == switchboard_program.key().as_ref())]
    pub data_buffer: AccountInfo<'info>,
    #[account(mut, constraint = permission.owner.as_ref() == switchboard_program.key().as_ref())]
    pub permission: AccountInfo<'info>,
    #[account(mut, constraint = escrow.owner == program_state.key())]
    pub escrow: Account<'info, TokenAccount>,
    #[account(mut, constraint = payer_wallet.owner == payer_authority.key())]
    pub payer_wallet: Account<'info, TokenAccount>,
    #[account(signer)]
    pub payer_authority: AccountInfo<'info>,
    #[account(address = solana_program::sysvar::recent_blockhashes::ID)]
    pub recent_blockhashes: AccountInfo<'info>,
    #[account(constraint = program_state.owner.as_ref() == switchboard_program.key().as_ref())]
    pub program_state: AccountInfo<'info>,
    #[account(address = anchor_spl::token::ID)]
    pub token_program: Program<'info, Token>,
}

#[derive(Clone, AnchorSerialize, AnchorDeserialize)]
pub struct RequestResultParams {
    pub permission_bump: u8,
    pub switchboard_state_bump: u8,
}

impl RequestResult<'_> {
    pub fn validate(&self, _ctx: &Context<Self>, _params: &RequestResultParams) -> Result<()> {
        Ok(())
    }

    pub fn actuate(ctx: &Context<Self>, params: &RequestResultParams) -> Result<()> {
        let client_state = ctx.accounts.state.load()?;
        let bump = client_state.bump.clone();
        let max_result = client_state.max_result.clone();
        drop(client_state);

        let switchboard_program = ctx.accounts.switchboard_program.to_account_info();

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

        emit!(RequestingRandomness{
            vrf_client: ctx.accounts.state.key(),
            max_result: max_result,
            timestamp: clock::Clock::get().unwrap().unix_timestamp
        });

        msg!("randomness requested successfully");
        Ok(())
    }
}
