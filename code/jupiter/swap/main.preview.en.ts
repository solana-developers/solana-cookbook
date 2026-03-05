// 1. Get a quote (free, no API key)
const params = new URLSearchParams({
  inputMint:   "EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v", // USDC
  outputMint:  "So11111111111111111111111111111111111111112",     // SOL
  amount:      "1000000",   // 1 USDC (6 decimals)
  slippageBps: "150",       // 1.5% on-chain slippage tolerance
});
const quote = await fetch(
  `https://lite-api.jup.ag/swap/v1/quote?${params}`
).then(r => r.json());

// Guard: reject if our trade moves the pool price by more than 1%
if (parseFloat(quote.priceImpactPct) > 1.0) throw new Error("Price impact too high");

// 2. Build the swap transaction
const { swapTransaction } = await fetch("https://lite-api.jup.ag/swap/v1/swap", {
  method:  "POST",
  headers: { "Content-Type": "application/json" },
  body:    JSON.stringify({
    quoteResponse:    quote,
    userPublicKey:    keypair.publicKey.toString(),
    wrapAndUnwrapSol: true,  // handles ATA creation and SOL wrapping automatically
  }),
}).then(r => r.json());

// 3. Deserialize as a versioned transaction (Jupiter always returns v0 format with ALTs)
const tx = VersionedTransaction.deserialize(Buffer.from(swapTransaction, "base64"));

// 4. Sign and send
tx.sign([keypair]);
const sig = await connection.sendRawTransaction(tx.serialize(), { skipPreflight: false });

// 5. Confirm using the blockhash validity window (more reliable than fire-and-forget)
const { blockhash, lastValidBlockHeight } = await connection.getLatestBlockhash();
await connection.confirmTransaction({ signature: sig, blockhash, lastValidBlockHeight });
console.log("Swap confirmed:", sig);
