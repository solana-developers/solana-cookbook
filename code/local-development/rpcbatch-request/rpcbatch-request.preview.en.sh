# you can create rpc batch requests like this by adding multiple request in array of request objects

curl https://api.devnet.solana.com -X POST -H "Content-Type: application/json" -d '
 [ {
    "jsonrpc": "2.0",
    "id": 1,
    "method": "getBalance",
    "params": [
      "CBBUMHRmbVUck99mTCip5sHP16kzGj3QTYB8K3XxwmQx"
    ]
  },
{
    "jsonrpc": "2.0",
    "id": 1,
    "method": "getAccountInfo",
    "params": [
       "CBBUMHRmbVUck99mTCip5sHP16kzGj3QTYB8K3XxwmQx",
      {
        "encoding": "base58"
      }
    ]
  },

{
    "jsonrpc": "2.0","id":1,
    "method":"getBlock",
    "params": [
      430,
      {
        "encoding": "json",
        "maxSupportedTransactionVersion":0,
        "transactionDetails":"full",
        "rewards":false
      }
    ]
  }
]
'
