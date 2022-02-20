from solana.publickey import Keypair
from solana.rpc.api import Client

client = Client("https://api.devnet.solana.com")

key_pair = Keypair()
public_key = key_pair.public_key

print(client.get_balance(public_key))
