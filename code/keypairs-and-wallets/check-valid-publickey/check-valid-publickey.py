from solders.pubkey import Pubkey

# Note that Keypair() will always give a public key that is valid for users
key = Pubkey.from_string('5oNDL3swdJJF1g9DzJiZ4ynHXgszjAEpUkxVYejchzrY') # Valid public key
print(key.is_on_curve()) # Lies on the ed25519 curve and is suitable for users

off_curve_address = Pubkey.from_string('4BJXYkfvg37zEmBbsacZjeQDpTNx91KppxFJxRqrz48e') # Valid public key
print(off_curve_address.is_on_curve()) # Not on the ed25519 curve, therefore not suitable for users

try:
  error_pubkey = Pubkey.from_string("testPubkey"); # Is not a valid public key
except:
  print("testPubkey is not a valid public key as expected!")
