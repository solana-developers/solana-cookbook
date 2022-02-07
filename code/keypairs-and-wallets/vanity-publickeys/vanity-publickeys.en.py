from solana.keypair import Keypair

keypair = Keypair()
while(str(keypair.public_key)[:5]!="elv1s") :
    keypair = Keypair()
    
print("Created Keypair with Public Key: {}".format(keypair.public_key))