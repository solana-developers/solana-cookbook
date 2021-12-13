const mnemonic = "pill tomorrow foster begin walnut borrow virtual kick shift mutual shoe scatter";
const seed = bip39.mnemonicToSeedSync(mnemonic, ""); // (mnemonic, password)
const keypair = Keypair.fromSeed(seed.slice(0, 32));
