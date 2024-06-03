mnemo = Mnemonic("english")
seed = mnemo.to_seed("pill tomorrow foster begin walnut borrow virtual kick shift mutual shoe scatter")

keypairs = []
for i in range(10):
    derivation_path = f"m/44'/501'/{i}'/0'"
    keypair = Keypair.from_seed_and_derivation_path(seed, derivation_path)
    keypairs.append(keypair)
    print(f"Keypair {i + 1} with Public Key: {keypair.pubkey()}")