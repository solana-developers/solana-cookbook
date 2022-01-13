import base64
from borsh_construct import *
from solana.rpc.commitment import Commitment
from solana.publickey import PublicKey
from solana.rpc.api import Client


# Schema to deserialize program's account data
accountSchema = CStruct(
    "initialized" / U8,
    "map_length" / U32,
    "map" / HashMap(String, String)
)


def getAccountInfo(client: Client, account_pk: PublicKey):
    """Fetch account information from RPC, parse out the data and deserialize"""
    comm = Commitment("confirmed")
    res = client.get_account_info(account_pk, comm, encoding='base64')
    data = res['result']
    if isinstance(data, dict):
        return accountSchema.parse(base64.urlsafe_b64decode(data['value']['data'][0]))
    else:
        raise AttributeError(f'Unknown RPC result {data}')

# Results in or similar
# => Container:
# =>     initialized = 1
# =>     map_length = 109
# =>     map = {'Happy': 'New Year!', 'newKey': 'A new value',
# =>            'python key': 'python value', 'ts key': 'ts first value'}
