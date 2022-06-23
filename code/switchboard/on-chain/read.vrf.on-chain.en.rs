use switchboard_v2::VrfAccountData;

let vrf = VrfAccountData::new(vrf_account_info)?;
let result_buffer = vrf.get_result()?;
if result_buffer == [0u8; 32] {
    msg!("vrf buffer empty");
    return Ok(());
}

let value: &[u128] = bytemuck::cast_slice(&result_buffer[..]);
let result = value[0] % 256000 as u128;