message = "The quick brown fox jumps over the lazy dog"
message_bytes = bytes(message,'utf8')
signed_message = keypair.sign(message_bytes)

verify_sign = VerifyKey(
    pubkey_bytes
).verify(
    smessage=message_bytes,  
    signature=signed_message.signature
)