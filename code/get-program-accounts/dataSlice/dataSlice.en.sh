# Note: encoding only available for "base58", "base64" or "base64+zstd"
curl http://api.mainnet-beta.solana.com -X POST -H "Content-Type: application/json" -d '
  {
    "jsonrpc": "2.0",
    "id": 1,
    "method": "getProgramAccounts",
    "params": [
      "TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA",
      {
        "encoding": "base64",
        "dataSlice": {
          "offset": 0,
          "length": 0
        },
        "filters": [
          {
            "dataSize": 165
          },
          {
            "memcmp": {
              "offset": 0,
              "bytes": "BUGuuhPsHpk8YZrL2GctsCtXGneL1gmT5zYb7eMHZDWf"
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
#         "data": [
#           "",
#           "base64"
#         ],
#         "executable": false,
#         "lamports": 2039280,
#         "owner": "TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA",
#         "rentEpoch": 313
#       },
#       "pubkey": "FqWyVSLQgyRWyG1FuUGtHdTQHrEaBzXh1y9K6uPVTRZ4"
#     },
#     {
#       "account": {
#         "data": [
#           "",
#           "base64"
#         ],
#         "executable": false,
#         "lamports": 2039280,
#         "owner": "TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA",
#         "rentEpoch": 314
#       },
#       "pubkey": "CMSC2GeWDsTPjfnhzCZHEqGRjKseBhrWaC2zNcfQQuGS"
#     },
#     {
#       "account": {
#         "data": [
#           "",
#           "base64"
#         ],
#         "executable": false,
#         "lamports": 2039280,
#         "owner": "TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA",
#         "rentEpoch": 314
#       },
#       "pubkey": "61NfACb21WvuEzxyiJoxBrivpiLQ79gLBxzFo85BiJ2U"
#     },
#     {
#       "account": {
#         "data": [
#           "",
#           "base64"
#         ],
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
