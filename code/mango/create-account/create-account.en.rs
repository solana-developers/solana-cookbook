use borsh::{BorshDeserialize, BorshSerialize};
use solana_program::{
  account_info::{next_account_info, AccountInfo},
  entrypoint::ProgramResult,
  msg,
  program::{invoke_signed},
  program_error::ProgramError,
  pubkey::Pubkey,
  system_instruction,
  system_program::ID as SYSTEM_PROGRAM_ID,
  sysvar::{rent::Rent, Sysvar},
};
// Add this to Cargo.toml to be able to use the mango program repository as a crate
// mango = { version = "3.4.2", git = "https://github.com/blockworks-foundation/mango-v3.git", default-features=false, features = ["no-entrypoint", "program"] }
use mango::instruction::MangoInstruction;

use crate::instruction::ProgramInstruction;

pub struct Processor {}

impl Processor {
  pub fn process_instruction(
    program_id: &Pubkey,
    accounts: &[AccountInfo],
    instruction_data: &[u8]
  ) -> ProgramResult {
    let instruction = ProgramInstruction::try_from_slice(instruction_data)
      .map_err(|_| ProgramError::InvalidInstructionData)?;

    let accounts_iter = &mut accounts.iter();
    match instruction {
      ProgramInstruction::CreateMangoAccount { account_num } => {
        msg!("Instruction: CreateMangoAccount");
        let mango_group_ai = next_account_info(accounts_iter)?;
        let mango_account_ai = next_account_info(accounts_iter)?;
        let user = next_account_info(accounts_iter)?;
        let mango_program = next_account_info(accounts_iter)?;
        let system_program = next_account_info(accounts_iter)?;
        
        invoke(
          &mango::instruction::create_mango_account(
            *mango_program.key,
            *mango_account_ai.key,
            *user.key,
            *system_program.key,
            *user.key,
            *account_num
          ),
          &[
            mango_program.clone(),
            user.clone(),
            system_program.clone(),
            mango_account_ai.clone(),
          ]
        )?;
      }
    }
    Ok(())
  }
}