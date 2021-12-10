const borsh = require("borsh");
import {
    Keypair,
    AccountMeta,
    Connection,
    LAMPORTS_PER_SOL,
    PublicKey,
    SystemProgram,
    Transaction,
    TransactionInstruction,
    sendAndConfirmTransaction,
} from '@solana/web3.js';

// Flexible class that takes properties and imbues them
// to the object instance
class Assignable {
    constructor(properties) {
        Object.keys(properties).map((key) => {
            return (this[key] = properties[key]);
        });
    }
}

export class AccoundData extends Assignable { }

const dataSchema = new Map([
    [
        AccoundData,
        {
            kind: "struct",
            fields: [
                ["initialized", "u8"],
                ["tree_length", "u32"],
                ["map", { kind: 'map', key: 'string', value: 'string' }]
            ]
        }
    ]
]);

/**
 * Fetch program account data
 * @param {Connection} connection - Solana RPC connection
 * @param {Keypair} wallet - Wallet for signing and payment
 * @return {Promise<AccoundData>} - Keypair
 */
export async function getAccountData(connection: Connection, account: Keypair): Promise<AccoundData> {
    let nameAccount = await connection.getAccountInfo(
        account.publicKey,
        'processed'
    );
    return borsh.deserializeUnchecked(dataSchema, AccoundData, nameAccount.data)
}
