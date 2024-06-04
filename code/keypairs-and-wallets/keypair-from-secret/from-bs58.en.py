from solders.keypair import Keypair

b58_string = "5MaiiCavjCmn9Hs1o3eznqDEhRwxo7pXiAYez7keQUviUkauRiTMD8DrESdrNjN8zd9mTmVhRvBJeg5vhyvgrAhG"
keypair = Keypair.from_base58_string(b58_string)
print("Created Keypair with Public Key: {}".format(keypair.pubkey()))