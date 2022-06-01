curl http://api.mainnet-beta.solana.com -X POST -H "Content-Type: application/json" -d '
  {
    "jsonrpc": "2.0",
    "id": 1,
    "method": "getProgramAccounts",
    "params": [
      "TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA",
      {
        "encoding": "jsonParsed",
        "filters": [
          {
            "dataSize": 165
          },
          {
            "memcmp": {
              "offset": 32,
              "bytes": "FriELggez2Dy3phZeHHAdpcoEXkKQVkv6tx3zDtCVP8T"
            }
          }
        ]
      }
    ]
  }
'

# Output: 
# {
#   "jsonrpc": "2.0",
#   "result": [
#     {
#       "account": {
#         "data": {
#           "parsed": {
#             "info": {
#               "isNative": false,
#               "mint": "BUGuuhPsHpk8YZrL2GctsCtXGneL1gmT5zYb7eMHZDWf",
#               "owner": "FriELggez2Dy3phZeHHAdpcoEXkKQVkv6tx3zDtCVP8T",
#               "state": "initialized",
#               "tokenAmount": {
#                 "amount": "998999999000000000",
#                 "decimals": 9,
#                 "uiAmount": 998999999,
#                 "uiAmountString": "998999999"
#               }
#             },
#             "type": "account"
#           },
#           "program": "spl-token",
#           "space": 165
#         },
#         "executable": false,
#         "lamports": 2039280,
#         "owner": "TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA",
#         "rentEpoch": 313
#       },
#       "pubkey": "Et3bNDxe2wP1yE5ao6mMvUByQUHg8nZTndpJNvfKLdCb"
#     }
#   ],
#   "id": 1
# }