mnemo = Mnemonic("english")
phrase = "pill tomorrow foster begin walnut borrow virtual kick shift mutual shoe scatter" 
seed = mnemo.to_seed(phrase)
keypair = Keypair.from_seed(seed[:32])