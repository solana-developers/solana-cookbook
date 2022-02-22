import base64
from borsh_construct import CStruct, U8, U32, HashMap, String
from solana.rpc.commitment import Confirmed
from solana.publickey import PublicKey
from solana.rpc.api import Client


# Schema to deserialize program's account data
account_schema = CStruct(
    "initialized" / U8,
    "map_length" / U32,
    "map" / HashMap(String, String)
)


def get_account_info(client: Client, account_pk: PublicKey):
    """Fetch account information from RPC, parse out the data and deserialize"""
    res = client.get_account_info(account_pk, Confirmed, encoding='base64')
    data = res['result']
    if isinstance(data, dict):
        return account_schema.parse(base64.urlsafe_b64decode(data['value']['data'][0]))
    else:
        raise AttributeError(f'Unknown RPC result {data}')

# Results in or similar
# => Container:
# =>     initialized = 1
# =>     map_length = 109
# =>     map = {'Happy': 'New Year!', 'newKey': 'A new value',
# =>            'python key': 'python value', 'ts key': 'ts first value'}
