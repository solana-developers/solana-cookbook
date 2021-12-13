
/// Instruction payload gets serialized
#[derive(BorshSerialize)]
pub struct Payload<'a> {
    variant: u8,
    key: &'a str,
    value: &'a str,
}

/// Perform a mint transaction consisting of a key/value pair
/// See submit_transaction below
pub fn mint_transaction(
    rpc_client: &RpcClient,
    accounts: &[AccountMeta],
    wallet_signer: &dyn Signer,
    mint_key: &str,
    mint_value: &str,
    mint_instruction_id: u8,
    commitment_config: CommitmentConfig,
) -> Result<Signature, Box<dyn std::error::Error>> {
    // Setup the payload. `mint_instruction_id` is instruction variant index = 1
    let data = Payload<`_> {
        variant: mint_instruction_id,
        key: mint_key,
        value: mint_value,
    };
    let instruction = Instruction::new_with_borsh(PROG_KEY.pubkey(), &data, accounts.to_vec());
    submit_transaction(rpc_client, wallet_signer, instruction, commitment_config)
}

/// Submits the program instruction as per the
/// instruction definition
pub fn submit_transaction(
    rpc_client: &RpcClient,
    wallet_signer: &dyn Signer,
    instruction: Instruction,
    commitment_config: CommitmentConfig,
) -> Result<Signature, Box<dyn std::error::Error>> {
    let mut transaction =
        Transaction::new_unsigned(Message::new(&[instruction], Some(&wallet_signer.pubkey())));
    let (recent_blockhash, _fee_calculator) = rpc_client
        .get_recent_blockhash()
        .map_err(|err| format!("error: unable to get recent blockhash: {}", err))?;
    transaction
        .try_sign(&vec![wallet_signer], recent_blockhash)
        .map_err(|err| format!("error: failed to sign transaction: {}", err))?;
    let signature = rpc_client
        .send_and_confirm_transaction_with_spinner_and_commitment(&transaction, commitment_config)
        .map_err(|err| format!("error: send transaction: {}", err))?;
    Ok(signature)
}
