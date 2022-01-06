#  1. Load your arweave wallet
your_ar_wallet = Wallet('wallet.json')

#  2. Upload image to Arweave
with open('./code/nfts/arweave-upload/lowres-dog.png', 'rb') as f:
    img_in_bytes = f.read()

transaction = Transaction(your_ar_wallet, data=img_in_bytes)
transaction.add_tag('Content-Type', 'image/png')
transaction.sign()
transaction.send()

image_url = API_URL+"/"+transaction.id

#  3. Upload metadata to Arweave
meta_transaction = Transaction(your_ar_wallet, data=json.dumps(metadata))
meta_transaction.add_tag('Content-Type', 'text/html')
meta_transaction.sign()
meta_transaction.send()

metadata_url = API_URL+"/"+meta_transaction.id
