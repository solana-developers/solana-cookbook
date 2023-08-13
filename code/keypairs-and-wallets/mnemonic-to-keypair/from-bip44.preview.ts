const mnemonic =
  "neither lonely flavor argue grass remind eye tag avocado spot unusual intact";
const seed = bip39.mnemonicToSeedSync(mnemonic, ""); // (mnemonic, password)
const hd = HDKey.fromMasterSeed(seed.toString("hex"));
for (let i = 0; i < 10; i++) {
  const path = `m/44'/501'/${i}'/0'`;
  const keypair = Keypair.fromSeed(hd.derive(path).privateKey);
  console.log(`${path} => ${keypair.publicKey.toBase58()}`);
}
