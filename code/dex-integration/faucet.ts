//For creating a custom orderbook from the client side, we would need to
//make a faucet that would make it easy to fund the market maker accounts.

import { token } from "@project-serum/anchor/dist/cjs/utils";
import { TOKEN_PROGRAM_ID, Token , } from "@solana/spl-token";
import { Connection, clusterApiUrl, Keypair, Signer, sendAndConfirmRawTransaction, sendAndConfirmTransaction, Transaction, SystemProgram, PublicKey } from "@solana/web3.js";
import * as BN from 'bn.js'

const payer = Keypair.generate();

const connection = new Connection(clusterApiUrl("devnet"), "confirmed");
connection.requestAirdrop(
  payer.publicKey,
  1000000000000,
);
const DECIMALS = 9;

//function to create a custom token and a vault account that will store the mints.
export async function createCustomTokenandMint(owner:PublicKey, connection: Connection, amount: BN, decimals: number ) {
  if (owner === undefined){
    owner = payer.publicKey;
  }
  const mint = Keypair.generate();
  const vault = Keypair.generate();
  const tx = new Transaction();
  tx.add(
    // ix 1:
    SystemProgram.createAccount({
    fromPubkey: payer.publicKey,
    newAccountPubkey: mint.publicKey,
    space: 82,
    lamports: await connection.getMinimumBalanceForRentExemption(82),
    programId: TOKEN_PROGRAM_ID,
  }),
  // ix 2:
  Token.createInitMintInstruction(TOKEN_PROGRAM_ID,mint.publicKey, decimals, payer.publicKey, null),
  //ix 3:
  SystemProgram.createAccount({
    fromPubkey: payer.publicKey,
    newAccountPubkey: vault.publicKey,
    space: 165,
    lamports: await connection.getMinimumBalanceForRentExemption(82),
    programId: TOKEN_PROGRAM_ID,
  }),
  //ix 4:
  Token.createInitAccountInstruction(vault.publicKey, mint.publicKey, owner, TOKEN_PROGRAM_ID),
  //ix 5: creating a mintTo instruction that will mint tokens of a certain mint address in the vault.
  Token.createMintToInstruction(TOKEN_PROGRAM_ID, mint.publicKey, vault.publicKey, payer.publicKey,[],amount));

  await sendAndConfirmTransaction(connection, tx, [payer] );
  return [mint.publicKey, vault.publicKey];
  
}





//creating an array of custom tokens and a vault account that will store the mints.
async function createHershCoins(mintCount: number) {
  let HershCoins = [];
  for (let k = 0; k < mintCount; k += 1) {
    const [mint, vault] = await createCustomTokenandMint(
      payer.publicKey,
      connection,
      new BN("1000000000000000000"),
      DECIMALS,
    );
    HershCoins.push([mint, vault] );
  }

  return HershCoins;
}

// creates a funded market maker account to place orders with.
//this would come in handy if you want to test your market and to make dummy trades in your market.
async function createFundedAccount(payer: Keypair, mints, newAccount: Keypair) {
  if(!newAccount){
    newAccount =  Keypair.generate();
  }
  
  const marketMaker = {
    tokens: {},
    account: newAccount,
  }
  const tx = new Transaction();
  tx.add(
    SystemProgram.transfer({
      fromPubkey: payer.publicKey,
      toPubkey: newAccount.publicKey,
      lamports: 100000000000,

    })
  )
  const signature = await sendAndConfirmTransaction(
    connection,
    tx,
    [payer],
    {commitment: 'confirmed'},
  )
  console.log('Funded the market maker', signature);
  return tx;

  for (let k = 0; k < mints.length; k += 1) {
    const { mint, vault, amount } = mints[k];
    let HershMint = mint;
    let HershVault = vault;
    // Setup token accounts owned by the market maker.
    const HershCoinClient = new Token(
      connection,
      HershMint,
      TOKEN_PROGRAM_ID,
      payer 
    );
    const marketMakerToken = await HershCoinClient.createAccount(
      newAccount.publicKey
    );
    const tx = new Transaction();
    tx.add(
      Token.createTransferCheckedInstruction(
        TOKEN_PROGRAM_ID,
        HershVault,
        HershMint,
        marketMakerToken,
        payer.publicKey,
        [],
        amount,
        DECIMALS
      ),
    );
    return await sendAndConfirmTransaction(
        connection,
        tx,
        [payer]
    );

    marketMaker.tokens[mint.toString()] = marketMakerToken;
  }

  return marketMaker;
}

module.exports = {
  createHershCoins,
  createFundedAccount,
  createCustomTokenandMint,
}
