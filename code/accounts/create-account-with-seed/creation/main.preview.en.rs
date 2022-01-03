let derived_pubkey = Pubkey::create_with_seed(&base_pubkey, seed, &program_id).unwrap();

let ix = system_instruction::create_account_with_seed(
  &fee_payer_pubkey,
  &derived_pubkey,
  &base_pubkey,
  seed,
  LAMPORTS_PER_SOL / 10,
  0,
  &program_id,
);

let tx = solana_sdk::transaction::Transaction::new_signed_with_payer(
  &[ix],
  Some(&fee_payer_pubkey),
  &[&fee_payer_keypair, &base_keypair],
  recent_blockhash,
);
