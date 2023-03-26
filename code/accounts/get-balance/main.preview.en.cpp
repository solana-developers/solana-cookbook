Connection connection("https://api.devnet.solana.com");

auto key_pair = Keypair::generate();
auto public_key = key_pair.public_key;

uint64_t balance = connection.get_balance(public_key).unwrap();
