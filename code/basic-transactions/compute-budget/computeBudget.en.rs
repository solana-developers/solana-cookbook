//! @brief Example Budget Management

use solana_client::rpc_client::RpcClient;
use solana_program::{instruction::Instruction, message::Message, pubkey::Pubkey};
use solana_sdk::{
    compute_budget::ComputeBudgetInstruction,
    pubkey,
    signature::{Keypair, Signature},
    signer::Signer,
    transaction::Transaction,
};

/// Submits the program instruction as per the instruction definition
fn submit_transaction(
    rpc_client: &RpcClient,
    wallet_signer: &dyn Signer,
    instructions: Vec<Instruction>,
) -> Result<Signature, Box<dyn std::error::Error>> {
    let mut transaction =
        Transaction::new_unsigned(Message::new(&instructions, Some(&wallet_signer.pubkey())));
    let recent_blockhash = rpc_client
        .get_latest_blockhash()
        .map_err(|err| format!("error: unable to get recent blockhash: {}", err))?;
    transaction
        .try_sign(&vec![wallet_signer], recent_blockhash)
        .map_err(|err| format!("error: failed to sign transaction: {}", err))?;
    let signature = rpc_client
        .send_and_confirm_transaction(&transaction)
        .map_err(|err| format!("error: send transaction: {}", err))?;
    Ok(signature)
}

const PROG_KEY: Pubkey = pubkey!("PWDnx8LkjJUn9bAVzG6Fp6BuvB41x7DkBZdo9YLMGcc");

/// Increase the Transaction Budget and call normal instruction(s)
/// Here we send redundant transactions to witness Compute Budget drawdown
fn send_instructions_demo(
    rpc_client: &RpcClient,
    wallet_signer: &dyn Signer,
) -> Result<(), Box<dyn std::error::Error>> {{
    let accounts = &[];
    let txn = submit_transaction(
        &connection,
        &wallet_signer,
        // Array of instructions: 0: Set Compute Unit Limt, 1: Set Prioritization Fee, 
        // 2: Do something, 3: Do something else
        [ComputeBudgetInstruction::set_compute_unit_limit(1_000_000u32),
        ComputeBudgetInstruction::set_compute_unit_price(1u32),
        Instruction::new_with_borsh(PROG_KEY, &0u8, accounts.to_vec()),
        Instruction::new_with_borsh(PROG_KEY, &0u8, accounts.to_vec())].to_vec(),
    )?;
    println!("{:?}", txn);
    Ok(())
}
