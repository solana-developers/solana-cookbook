// clang++ vanity_keypair.cpp -o vanity_keypair -std=c++17 -lssl -lcrypto -lsodium

#include "solana.hpp"

using namespace many::solana;

int main() {
  auto key_pair = Keypair::generate();

  while (key_pair.public_key.to_base58().substr(0, 5) != "elv1s") {
    key_pair = Keypair::generate();
  }

  std::cout << "Created Keypair with Public Key: " << key_pair.public_key.to_base58() << std::endl;
}
