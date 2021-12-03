const mnemonic = "neither lonely flavor argue grass remind eye tag avocado spot unusual intact";
const seed = bip39.mnemonicToSeedSync(mnemonic, ""); // (mnemonic, password)
for (let i = 0; i < 10; i++) {
  const path = `m/44'/501'/${i}'/0'`;
  const keypair = Keypair.fromSeed(derivePath(path, seed.toString("hex")).key);
  console.log(`${path} => ${keypair.publicKey.toBase58()}`);
}
