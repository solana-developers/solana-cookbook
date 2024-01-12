import solana
from solana.rpc.api import Client
from solana.keypair import Keypair
from solana.transaction import Transaction
from solana.system_program import TransferParams, transfer

client = Client("https://api.devnet.solana.com")
wallet = Keypair()

recent_blockhash = client.get_recent_blockhash()['result']['value']
lamports_per_signature = recent_blockhash['feeCalculator']['lamportsPerSignature']

transaction = Transaction().add(transfer(TransferParams(
    from_pubkey=wallet.public_key,
    to_pubkey=wallet.public_key,
    lamports=10
    )))
transaction.recent_blockhash = recent_blockhash['blockhash']
transaction.sign(wallet)

print(f"SOL transfer would cost: {len(transaction.signatures) * lamports_per_signature} lamports")