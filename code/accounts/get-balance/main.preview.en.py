client = Client("https://api.devnet.solana.com")

key_pair = Keypair()
public_key = key_pair.pubkey()

client.get_balance(public_key)
