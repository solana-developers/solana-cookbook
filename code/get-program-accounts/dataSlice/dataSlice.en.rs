use solana_client::{
  rpc_client::RpcClient, 
  rpc_filter::{RpcFilterType, Memcmp, MemcmpEncodedBytes, MemcmpEncoding},
  rpc_config::{RpcProgramAccountsConfig, RpcAccountInfoConfig},
};
use solana_sdk::{commitment_config::CommitmentConfig};
use solana_account_decoder::{UiAccountEncoding, UiDataSliceConfig};

pub fn main() {
  const MY_TOKEN_MINT_ADDRESS: &str = "BUGuuhPsHpk8YZrL2GctsCtXGneL1gmT5zYb7eMHZDWf";

  let rpc_url = String::from("http://api.devnet.solana.com");
  let connection = RpcClient::new_with_commitment(rpc_url, CommitmentConfig::confirmed());

  let filters = Some(vec![
      RpcFilterType::Memcmp(Memcmp::new(
        0, // number of bytes
        MemcmpEncodedBytes::Base58(MY_TOKEN_MINT_ADDRESS.to_string()),
      )),
      RpcFilterType::DataSize(165), // number of bytes
  ]);

  let accounts = connection.get_program_accounts_with_config(
      &spl_token::ID,
      RpcProgramAccountsConfig {
          filters,
          account_config: RpcAccountInfoConfig {
              data_slice: Some(UiDataSliceConfig {
                  offset: 0, // number of bytes
                  length: 0, // number of bytes
              }),
              encoding: Some(UiAccountEncoding::Base64),
              commitment: Some(connection.commitment()),
              ..RpcAccountInfoConfig::default()
          },
          ..RpcProgramAccountsConfig::default()
      },
  ).unwrap();

  println!("Found {:?} token account(s) for mint {MY_TOKEN_MINT_ADDRESS}: ", accounts.len());
  println!("{:#?}", accounts);
}

/*
// Output (notice zero `len` in `data` of `Account`s)

Found 3 token account(s) for mint BUGuuhPsHpk8YZrL2GctsCtXGneL1gmT5zYb7eMHZDWf: 
[
  (
      tofD3NzLfZ5pWG91JcnbfsAbfMcFF2SRRp3ChnjeTcL,
      Account {
          lamports: 2039280,
          data.len: 0,
          owner: TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA,
          executable: false,
          rent_epoch: 319,
      },
  ),
  (
      CMSC2GeWDsTPjfnhzCZHEqGRjKseBhrWaC2zNcfQQuGS,
      Account {
          lamports: 2039280,
          data.len: 0,
          owner: TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA,
          executable: false,
          rent_epoch: 318,
      },
  ),
  (
      Et3bNDxe2wP1yE5ao6mMvUByQUHg8nZTndpJNvfKLdCb,
      Account {
          lamports: 2039280,
          data.len: 0,
          owner: TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA,
          executable: false,
          rent_epoch: 318,
      },
  ),
]
*/
