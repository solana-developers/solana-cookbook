import {
  createCloseAccountInstruction,
  TOKEN_PROGRAM_ID,
} from "@solana/spl-token";
import { PublicKey, Transaction } from "@solana/web3.js";
import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { WalletNotConnectedError } from "@solana/wallet-adapter-base";
import React from "react";

// Utility function to find the associated token address
function findAssociatedTokenAddress(
  walletAddress: PublicKey,
  tokenMintAddress: PublicKey
): PublicKey {
  return PublicKey.findProgramAddressSync(
    [
      walletAddress.toBuffer(),
      TOKEN_PROGRAM_ID.toBuffer(),
      tokenMintAddress.toBuffer(),
    ],
    new PublicKey("ATokenGPvbdGVxr1b2hvZbsiqW5xWH25efTNsLJA8knL")
  )[0];
}

// Main functional component
export default function CloseTokenAccount() {
  const { publicKey, sendTransaction } = useWallet();
  const { connection } = useConnection();

  // Function to close the account
  async function closeAcc() {
    if (!publicKey) throw new WalletNotConnectedError();
    try {
      // Define the token address and associated token program id
      const tokenAddress = new PublicKey(
        "DezXAZ8z7PnrnRJjz3wXBoRgixCa6xjnB7YaB1pPB263" // -> BONK
      );

      // Get the associated token address
      const ATA = findAssociatedTokenAddress(
        publicKey!,
        tokenAddress
      ).toBase58();

      // Create a transaction to close the account
      const transaction = new Transaction(
        await connection.getLatestBlockhash()
      ).add(
        createCloseAccountInstruction(
          new PublicKey(ATA),
          publicKey!,
          publicKey!
        )
      );

      // Send and confirm the transaction
      const signature = await sendTransaction(transaction, connection);
      await connection.confirmTransaction({
        ...(await connection.getLatestBlockhash()),
        signature,
      });
    } catch (error) {
      console.error("Error closing account:", error);
      // Handle error appropriately, e.g., show a user-friendly error message
    }
  }

  // Render the main component
  return (
    <button onClick={closeAcc} disabled={!publicKey}>
      Close Account
    </button>
  );
}
