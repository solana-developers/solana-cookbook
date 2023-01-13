mnemo = Mnemonic("english")
seed = mnemo.to_seed("pill tomorrow foster begin walnut borrow virtual kick shift mutual shoe scatter")
keypair = Keypair.from_bytes(seed)