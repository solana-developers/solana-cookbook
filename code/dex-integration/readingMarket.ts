// this file contains some basic code walkthrough to read orders from an existing serum market.
import { Token, TOKEN_PROGRAM_ID } from "@solana/spl-token";
import { Connection, clusterApiUrl, PublicKey, Keypair} from "@solana/web3.js";
import {Market} from "@project-serum/serum";
// dummy addresses for testing.
let owner = new Keypair();
let marketAddress = new PublicKey("9xQeWvG816bUx9EPjHmaT23yvVM2ZWbrrpZb9PusVFin");
let programAddress = new PublicKey("9xQeWvG816bUx9EPjHmaT23yvVM2ZWbrrpZb9PusVFin");
let connection = new Connection(clusterApiUrl("devnet"), "confirmed");
// reading orders
async() => {
let market = await Market.load(connection, marketAddress, {}, programAddress);

// Fetching orderbooks
let bids = await market.loadBids(connection);
let asks = await market.loadAsks(connection);


// fetching open orders and the openorders accounts for a user.
// It will return the unprocessed bids, asks and the openorders account.
let unfilledOrders = await market.loadOrdersForOwner(connection, owner.publicKey);
}