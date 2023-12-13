use solana_client::{
  rpc_client::RpcClient, 
  rpc_filter::{RpcFilterType, Memcmp, MemcmpEncodedBytes, MemcmpEncoding},
  rpc_config::{RpcProgramAccountsConfig, RpcAccountInfoConfig},
};
use solana_sdk::{commitment_config::CommitmentConfig, program_pack::Pack};
use spl_token::{state::{Mint, Account}};
use solana_account_decoder::{UiAccountEncoding};

fn main() {
  const MY_WALLET_ADDRESS: &str = "FriELggez2Dy3phZeHHAdpcoEXkKQVkv6tx3zDtCVP8T";

  let rpc_url = String::from("http://api.devnet.solana.com");
  let connection = RpcClient::new_with_commitment(rpc_url, CommitmentConfig::confirmed());

  let filters = Some(vec![
      RpcFilterType::Memcmp(Memcmp::new(
        32, // number of bytes
        MemcmpEncodedBytes::Base58(MY_WALLET_ADDRESS.to_string()),
      )),
      RpcFilterType::DataSize(165),
  ]);

  let accounts = connection.get_program_accounts_with_config(
      &spl_token::ID,
      RpcProgramAccountsConfig {
          filters,
          account_config: RpcAccountInfoConfig {
              encoding: Some(UiAccountEncoding::Base64),
              commitment: Some(connection.commitment()),
              ..RpcAccountInfoConfig::default()
          },
          ..RpcProgramAccountsConfig::default()
      },
  ).unwrap();

  println!("Found {:?} token account(s) for wallet {MY_WALLET_ADDRESS}: ", accounts.len());

  for (i, account) in accounts.iter().enumerate() {
      println!("-- Token Account Address {:?}:  {:?} --", i, account.0);

      let mint_token_account = Account::unpack_from_slice(account.1.data.as_slice()).unwrap();
      println!("Mint: {:?}", mint_token_account.mint);

      let mint_account_data = connection.get_account_data(&mint_token_account.mint).unwrap();
      let mint = Mint::unpack_from_slice(mint_account_data.as_slice()).unwrap();
      println!("Amount: {:?}", mint_token_account.amount as f64 /10usize.pow(mint.decimals as u32) as f64);
  }
}

/*
// Output

Found 2 token account(s) for wallet FriELggez2Dy3phZeHHAdpcoEXkKQVkv6tx3zDtCVP8T: 
-- Token Account Address 0:  H12yCcKLHFJFfohkeKiN8v3zgaLnUMwRcnJTyB4igAsy --
Mint: CKKDsBT6KiT4GDKs3e39Ue9tDkhuGUKM3cC2a7pmV9YK
Amount: 1.0
-- Token Account Address 1:  Et3bNDxe2wP1yE5ao6mMvUByQUHg8nZTndpJNvfKLdCb --
Mint: BUGuuhPsHpk8YZrL2GctsCtXGneL1gmT5zYb7eMHZDWf
Amount: 3.0
*/