transaction = Transaction().add(transfer(TransferParams(
    from_pubkey=sender.public_key,
    to_pubkey=receiver.public_key,
    lamports=1_000_000)
))

client.send_transaction(transaction, sender)

