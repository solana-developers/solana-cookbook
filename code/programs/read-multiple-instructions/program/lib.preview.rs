let mut idx = 0;
let num_instructions = read_u16(&mut idx, &instruction_sysvar)
.map_err(|_| MyError::NoInstructionFound)?;


for index in 0..num_instructions {
    
    let mut current = 2 + (index * 2) as usize;
    let start = read_u16(&mut current, &instruction_sysvar).unwrap();

    current = start as usize;
    let num_accounts = read_u16(&mut current, &instruction_sysvar).unwrap();
    current += (num_accounts as usize) * (1 + 32);

}