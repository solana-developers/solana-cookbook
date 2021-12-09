//! instruction Contains the main ProgramInstruction enum

use {
    crate::error::SampleError, borsh::BorshDeserialize, solana_program::program_error::ProgramError,
};

#[derive(Debug, PartialEq)]
/// All custom program instructions
pub enum ProgramInstruction {
    InitializeAccount,
    MintToAccount { key: String, value: String },
    TransferBetweenAccounts { key: String },
    BurnFromAccount { key: String },
    MintToAccountWithFee { key: String, value: String },
    TransferBetweenAccountsWithFee { key: String },
    BurnFromAccountWithFee { key: String },
}

/// Generic Payload Deserialization
#[derive(BorshDeserialize, Debug)]
struct Payload {
    variant: u8,
    arg1: String,
    arg2: String,
}

impl ProgramInstruction {
    /// Unpack inbound buffer to associated Instruction
    /// The expected format for input is a Borsh serialized vector
    pub fn unpack(input: &[u8]) -> Result<Self, ProgramError> {
        let payload = Payload::try_from_slice(input).unwrap();
        match payload.variant {
            0 => Ok(ProgramInstruction::InitializeAccount),
            1 => Ok(Self::MintToAccount {
                key: payload.arg1,
                value: payload.arg2,
            }),
            2 => Ok(Self::TransferBetweenAccounts { key: payload.arg1 }),
            3 => Ok(Self::BurnFromAccount { key: payload.arg1 }),
            4 => Ok(Self::MintToAccountWithFee {
                key: payload.arg1,
                value: payload.arg2,
            }),
            5 => Ok(Self::TransferBetweenAccountsWithFee { key: payload.arg1 }),
            6 => Ok(Self::BurnFromAccountWithFee { key: payload.arg1 }),
            _ => Err(SampleError::DeserializationFailure.into()),
        }
    }
}
