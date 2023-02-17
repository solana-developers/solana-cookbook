// clang++ generate_keypair.cpp -o generate_keypair -std=c++17 -lssl -lcrypto -lsodium

#include "solana.hpp"

using namespace many::solana;

int main() {
  auto key_pair = Keypair::generate();

  auto public_key = key_pair.public_key;
  std::cout << "public_key = " << public_key.to_base58() << std::endl;

  return 0;
}
