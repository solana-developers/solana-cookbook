use {
    arrayref::*,
    borsh::{BorshDeserialize, BorshSerialize},
    std::{collections::BTreeMap, error::Error},
};

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
