from arweave.arweave_lib import Wallet, Transaction, API_URL
import json

# Load your arweave wallet
your_ar_wallet = Wallet('wallet.json')

with open('./code/nfts/arweave-upload/lowres-dog.png', 'rb') as f:
    img_in_bytes = f.read()

# Upload image to Arweave
transaction = Transaction(your_ar_wallet, data=img_in_bytes)
transaction.add_tag('Content-Type', 'image/png')
transaction.sign()
transaction.send()

image_url = API_URL+"/"+transaction.id

# Define metadata
metadata = {
    "name": "Custom NFT #1",
    "symbol": "CNFT",
    "description": "A description about my custom NFT #1",
    "seller_fee_basis_points": 500,
    "external_url": "https://www.customnft.com/",
    "attributes": [
        {
            "trait_type": "NFT type",
            "value": "Custom"
        }
    ],
    "collection": {
        "name": "Test Collection",
        "family": "Custom NFTs",
    },
    "properties": {
        "files": [
            {
                "uri": image_url,
                "type": "image/png",
            },
        ],
        "category": "image",
        "maxSupply": 0,
        "creators": [
            {
                "address": "CBBUMHRmbVUck99mTCip5sHP16kzGj3QTYB8K3XxwmQx",
                "share": 100,
            },
        ],
    },
    "image": image_url,
}

# Upload metadata to Arweave
meta_transaction = Transaction(your_ar_wallet, data=json.dumps(metadata))
meta_transaction.add_tag('Content-Type', 'text/html')
meta_transaction.sign()
meta_transaction.send()

metadata_url = API_URL+"/"+meta_transaction.id

print(metadata_url)
