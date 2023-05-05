from solders.keypair import Keypair
from solana.rpc.api import Client

client = Client("https://api.devnet.solana.com")

key_pair = Keypair()
public_key = key_pair.pubkey()

print(client.get_balance(public_key))
