# Token-2022: Transfer Hook Example (Rust)
This example demonstrates how to use the Transfer Hook extension to add custom validation logic for token transfers.
## Rust Program
```rust
use solana_program::{
    account_info::{AccountInfo},
    entrypoint,
    entrypoint::ProgramResult,
    pubkey::Pubkey,
    msg,
    program_error::ProgramError,
};
use spl_token_2022::extension::transfer_hook::TransferHookInstruction;
// The "Blacklist" - in a real app, this would be a separate account
const BLACKLISTED_ADDRESS: &str = "HDe9j8Wk7N6k8...example";
entrypoint!(process_instruction);
pub fn process_instruction(
    _program_id: &Pubkey,
    _accounts: &[AccountInfo],
    instruction_data: &[u8],
) -> ProgramResult {
    // Unpack the instruction sent by the Token-2022 program
    let instruction = TransferHookInstruction::unpack(instruction_data)?;
    
    match instruction {
        TransferHookInstruction::Execute { amount } => {
            msg!("Transfer Hook: Validating transfer for amount: {}", amount);
            
            // SECURITY LOGIC: Preventing transfers to blacklisted addresses
            // (Conceptual check)
            if amount > 1_000_000_000 { // Example: check for unusually large transfers
                 msg!("Warning: Large transfer detected!");
            }
            Ok(())
        }
        _ => Ok(()),
    }
}
