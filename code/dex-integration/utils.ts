

import { TokenInstructions, DexInstructions, Market, OpenOrdersPda, MARKET_STATE_LAYOUT_V3, } from '@project-serum/serum'
import { TOKEN_PROGRAM_ID } from '@solana/spl-token'
import {Connection, sendAndConfirmTransaction, Keypair, SystemProgram, Transaction, PublicKey, clusterApiUrl} from "@solana/web3.js";
import * as BN from "bn.js";


const connection = new Connection(clusterApiUrl("devnet"), "confirmed");
const DEX_PID = new PublicKey("9xQeWvG816bUx9EPjHmaT23yvVM2ZWbrrpZb9PusVFin")
// the below function is used to list a custom market on serum orderbook from the client side.
//it returns a market object that can be used to interact with the market.
export async function list(
    connection: Connection,
    wallet: Keypair,
    baseMint: PublicKey[],
    quoteMint: PublicKey[],
    baseLotSize: BN,
    quoteLotSize: BN,
    dexProgramId: PublicKey,
    feeRateBps: number,
  ) {
    const market = new Keypair();
    const requestQueue = new Keypair();
    const eventQueue = new Keypair();
    const bids = new Keypair();
    const asks = new Keypair();
    const baseVault = new Keypair();
    const quoteVault = new Keypair();
    const quoteDustThreshold = new BN(100);

    // vault owner PDA derived from the market public key and dex program id.
    const [vaultOwner, vaultSignerNonce] = await getVaultOwnerAndNonce(
      market.publicKey,
      dexProgramId
    );
      
    const tx1 = new Transaction();
    tx1.add(
      // creating a token account for base currency i.e. the currency that is bought using quote currency or sold to get quote currency.
      SystemProgram.createAccount({
        fromPubkey: wallet.publicKey,
        newAccountPubkey: baseVault.publicKey,
        lamports: await connection.getMinimumBalanceForRentExemption(165),
        space: 165,
        programId: TOKEN_PROGRAM_ID,
      }),
        
      // creating a token account for quote currency i.e. currency used to buy or sell base currency
      SystemProgram.createAccount({
        fromPubkey: wallet.publicKey,
        newAccountPubkey: quoteVault.publicKey,
        lamports: await connection.getMinimumBalanceForRentExemption(165),
        space: 165,
        programId: TOKEN_PROGRAM_ID,
      }),
        
      //intializing a baseVault that will store the base currency tokens
      TokenInstructions.initializeAccount({
        account: baseVault.publicKey,
        mint: baseMint,
        owner: vaultOwner,
      }),
        
      // intializing a quoteVault that will store the quote currency tokens 
      TokenInstructions.initializeAccount({
        account: quoteVault.publicKey,
        mint: quoteMint,
        owner: vaultOwner,
      })
    );
  
    const tx2 = new Transaction();
    tx2.add(
        
      // this instruction is used to create a new instance of the market account
      SystemProgram.createAccount({
        fromPubkey: wallet.publicKey,
        newAccountPubkey: market.publicKey,
        lamports: await connection.getMinimumBalanceForRentExemption(
          MARKET_STATE_LAYOUT_V3.span
        ),
        space: MARKET_STATE_LAYOUT_V3.span,
        programId: dexProgramId,
      }),
        
      // this instruction is used to create a request queue account where 
      // the placed orders or cancelled orders that are yet to be processed are stored.
      SystemProgram.createAccount({
        fromPubkey: wallet.publicKey,
        newAccountPubkey: requestQueue.publicKey,
        lamports: await connection.getMinimumBalanceForRentExemption(5120 + 12),
        space: 5120 + 12,
        programId: dexProgramId,
      }),
        
      // this one creates an event queue account where the events of whether the orders
      // are fulfilled or not are stored.
      SystemProgram.createAccount({
        fromPubkey: wallet.publicKey,
        newAccountPubkey: eventQueue.publicKey,
        lamports: await connection.getMinimumBalanceForRentExemption(262144 + 12),
        space: 262144 + 12,
        programId: dexProgramId,
      }),
        
      // this instruction creates a Bid account where the data of the bids (Buy) order is stored.
      SystemProgram.createAccount({
        fromPubkey: wallet.publicKey,
        newAccountPubkey: bids.publicKey,
        lamports: await connection.getMinimumBalanceForRentExemption(65536 + 12),
        space: 65536 + 12,
        programId: dexProgramId,
      }),
        
       // this instruction creates a Ask account where the data of the asks (Sell) order is stored.
      SystemProgram.createAccount({
        fromPubkey: wallet.publicKey,
        newAccountPubkey: asks.publicKey,
        lamports: await connection.getMinimumBalanceForRentExemption(65536 + 12),
        space: 65536 + 12,
        programId: dexProgramId,
      }),
        
      // the following instruction is imported from the serum-ts library and is used to call the on-chain instruction to initialize market.
      DexInstructions.initializeMarket({
        market: market.publicKey,
        requestQueue: requestQueue.publicKey,
        eventQueue: eventQueue.publicKey,
        bids: bids.publicKey,
        asks: asks.publicKey,
        baseVault: baseVault.publicKey,
        quoteVault: quoteVault.publicKey,
        baseMint,
        quoteMint,
        baseLotSize: new BN(baseLotSize),
        quoteLotSize: new BN(quoteLotSize),
        feeRateBps,
        vaultSignerNonce,
        quoteDustThreshold,
        programId: dexProgramId,
       
      })
    );
  
    const transactions = [
      { transaction: tx1, signers: [baseVault, quoteVault] },
      {
        transaction: tx2,
        signers: [market, requestQueue, eventQueue, bids, asks],
      },
    ];
    for (let tx of transactions) {
      await sendAndConfirmTransaction(connection, tx.transaction, tx.signers);
    }
    const acc = await connection.getAccountInfo(market.publicKey);
   // returns a new market listing
    return {
        market: market.publicKey,
        requestQueue: requestQueue.publicKey,
        eventQueue: eventQueue.publicKey,
        bids: bids.publicKey,
        asks: asks.publicKey,
        baseLotSize: new BN(baseLotSize),
        quoteLotSize: new BN(quoteLotSize),
        coinVault: baseVault.publicKey,
        pcVault: quoteVault.publicKey,
        vaultSigner: vaultOwner,
    };
  }
  
  // a function to create a Vault PDA derived from the market public key and dex program id.
  // it will try finding a PDA that is off of the ed25519 curve by iterating through nonces.
  // it returns the vault owner and the vault signer nonce. 
  async function getVaultOwnerAndNonce(marketPublicKey: PublicKey, dexProgramId = DEX_PID) {
    const nonce = new BN(0);
    while (nonce.toNumber() < 255) {
      try {
        const vaultOwner = await PublicKey.createProgramAddress(
          [marketPublicKey.toBuffer(), nonce.toArrayLike(Buffer, "le", 8)],
          dexProgramId
        );
        return [vaultOwner, nonce];
      } catch (e) {
        nonce.iaddn(1);
      }
    }
    throw new Error("Unable to find nonce");
  }
  
