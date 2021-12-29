#[account]
pub struct Account {
    pub unsigned8bit: u8,
    pub unsigned16bit: u16,
    pub unsigned32bit: u32,
    pub unsigned64bit: u64,
    pub unsigned128bit: u128,
    pub signed8bit: i8,
    pub signed16bit: i16,
    pub signed32bit: i32,
    pub signed64bit: i64,
    pub signed128bit: i128,
    pub boolean: bool,
    pub character: char,
    pub pubkey: Pubkey,
    pub text: String, // dynamically-sized
    pub vector_capacity: u16,
    pub vector: vec<Pubkey>, // dynamically-sized
}
