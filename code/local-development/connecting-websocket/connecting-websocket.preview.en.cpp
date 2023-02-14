auto key_pair = Keypair::generate();

int subscriptionId = connection.on_account_change(key_pair.public_key, [&](Result<Account> result) {
    Account account = result.unwrap();
    std::cout << "owner = " << account.owner.to_base58() << std::endl;
    std::cout << "lamports = " << account.lamports << std::endl;
    std::cout << "data = " << account.data << std::endl;
    std::cout << "executable = " << (account.executable ? "true" : "false") << std::endl;
});

for (int i = 0; i < 10; i++) {
    connection.poll();
    sleep(1);
}

connection.remove_account_listener(subscriptionId);
