message = b"The quick brown fox jumps over the lazy dog"
signature = keypair.sign_message(message)
verify_sign = signature.verify(keypair.pubkey(), message)

print(verify_sign) # bool