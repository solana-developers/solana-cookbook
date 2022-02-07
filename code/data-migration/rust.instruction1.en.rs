//! instruction Contains the main VersionProgramInstruction enum

use {
    crate::error::DataVersionError,
    borsh::{BorshDeserialize, BorshSerialize},
    solana_program::{borsh::try_from_slice_unchecked, msg, program_error::ProgramError},
};

#[derive(BorshDeserialize, BorshSerialize, Debug, PartialEq)]
/// All custom program instructions
pub enum VersionProgramInstruction {
    InitializeAccount,
    SetU64Value(u64),
    SetString(String), // Added with data version change
    FailInstruction,
}

impl VersionProgramInstruction {
    /// Unpack inbound buffer to associated Instruction
    /// The expected format for input is a Borsh serialized vector
    pub fn unpack(input: &[u8]) -> Result<Self, ProgramError> {
        let payload = try_from_slice_unchecked::<VersionProgramInstruction>(input).unwrap();
        // let payload = VersionProgramInstruction::try_from_slice(input).unwrap();
        match payload {
            VersionProgramInstruction::InitializeAccount => Ok(payload),
            VersionProgramInstruction::SetU64Value(_) => Ok(payload),
            VersionProgramInstruction::SetString(_) => Ok(payload), // Added with data version change
            _ => Err(DataVersionError::InvalidInstruction.into()),
        }
    }
}
