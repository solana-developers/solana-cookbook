import {
  clusterApiUrl,
  Connection,
  Keypair,
  LAMPORTS_PER_SOL,
  PublicKey,
  SystemProgram,
  Transaction,
  TransactionInstruction,
} from "@solana/web3.js";
import {
  AccountLayout,
  MintLayout,
  Token,
  TOKEN_PROGRAM_ID,
  u64,
} from "@solana/spl-token";

import * as BN from "bn.js";

// Users
const PAYER_KEYPAIR = Keypair.generate();
const RECEIVER_KEYPAIR = Keypair.generate().publicKey;

// Mint and token accounts
const TOKEN_MINT_ACCOUNT = Keypair.generate();
const SOURCE_TOKEN_ACCOUNT = Keypair.generate();
const DESTINATION_TOKEN_ACCOUNT = Keypair.generate();

// Numbers
const DEFAULT_DECIMALS_COUNT = 9;
const TOKEN_TRANSFER_AMOUNT = 50 * 10 ** DEFAULT_DECIMALS_COUNT;
const TOKEN_TRANSFER_AMOUNT_BUFFER = Buffer.from(
  Uint8Array.of(...new BN(TOKEN_TRANSFER_AMOUNT).toArray("le", 8))
);

(async () => {
  const connection = new Connection(clusterApiUrl("devnet"), "confirmed");
  const programId = new PublicKey(
    "EfYK91eN3AqTwY1C34W6a33qGAtQ8HJYVhNv7cV4uMZj"
  );

  const mintDataSpace = MintLayout.span;
  const mintRentRequired = await connection.getMinimumBalanceForRentExemption(
    mintDataSpace
  );

  const tokenDataSpace = AccountLayout.span;
  const tokenRentRequired = await connection.getMinimumBalanceForRentExemption(
    tokenDataSpace
  );

  // Airdropping some SOL
  await connection.confirmTransaction(
    await connection.requestAirdrop(PAYER_KEYPAIR.publicKey, LAMPORTS_PER_SOL)
  );

  // Allocating space and rent for mint account
  const createMintAccountIx = SystemProgram.createAccount({
    fromPubkey: PAYER_KEYPAIR.publicKey,
    lamports: mintRentRequired,
    newAccountPubkey: TOKEN_MINT_ACCOUNT.publicKey,
    programId: TOKEN_PROGRAM_ID,
    space: mintDataSpace,
  });

  // Initializing mint with decimals and authority
  const initializeMintIx = Token.createInitMintInstruction(
    TOKEN_PROGRAM_ID,
    TOKEN_MINT_ACCOUNT.publicKey,
    DEFAULT_DECIMALS_COUNT,
    PAYER_KEYPAIR.publicKey, // mintAuthority
    PAYER_KEYPAIR.publicKey // freezeAuthority
  );

  // Allocating space and rent for source token account
  const createSourceTokenAccountIx = SystemProgram.createAccount({
    fromPubkey: PAYER_KEYPAIR.publicKey,
    newAccountPubkey: SOURCE_TOKEN_ACCOUNT.publicKey,
    lamports: tokenRentRequired,
    programId: TOKEN_PROGRAM_ID,
    space: tokenDataSpace,
  });

  // Initializing token account with mint and owner
  const initializeSourceTokenAccountIx = Token.createInitAccountInstruction(
    TOKEN_PROGRAM_ID,
    TOKEN_MINT_ACCOUNT.publicKey,
    SOURCE_TOKEN_ACCOUNT.publicKey,
    PAYER_KEYPAIR.publicKey
  );

  // Minting tokens to the source token account for transferring later to destination account
  const mintTokensIx = Token.createMintToInstruction(
    TOKEN_PROGRAM_ID,
    TOKEN_MINT_ACCOUNT.publicKey,
    SOURCE_TOKEN_ACCOUNT.publicKey,
    PAYER_KEYPAIR.publicKey,
    [PAYER_KEYPAIR],
    TOKEN_TRANSFER_AMOUNT
  );

  // Allocating space and rent for destination token account
  const createDestinationTokenAccountIx = SystemProgram.createAccount({
    fromPubkey: PAYER_KEYPAIR.publicKey,
    newAccountPubkey: DESTINATION_TOKEN_ACCOUNT.publicKey,
    lamports: tokenRentRequired,
    programId: TOKEN_PROGRAM_ID,
    space: tokenDataSpace,
  });

  // Initializing token account with mint and owner
  const initializeDestinationTokenAccountIx =
    Token.createInitAccountInstruction(
      TOKEN_PROGRAM_ID,
      TOKEN_MINT_ACCOUNT.publicKey,
      DESTINATION_TOKEN_ACCOUNT.publicKey,
      RECEIVER_KEYPAIR
    );

  // Our program's CPI instruction (transfer)
  const transferTokensIx = new TransactionInstruction({
    programId: programId,
    data: TOKEN_TRANSFER_AMOUNT_BUFFER,
    keys: [
      {
        isSigner: false,
        isWritable: true,
        pubkey: SOURCE_TOKEN_ACCOUNT.publicKey,
      },
      {
        isSigner: false,
        isWritable: true,
        pubkey: DESTINATION_TOKEN_ACCOUNT.publicKey,
      },
      {
        isSigner: true,
        isWritable: true,
        pubkey: PAYER_KEYPAIR.publicKey,
      },
      {
        isSigner: false,
        isWritable: false,
        pubkey: TOKEN_PROGRAM_ID,
      },
    ],
  });

  const transaction = new Transaction();
  // Adding up all the above instructions
  transaction.add(
    createMintAccountIx,
    initializeMintIx,
    createSourceTokenAccountIx,
    initializeSourceTokenAccountIx,
    mintTokensIx,
    createDestinationTokenAccountIx,
    initializeDestinationTokenAccountIx,
    transferTokensIx
  );

  const txHash = await connection.sendTransaction(transaction, [
    PAYER_KEYPAIR,
    TOKEN_MINT_ACCOUNT,
    SOURCE_TOKEN_ACCOUNT,
    DESTINATION_TOKEN_ACCOUNT,
  ]);

  console.log(`Token transfer CPI success: ${txHash}`);
})();
