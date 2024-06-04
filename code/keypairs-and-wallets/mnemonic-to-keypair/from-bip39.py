from solders.keypair import Keypair
from mnemonic import Mnemonic

mnemo = Mnemonic("english")
phrase = "pill tomorrow foster begin walnut borrow virtual kick shift mutual shoe scatter" 
seed = mnemo.to_seed(phrase)
keypair = Keypair.from_seed(seed[:32])
# Pubkey 5ZWj7a1f8tWkjBESHKgrLmXshuXxqeY9SYcfbshpAqPG
print("Created Keypair with Public Key: {}".format(keypair.pubkey()))