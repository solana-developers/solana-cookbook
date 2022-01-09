//! @brief account_state manages account data

use arrayref::{array_ref, array_refs};
use borsh::{BorshDeserialize, BorshSerialize};
use solana_program::{
    borsh::try_from_slice_unchecked,
    msg,
    program_error::ProgramError,
    program_pack::{IsInitialized, Pack, Sealed},
};
use std::{io::BufWriter, mem};

/// Current state (DATA_VERSION 1). If version changes occur, this
/// should be copied to another (see AccountContentOld below)
/// We've added a new field: 'somestring'
#[derive(BorshDeserialize, BorshSerialize, Debug, Default, PartialEq)]
pub struct AccountContentCurrent {
    pub somevalue: u64,
    pub somestring: String,
}

/// Old content state (DATA_VERSION 0).
#[derive(BorshDeserialize, BorshSerialize, Debug, Default, PartialEq)]
pub struct AccountContentOld {
    pub somevalue: u64,
}

/// Maintains account data
#[derive(BorshDeserialize, BorshSerialize, Debug, Default, PartialEq)]
pub struct ProgramAccountState {
    is_initialized: bool,
    data_version: u8,
    account_data: AccountContentCurrent,
}

impl ProgramAccountState {
    /// Signal initialized
    pub fn set_initialized(&mut self) {
        self.is_initialized = true;
    }
    /// Get the initialized flag
    pub fn initialized(&self) -> bool {
        self.is_initialized
    }
    /// Gets the current data version
    pub fn version(&self) -> u8 {
        self.data_version
    }
    /// Get the reference to content structure
    pub fn content(&self) -> &AccountContentCurrent {
        &self.account_data
    }
    /// Get the mutable reference to content structure
    pub fn content_mut(&mut self) -> &mut AccountContentCurrent {
        &mut self.account_data
    }
}

/// Declaration of the current data version.
const DATA_VERSION: u8 = 1; // Adding string to content
                            // Previous const DATA_VERSION: u8 = 0;

/// Account allocated size
const ACCOUNT_ALLOCATION_SIZE: usize = 1024;
/// Initialized flag is 1st byte of data block
const IS_INITIALIZED: usize = 1;
/// Data version (current) is 2nd byte of data block
const DATA_VERSION_ID: usize = 1;

/// Previous content data size (before changing this is equal to current)
const PREVIOUS_VERSION_DATA_SIZE: usize = mem::size_of::<AccountContentOld>();
/// Total space occupied by previous account data
const PREVIOUS_ACCOUNT_SPACE: usize = IS_INITIALIZED + DATA_VERSION_ID + PREVIOUS_VERSION_DATA_SIZE;

/// Current content data size
const CURRENT_VERSION_DATA_SIZE: usize = mem::size_of::<AccountContentCurrent>();
/// Total usage for data only
const CURRENT_USED_SIZE: usize = IS_INITIALIZED + DATA_VERSION_ID + CURRENT_VERSION_DATA_SIZE;
/// How much of 1024 is used
const CURRENT_UNUSED_SIZE: usize = ACCOUNT_ALLOCATION_SIZE - CURRENT_USED_SIZE;
/// Current space used by header (initialized, data version and Content)
pub const ACCOUNT_STATE_SPACE: usize = CURRENT_USED_SIZE + CURRENT_UNUSED_SIZE;

/// Future data migration logic that converts prior state of data
/// to current state of data
fn conversion_logic(src: &[u8]) -> Result<ProgramAccountState, ProgramError> {
    let past = array_ref![src, 0, PREVIOUS_ACCOUNT_SPACE];
    let (initialized, _, account_space) = array_refs![
        past,
        IS_INITIALIZED,
        DATA_VERSION_ID,
        PREVIOUS_VERSION_DATA_SIZE
    ];
    // Logic to upgrade from previous version
    // GOES HERE
    let old = try_from_slice_unchecked::<AccountContentOld>(account_space).unwrap();
    // Default sets 'somevalue' to 0 and somestring to default ""
    let mut new_content = AccountContentCurrent::default();
    // We copy the existing 'somevalue', the program instructions will read/update 'somestring' without fail
    new_content.somevalue = old.somevalue;

    // Give back
    Ok(ProgramAccountState {
        is_initialized: initialized[0] != 0u8,
        data_version: DATA_VERSION,
        account_data: new_content,
    })
}
impl Sealed for ProgramAccountState {}

impl IsInitialized for ProgramAccountState {
    fn is_initialized(&self) -> bool {
        self.is_initialized
    }
}

impl Pack for ProgramAccountState {
    const LEN: usize = ACCOUNT_STATE_SPACE;

    /// Store 'state' of account to its data area
    fn pack_into_slice(&self, dst: &mut [u8]) {
        let mut bw = BufWriter::new(dst);
        self.serialize(&mut bw).unwrap();
    }

    /// Retrieve 'state' of account from account data area
    fn unpack_from_slice(src: &[u8]) -> Result<Self, ProgramError> {
        let initialized = src[0] != 0;
        // Check initialized
        if initialized {
            // Version check
            if src[1] == DATA_VERSION {
                msg!("Processing consistent version data");
                Ok(try_from_slice_unchecked::<ProgramAccountState>(src).unwrap())
            } else {
                msg!("Processing backlevel data");
                conversion_logic(src)
            }
        } else {
            msg!("Processing pre-initialized data");
            Ok(ProgramAccountState {
                is_initialized: false,
                data_version: DATA_VERSION,
                account_data: AccountContentCurrent::default(),
            })
        }
    }
}
