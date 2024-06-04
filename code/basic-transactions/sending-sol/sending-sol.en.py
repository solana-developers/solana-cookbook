from solana.rpc.api import Client
from solders.keypair import Keypair
from solana.transaction import Transaction
from solders.system_program import TransferParams, transfer

LAMPORT_PER_SOL = 1000000000

client: Client = Client("https://api.devnet.solana.com")

sender = Keypair()
receiver = Keypair()

airdrop = client.request_airdrop(sender.pubkey(), 1 * LAMPORT_PER_SOL)
airdrop_signature = airdrop.value
client.confirm_transaction(airdrop_signature)

transaction = Transaction().add(transfer(TransferParams(
    from_pubkey=sender.pubkey(),
    to_pubkey=receiver.pubkey(),
    lamports=1_000_000)
))

result = client.send_transaction(transaction, sender)
print(result)
