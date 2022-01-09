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
