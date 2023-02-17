// clang++ get_balance.cpp -o get_balance -std=c++17 -lssl -lcrypto -lsodium

#include "solana.hpp"

using namespace many::solana;

int main() {
  Connection connection("https://api.devnet.solana.com");

  auto key_pair = Keypair::generate();

  auto public_key = key_pair.public_key;
  std::cout << "public_key = " << public_key.to_base58() << std::endl;

  uint64_t balance = connection.get_balance(public_key).unwrap();
  std::cout << "balance = " << balance << std::endl;

  return 0;
}
