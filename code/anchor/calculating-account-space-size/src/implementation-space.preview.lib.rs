impl Account {
    fn space(text: &str, vector_capacity: u16) -> usize {
        // discriminator
        8 +
        // u8 + u16 + u32 + u64 + u128
        1 + 2 + 4 + 8 + 16 +
        // i8 + i16 + i32 + i64 + i128
        1 + 2 + 4 + 8 + 16 +
        // bool + char
        1 + 4 +
        // String
        4 + text.len() + 
        // vec of pubkeys
        4 + (vector_capacity as usize) * std::mem::size_of::<Pubkey>()
    }
}