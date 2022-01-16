from solana.keypair import Keypair
from mnemonic import Mnemonic

mnemo = Mnemonic("english")
seed = mnemo.to_seed("pill tomorrow foster begin walnut borrow virtual kick shift mutual shoe scatter")
keypair = Keypair.from_secret_key(seed)
print("Created Keypair with Public Key: {}".format(keypair.public_key)