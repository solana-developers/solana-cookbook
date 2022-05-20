import { WalletNotConnectedError } from "@solana/wallet-adapter-base";
import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { Keypair, SystemProgram, Transaction } from "@solana/web3.js";
import { TOKEN_PROGRAM_ID, createTransferInstruction } from "@solana/spl-token";
import React, { FC, useCallback } from "react";

export const SendSPLTokenToAddress: FC = (
  fromTokenAccount,
  toTokenAccount,
  fromWallet
) => {
  const { connection } = useConnection();
  const { publicKey, sendTransaction } = useWallet();

  const onClick = useCallback(async () => {
    if (!publicKey) throw new WalletNotConnectedError();

    const transaction = new Transaction().add(
      createTransferInstruction(
        fromTokenAccount.address,
        toTokenAccount.address,
        fromWallet.publicKey,
        1,
        [],
        TOKEN_PROGRAM_ID
      )
    );

    const signature = await sendTransaction(transaction, connection);

    await connection.confirmTransaction(signature, "processed");
  }, [publicKey, sendTransaction, connection]);

  return (
    <button onClick={onClick} disabled={!publicKey}>
      Send 1 lamport to a random address!
    </button>
  );
};
