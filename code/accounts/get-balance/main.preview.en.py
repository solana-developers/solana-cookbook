client = Client("https://api.devnet.solana.com")

key_pair = Keypair()
public_key = key_pair.public_key

client.get_balance(public_key)
