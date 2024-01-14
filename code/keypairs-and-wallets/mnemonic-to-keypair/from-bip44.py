from solana.keypair import Keypair
from mnemonic import Mnemonic
from hdkey import HDKey

mnemo = Mnemonic("english")
seed = mnemo.to_seed("neither lonely flavor argue grass remind eye tag avocado spot unusual intact")

hd = HDKey.from_master_seed(seed)
for i in range(10):
    path = f"m/44'/501'/{i}'/0'"
    keypair = Keypair.from_bytes(hd.derive(path).private_key)
    print(f"{path} => {keypair.public_key()}")
