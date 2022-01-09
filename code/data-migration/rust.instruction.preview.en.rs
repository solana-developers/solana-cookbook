impl ProgramInstruction {
    /// Unpack inbound buffer to associated Instruction
    /// The expected format for input is a Borsh serialized vector
    pub fn unpack(input: &[u8]) -> Result<Self, ProgramError> {
        let payload = ProgramInstruction::try_from_slice(input).unwrap();
        match payload {
            ProgramInstruction::InitializeAccount => Ok(payload),
            ProgramInstruction::SetU64Value(_) => Ok(payload),
            _ => Err(DataVersionError::InvalidInstruction.into()),
        }
    }
}