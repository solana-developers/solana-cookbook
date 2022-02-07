from solana.rpc.api import Client
from solana.keypair import Keypair
from solana.transaction import Transaction
from solana.system_program import TransferParams, transfer

LAMPORT_PER_SOL = 1000000000

client: Client = Client("https://api.devnet.solana.com")

sender = Keypair.generate()
receiver = Keypair.generate()

airdrop = client.request_airdrop(sender.public_key, LAMPORT_PER_SOL)
airdrop_signature = airdrop["result"]
client.confirm_transaction(airdrop_signature)

transaction = Transaction().add(transfer(TransferParams(
    from_pubkey=sender.public_key,
    to_pubkey=receiver.public_key,
    lamports=10)
))

client.send_transaction(transaction, sender)
