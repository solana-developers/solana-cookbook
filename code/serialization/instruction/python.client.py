from borsh_construct import String, CStruct, U8
from enum import IntEnum
from solana.transaction import Transaction
from solders.pubkey import Pubkey
from solders.keypair import Keypair
from solders.instruction import Instruction, AccountMeta
from solders.rpc.responses import SendTransactionResp
from solana.rpc.api import Client


# Instruction variants for target program
class InstructionVariant(IntEnum):
    INITIALIZE = 0
    MINT = 1
    TRANSFER = 2
    BURN = 3


# Schema for sending instructionVariants to on-chain sample program
payload_schema = CStruct("id" / U8, "key" / String, "value" / String)


def construct_payload(instruction_variant: InstructionVariant, key: str, value: str):
    """Generate a serialized instructionVariant"""
    return payload_schema.build({"id": instruction_variant, "key": key, "value": value})


def mint_kv(
    client: Client,
    program_pk: Pubkey,
    account_pk: Pubkey,
    wallet_kp: Keypair,
    mint_key: str,
    mint_value: str,
) -> SendTransactionResp:
    """Mint with a key/value pair to an account"""
    # Construct the program payload for Mint invariant
    payload_ser = construct_payload(InstructionVariant.MINT, mint_key, mint_value)

    # print(payload_ser)
    # => b'\x01\n\x00\x00\x00python key\x0c\x00\x00\x00python value'
    # mint_payload_copy = payload_schema.parse(payload_ser)
    # print(mint_payload_copy)
    # => Container:
    # =>     initialized = 1
    # =>     key = u'python key' (total 10)
    # =>     value = u'python value' (total 12)

    # Construct the transaction with instructionVariant
    txn = Transaction().add(
        Instruction(
            accounts=[AccountMeta(account_pk, False, True)], program_id=program_pk, data=payload_ser
        )
    )
    return client.send_transaction(txn, wallet_kp)
    # => {'jsonrpc': '2.0', 'result': '4ZdpWNdovdVaLextWSiqEBWp67k9rNTTUaX3qviHDXWY9c98bVtaRt5sasPhYzMVXHqhex78gzNKytcBnVH5CSTZ', 'id': 2}
