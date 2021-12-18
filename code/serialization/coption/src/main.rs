fn main() {}

#[cfg(test)]
mod tests {
    use arrayref::{array_ref, array_refs};
    use solana_program::{program_option::COption, pubkey::Pubkey};

    /// Emulate how COption is 'unpacked'
    fn deser_option(data: &[u8]) -> COption<Pubkey> {
        // Map the data block
        let ain = array_ref![data, 0, 36];
        let (base, key) = array_refs![ain, 4, 32];
        // Get the SOME or NONE u32
        let nos = u32::from_le_bytes(*base);
        // Construct the COption accordingly
        let opt: COption<Pubkey> = if nos == 0 {
            COption::None
        } else {
            COption::Some(Pubkey::new_from_array(*key))
        };
        opt
    }
    #[test]
    fn btest() {
        // From Typescript with borsh'ing
        let copt = [
            1u8, 0, 0, 0, 135, 202, 71, 214, 68, 105, 98, 176, 211, 130, 105, 2, 55, 187, 86, 186,
            109, 176, 80, 208, 77, 100, 221, 101, 20, 203, 149, 166, 96, 171, 119, 35,
        ];
        // Emulate COption deserialization
        let coption = deser_option(&copt);
        if coption.is_some() {
            println!("{:?}", coption.expect("Uh-oh"));
        }
        // As a Borsh Struct
        #[derive(BorshDeserialize, BorshSerialize, Debug)]
        struct TOption(u32, [u8; 32]);
        let toption = TOption::try_from_slice(&copt).unwrap();
        let pkey = Pubkey::new_from_array(toption.1);
        println!("Some = {:?} Pubkey = {:?}", toption.0, pkey);
    }
}
