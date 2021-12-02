import { WalletNotConnectedError } from '@solana/wallet-adapter-base';
import { useConnection, useWallet } from '@solana/wallet-adapter-react';
import { Keypair, PublicKey, SystemProgram, Transaction, TransactionInstruction } from '@solana/web3.js';
import React, { FC, useCallback } from 'react';

export const SendTenLamportToRandomAddress: FC = () => {
  const { connection } = useConnection();
  const { publicKey, sendTransaction } = useWallet();

  const onClick = useCallback(async () => {
    if (!publicKey) throw new WalletNotConnectedError();

    const transaction = new Transaction().add(
      SystemProgram.transfer({
        fromPubkey: publicKey,
        toPubkey: Keypair.generate().publicKey,
        lamports: 10,
      })
    );

    await transaction.add(
      new TransactionInstruction({
        keys: [{ pubkey: publicKey, isSigner: true, isWritable: true }],
        data: Buffer.from('Data to send in transaction', 'utf-8'),
        programId: new PublicKey("MemoSq4gqABAXKb96qnH8TysNcWxMyWCqXgDLGmfcHr"),
      })
    )

    const signature = await sendTransaction(transaction, connection);

    await connection.confirmTransaction(signature, 'processed');
  }, [publicKey, sendTransaction, connection]);

  return (
    <button onClick={onClick} disabled={!publicKey}>
      Send 1 lamport to a random address!
    </button>
  );
};
