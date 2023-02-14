auto key_pair = Keypair::generate();
while (key_pair.public_key.to_base58().substr(0, 5) != "elv1s") {
    key_pair = Keypair::generate();
}
