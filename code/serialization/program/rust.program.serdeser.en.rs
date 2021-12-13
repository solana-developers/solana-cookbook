use {
    arrayref::*,
    borsh::{BorshDeserialize, BorshSerialize},
    solana_program::program_memory::sol_memcpy,
    std::{collections::BTreeMap, error::Error},
};

/// Initialization flag size for account state
pub const INITIALIZED_BYTES: usize = 1;
/// Storage for the serialized size of the BTreeMap control
pub const BTREE_LENGTH: usize = 4;
/// Storage for the serialized BTreeMap container
pub const BTREE_STORAGE: usize = 1019;
/// Sum of all account state lengths
pub const ACCOUNT_STATE_SPACE: usize = INITIALIZED_BYTES + BTREE_LENGTH + BTREE_STORAGE;

/// Packs the initialized flag and data content into destination slice
#[allow(clippy::ptr_offset_with_cast)]
pub fn pack_into_slice(
    is_initialized: bool,
    btree_storage: &BTreeMap<String, String>,
    dst: &mut [u8],
) {
    let dst = array_mut_ref![dst, 0, ACCOUNT_STATE_SPACE];
    // Setup pointers to key areas of account state data
    let (is_initialized_dst, data_len_dst, data_dst) =
        mut_array_refs![dst, INITIALIZED_BYTES, BTREE_LENGTH, BTREE_STORAGE];
    // Set the initialized flag
    is_initialized_dst[0] = is_initialized as u8;
    // Store the core data length and serialized content
    let keyval_store_data = btree_storage.try_to_vec().unwrap();
    let data_len = keyval_store_data.len();
    if data_len < BTREE_STORAGE {
        data_len_dst[..].copy_from_slice(&(data_len as u32).to_le_bytes());
        sol_memcpy(data_dst, &keyval_store_data, data_len);
    } else {
        panic!();
    }
}

/// Unpacks the data from slice and return the initialized flag and data content
#[allow(clippy::ptr_offset_with_cast)]
pub fn unpack_from_slice(src: &[u8]) -> Result<(bool, BTreeMap<String, String>), Box<dyn Error>> {
    let src = array_ref![src, 0, ACCOUNT_STATE_SPACE];
    // Setup pointers to key areas of account state data
    let (is_initialized_src, data_len_src, data_src) =
        array_refs![src, INITIALIZED_BYTES, BTREE_LENGTH, BTREE_STORAGE];

    let is_initialized = match is_initialized_src {
        [0] => false,
        [1] => true,
        _ => {
            return Err(Box::<dyn Error>::from(format!(
                "unrecognized initialization flag \"{:?}\". in account",
                is_initialized_src
            )))
        }
    };
    // Get current size of content in data area
    let data_len = u32::from_le_bytes(*data_len_src) as usize;
    // If emptry, create a default
    if data_len == 0 {
        Ok((is_initialized, BTreeMap::<String, String>::new()))
    } else {
        let data_dser = BTreeMap::<String, String>::try_from_slice(&data_src[0..data_len]).unwrap();
        Ok((is_initialized, data_dser))
    }
}
