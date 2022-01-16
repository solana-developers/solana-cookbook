import base58
from solana.keypair import Keypair

b58_string = "5MaiiCavjCmn9Hs1o3eznqDEhRwxo7pXiAYez7keQUviUkauRiTMD8DrESdrNjN8zd9mTmVhRvBJeg5vhyvgrAhG"
keypair = Keypair.from_secret_key(base58.b58decode(b58_string)
print("Created Keypair with Public Key: {}".format(keypair.public_key))