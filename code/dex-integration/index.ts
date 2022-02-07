// This file contains the basic code walkthrough to setup Serum locally i.e.
// setting up the market, setting up openOrders account, placing orders, cancelling orders etc.
import { Token, TOKEN_PROGRAM_ID } from "@solana/spl-token";
import * as serum from "@project-serum/serum";
import { DexInstructions, Market,OpenOrdersPda,} from "@project-serum/serum";
import {createCustomTokenandMint} from './faucet';
import { PublicKey ,Keypair, SystemProgram, Transaction, 
    TransactionInstruction, SYSVAR_RENT_PUBKEY, Connection, clusterApiUrl, sendAndConfirmTransaction} from "@solana/web3.js";
import * as BN from "bn.js";
import { list } from "./utils";
import { utf8 } from "@project-serum/anchor/dist/cjs/utils/bytes";


// First we start by initializing a market or creating an orderbook of our custom assets
// that would be traded.
const DEX_PID = new PublicKey("9xQeWvG816bUx9EPjHmaT23yvVM2ZWbrrpZb9PusVFin")
const connection = new Connection(clusterApiUrl("devnet"), "confirmed");
const decimals = 9;
const payer = new Keypair();
let marketClient: Market | undefined = undefined;

let openOrders: PublicKey | undefined = undefined;



async() => {
let HershUsdcMarket;
let clientId = new BN(1234);
//creating mints and token accounts for markets.
let usdcMintandAccount = await createCustomTokenandMint(payer.publicKey, connection, new BN("10_000_000_000") , decimals);
let HershMintandAccount = await createCustomTokenandMint(payer.publicKey, connection, new BN("10_000_000_000") , decimals);
// a market maker account that will own the market to just pass it in the initOpenOrders instruction.
let marketMaker = new Keypair();
//creating a permissioned market for usdc and hersh custom market (ik this is personalized but you get the idea of a custom market).
 HershUsdcMarket = await list(
    connection,  
    payer,
    HershMintandAccount,
    usdcMintandAccount, 
    new BN("10"),
    new BN("100"),
    DEX_PID,
    0,
);
//loading a market client to interact with the market.
const marketClient = await Market.load(
    connection,
    HershUsdcMarket.market,
    {},
    DEX_PID );

//creating an open orders account for the user that will store user's open order data.
// this is a necessary account to be initialized before placing orders.
// step1: generating an openOrders PDA for the user.
const [_openOrders, _bump] = await PublicKey.findProgramAddress(
    [utf8.encode("open-orders-init"), 
    payer.publicKey.toBuffer(),
    marketClient.publicKey.toBuffer()],
    DEX_PID,
    //programId (if you're using a proxy program)
);
     openOrders = _openOrders;
// step 2: Initializing the openOrders account with the market client.
    const tx2 = new Transaction();
    tx2.add(
    DexInstructions.initOpenOrders({
        market: marketClient.address,
        openOrders,
        owner: payer.publicKey,
        programId: DEX_PID,
        marketAuthority: marketMaker.publicKey,
    }));
    const signature = await sendAndConfirmTransaction(connection,tx2,[payer]);
    console.log(signature);

    
    
// Now we can place orders on the market.
// 1) a buy order.

const size = 10;
const price = 1;
//let usdcPosted = new BN(marketClient.decoded.quoteLotSize.toNumber()).mul(marketClient.baseSizeNumberToLots(size).mul(marketClient.priceNumberToLots(price)));
await marketClient.placeOrder(
    connection,
    {
     payer: usdcMintandAccount[1],
     owner: payer,
     side: 'buy',
     price: price,
     size: size,
     orderType: 'postOnly' // or 'limit' or 'ioc'
    }
)
// 2) a sell order.
await marketClient.placeOrder(
    connection,
    {
     payer: usdcMintandAccount[1],
     owner: payer,
     side: 'sell',
     price: price,
     size: size,
     orderType: 'limit' // or 'postOnly' or 'ioc'
    }
)
// 3) a cancel order.
//returning the previous state of the user's OpenOrders account.
const beforeAccountState = await serum.OpenOrders.load(connection, openOrders, DEX_PID);

//cancelling the order.
const tx3 = new Transaction();
tx3.add(
DexInstructions.cancelOrderByClientId({
    market: marketClient.address,
    openOrders,
    owner: payer.publicKey,
    requestQueue: HershUsdcMarket.requestQueue,
    clientId: clientId,
    programId: DEX_PID,
}));
const cancelOrderSign = await sendAndConfirmTransaction(connection,tx3,[payer]);
console.log(cancelOrderSign);

//Now we can check the current state of the user's OpenOrders account after cancelling the order.
const afterAccountState = await serum.OpenOrders.load(connection, openOrders, DEX_PID);




}
