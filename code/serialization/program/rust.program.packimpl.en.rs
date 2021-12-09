//! @brief account_state manages account data

use crate::error::SampleError;
use sol_template_shared::ACCOUNT_STATE_SPACE;
use solana_program::{
    entrypoint::ProgramResult,
    program_error::ProgramError,
    program_pack::{IsInitialized, Pack, Sealed},
};
use std::collections::BTreeMap;

/// Maintains global accumulator
#[derive(Debug, Default, PartialEq)]
pub struct ProgramAccountState {
    is_initialized: bool,
    btree_storage: BTreeMap<String, String>,
}

impl ProgramAccountState {
    /// Returns indicator if this account has been initialized
    pub fn set_initialized(&mut self) {
        self.is_initialized = true;
    }
    /// Adds a new key/value pair to the account
    pub fn add(&mut self, key: String, value: String) -> ProgramResult {
        match self.btree_storage.contains_key(&key) {
            true => Err(SampleError::KeyAlreadyExists.into()),
            false => {
                self.btree_storage.insert(key, value);
                Ok(())
            }
        }
    }
    /// Removes a key from account and returns the keys value
    pub fn remove(&mut self, key: &str) -> Result<String, SampleError> {
        match self.btree_storage.contains_key(key) {
            true => Ok(self.btree_storage.remove(key).unwrap()),
            false => Err(SampleError::KeyNotFoundInAccount),
        }
    }
}

impl Sealed for ProgramAccountState {}

// Pack expects the implementation to satisfy whether the
// account is initialzed.
impl IsInitialized for ProgramAccountState {
    fn is_initialized(&self) -> bool {
        self.is_initialized
    }
}

impl Pack for ProgramAccountState {
    const LEN: usize = ACCOUNT_STATE_SPACE;

    /// Store 'state' of account to its data area
    fn pack_into_slice(&self, dst: &mut [u8]) {
        sol_template_shared::pack_into_slice(self.is_initialized, &self.btree_storage, dst);
    }

    /// Retrieve 'state' of account from account data area
    fn unpack_from_slice(src: &[u8]) -> Result<Self, ProgramError> {
        match sol_template_shared::unpack_from_slice(src) {
            Ok((is_initialized, btree_map)) => Ok(ProgramAccountState {
                is_initialized,
                btree_storage: btree_map,
            }),
            Err(_) => Err(ProgramError::InvalidAccountData),
        }
    }
}
