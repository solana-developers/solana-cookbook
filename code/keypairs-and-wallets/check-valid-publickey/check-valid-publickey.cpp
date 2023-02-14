#include <iostream>
#include <solana_sdk.h>

int main()
{
    auto public_key = PublicKey("5oNDL3swdJJF1g9DzJiZ4ynHXgszjAEpUkxVYejchzrY");

    std::cout << public_key.is_on_curve() << std::endl;

    return 0;
}
