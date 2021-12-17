fn main() {}

#[cfg(test)]
mod tests {
    use borsh::{BorshDeserialize, BorshSerialize};
    use std::collections::BTreeMap;

    #[test]
    fn primitives() {
        let prim = [
            255u8, 255, 255, 255, 255, 255, 255, 5, 0, 0, 0, 104, 101, 108, 108, 111, 5, 0, 0, 0,
            119, 111, 114, 108, 100, 1, 2, 3, 4, 5, 2, 0, 0, 0, 8, 0, 0, 0, 99, 111, 111, 107, 98,
            111, 111, 107, 6, 0, 0, 0, 114, 101, 99, 105, 112, 101, 6, 0, 0, 0, 114, 101, 99, 105,
            112, 101, 10, 0, 0, 0, 105, 110, 103, 114, 101, 100, 105, 101, 110, 116,
        ];
        #[derive(BorshDeserialize, BorshSerialize, Debug)]
        struct Primitive(
            u8,
            u16,
            u32,
            String,
            String,
            [u8; 5],
            BTreeMap<String, String>,
        );
        let x = Primitive::try_from_slice(&prim).unwrap();
        println!("{:?}", x);
    }
}
