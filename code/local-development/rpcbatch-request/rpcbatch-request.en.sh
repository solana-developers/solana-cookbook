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

# you will get result like this

[
{"jsonrpc":"2.0","result":{"context":{"apiVersion":"1.14.19","slot":224353332},"value":43086347000},"id":1},
{"jsonrpc":"2.0","result":{"context":{"apiVersion":"1.14.19","slot":224353332},"value":{"data":["","base58"],"executable":false,"lamports":43086347000,"owner":"11111111111111111111111111111111","rentEpoch":371}},"id":1},
{"jsonrpc":"2.0","error":{"code":-32009,"message":"Slot 430 was skipped, or missing in long-term storage"},"id":1}
]