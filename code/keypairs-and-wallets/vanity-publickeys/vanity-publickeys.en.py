from solders.keypair import Keypair

keypair = Keypair()
while(str(keypair.pubkey())[:5]!="elv1s") :
    keypair = Keypair()
    
print("Created Keypair with Public Key: {}".format(keypair.pubkey()))