transaction = Transaction().add(transfer(TransferParams(
    from_pubkey=sender.pubkey(),
    to_pubkey=receiver.pubkey(),
    lamports=1_000_000)
))

client.send_transaction(transaction, sender)

