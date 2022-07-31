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