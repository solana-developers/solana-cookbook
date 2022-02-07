use std::{collections::BTreeMap};
use thiserror::Error;
use borsh::{BorshSerialize, BorshDeserialize};
use num_traits::FromPrimitive;
use solana_program::{sysvar::{rent::Rent, Sysvar}, entrypoint, entrypoint::ProgramResult, pubkey::Pubkey, account_info::{AccountInfo, next_account_info}, program_error::ProgramError, system_instruction, msg, program::{invoke_signed}, borsh::try_from_slice_unchecked};

entrypoint!(process_instruction);

fn process_instruction(
    program_id: &Pubkey,
    accounts: &[AccountInfo],
    instruction_data: &[u8],
) -> ProgramResult {
    msg!("instruction_data: {:?}", instruction_data);
    Processor::process(program_id, accounts, instruction_data)
}

pub struct Processor;

impl Processor {
    pub fn process(
        program_id: &Pubkey,
        accounts: &[AccountInfo],
        instruction_data: &[u8]
    ) -> ProgramResult {
        let instruction = FromPrimitive::from_u8(instruction_data[0]).ok_or(ProgramError::InvalidInstructionData)?;

        match instruction {
            0 => {
                msg!("Initializing map!");
                Self::process_init_map(accounts, program_id)?;
            },
            1 => {
                msg!("Inserting entry!");
                Self::process_insert_entry(accounts, program_id)?;
            },
            _ => {
                return Err(ProgramError::InvalidInstructionData)
            }
        }
        Ok(())
    }

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
}

#[derive(BorshSerialize, BorshDeserialize, Clone, Debug)]
pub struct MapAccount {
    pub is_initialized: u8,
    pub map: BTreeMap<Pubkey, Pubkey> // 100
}

impl MapAccount {
    const LEN: usize = 1 + (4 + (10 * 64)); // 10 user -> blog
}

#[derive(Error, Debug, Copy, Clone)]
pub enum BlogError {
    #[error("Invalid MapAccount account")]
    InvalidMapAccount,

    #[error("Invalid Blog account")]
    InvalidBlogAccount,

    #[error("Account already has entry in Map")]
    AccountAlreadyHasEntry,
}

impl From<BlogError> for ProgramError {
    fn from(e: BlogError) -> Self {
        return ProgramError::Custom(e as u32);
    }
}