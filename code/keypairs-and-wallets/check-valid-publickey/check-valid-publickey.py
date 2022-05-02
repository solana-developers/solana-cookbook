from solana.keypair import Keypair
from solana.publickey import PublicKey
from solana.utils.ed25519_base import is_on_curve

# Note that Keypair() will always give a public key that is valid for users
key = PublicKey('5oNDL3swdJJF1g9DzJiZ4ynHXgszjAEpUkxVYejchzrY') # Valid public key
print(is_on_curve(key)) # Lies on the ed25519 curve and is suitable for users

off_curve_address = PublicKey('4BJXYkfvg37zEmBbsacZjeQDpTNx91KppxFJxRqrz48e') # Valid public key
print(PublicKey._is_on_curve(off_curve_address)) # Not on the ed25519 curve, therefore not suitable for users

error_pubkey = PublicKey("testPubkey"); # Is not a valid public key
