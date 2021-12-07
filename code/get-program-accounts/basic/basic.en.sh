curl https://api.devnet.solana.com -X POST -H "Content-Type: application/json" -d '
 {"jsonrpc":"2.0", "id":1, "method":"getProgramAccounts", "params":["6a2GdmttJdanBkoHt7f4Kon4hfadx4UTUgJeRkCaiL3U"]}
'

# Output
# {"jsonrpc":"2.0","result":[{"account":{"data":"fe2kiXpgfrjWQjCPX3n5MB339Ayqav75ej","executable":false,"lamports":1064880,"owner":"6a2GdmttJdanBkoHt7f4Kon4hfadx4UTUgJeRkCaiL3U","rentEpoch":228},"pubkey":"9pKBrUtJU9GNmct6T2BQtiKqvubtjS9D2if2bm1P8TQd"},{"account":{"data":"fe2kiXpgfrjVs7hiZJNVFsbJUuhXhFx3pQ","executable":false,"lamports":1064880,"owner":"6a2GdmttJdanBkoHt7f4Kon4hfadx4UTUgJeRkCaiL3U","rentEpoch":229},"pubkey":"5L1rztbopmgGMWPKb2efoGyhGnrBJm6K53Hf9S4nxdHr"}],"id":1}