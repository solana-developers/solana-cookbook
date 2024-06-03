from solders.keypair import Keypair
import based58

keypair = Keypair()
print("Keypair PublicKey: ", keypair.pubkey())

rawPK = bytes(keypair) 
pk = based58.b58encode(rawPK).decode()
print("Keypair Secret: ", pk)
