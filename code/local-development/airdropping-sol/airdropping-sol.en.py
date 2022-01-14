from solana.keypair import Keypair
from solana.rpc.api import Client

wallet = Keypair()

client = Client("https://api.devnet.solana.com")

#Input Airdrop amount in LAMPORTS
client.request_airdrop(wallet.public_key, 1000000000)

#Airdrops 1 SOL