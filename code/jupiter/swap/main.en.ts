import {
  Connection,
  Keypair,
  VersionedTransaction,
} from "@solana/web3.js";
import * as fs from "fs";

// ─── Config ───────────────────────────────────────────────────────────────────
const RPC_URL   = "https://api.mainnet-beta.solana.com";
const USDC_MINT = "EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v";
const SOL_MINT  = "So11111111111111111111111111111111111111112";

// Load wallet from a local keypair file (never commit private keys)
const secretKey = JSON.parse(fs.readFileSync("./wallet.json", "utf8"));
const keypair   = Keypair.fromSecretKey(Uint8Array.from(secretKey));
const connection = new Connection(RPC_URL, "confirmed");

// ─── Step 1: Get a swap quote ─────────────────────────────────────────────────
// Jupiter's free REST endpoint — no API key required.
// Swap 1 USDC (1_000_000 atomic units, 6 decimals) for SOL.
async function getQuote(inputMint: string, outputMint: string, amountAtomic: number) {
  const params = new URLSearchParams({
    inputMint,
    outputMint,
    amount:      String(amountAtomic),
    slippageBps: "150",   // 1.5% on-chain slippage tolerance
  });

  const res = await fetch(
    `https://lite-api.jup.ag/swap/v1/quote?${params}`
  );
  if (!res.ok) throw new Error(`Quote failed: ${res.statusText}`);
  return res.json();
}

// ─── Step 2: Check price impact before committing ────────────────────────────
function assertPriceImpact(quote: any, maxImpactPct = 1.0) {
  const impact = parseFloat(quote.priceImpactPct ?? "0");
  if (impact > maxImpactPct) {
    throw new Error(
      `Price impact too high: ${impact.toFixed(3)}% > ${maxImpactPct}% — aborting`
    );
  }
}

// ─── Step 3: Build the swap transaction ───────────────────────────────────────
// Jupiter returns a serialised VersionedTransaction (v0, with Address Lookup Tables).
// We must use VersionedTransaction.deserialize(), not Transaction.from().
async function getSwapTransaction(quote: any): Promise<VersionedTransaction> {
  const res = await fetch("https://lite-api.jup.ag/swap/v1/swap", {
    method:  "POST",
    headers: { "Content-Type": "application/json" },
    body:    JSON.stringify({
      quoteResponse:           quote,
      userPublicKey:           keypair.publicKey.toString(),
      wrapAndUnwrapSol:        true,   // auto-creates ATA + wraps/unwraps SOL
      dynamicComputeUnitLimit: true,   // Jupiter sets CU limit to actual usage
    }),
  });
  if (!res.ok) throw new Error(`Swap build failed: ${res.statusText}`);
  const { swapTransaction } = await res.json();

  // Deserialize as a versioned transaction — Jupiter always returns v0 format.
  return VersionedTransaction.deserialize(
    Buffer.from(swapTransaction, "base64")
  );
}

// ─── Step 4: Sign and send ────────────────────────────────────────────────────
async function executeSwap(tx: VersionedTransaction): Promise<string> {
  // Fetch a fresh blockhash for confirmation window tracking.
  // Do this AFTER getting the swap transaction — the blockhash inside
  // the transaction is already set by Jupiter; this one is for confirmTransaction().
  const { blockhash, lastValidBlockHeight } =
    await connection.getLatestBlockhash("confirmed");

  tx.sign([keypair]);

  const sig = await connection.sendRawTransaction(tx.serialize(), {
    skipPreflight: false,
    maxRetries:    3,
  });

  // Wait for confirmation using the blockhash validity window.
  // This is more reliable than a simple `await connection.confirmTransaction(sig)`.
  const result = await connection.confirmTransaction(
    { signature: sig, blockhash, lastValidBlockHeight },
    "confirmed"
  );
  if (result.value.err) {
    throw new Error(`Transaction failed on-chain: ${JSON.stringify(result.value.err)}`);
  }

  return sig;
}

// ─── Main ─────────────────────────────────────────────────────────────────────
(async () => {
  // Swap 1 USDC → SOL
  const amountIn = 1_000_000; // 1 USDC = 1,000,000 atomic units (6 decimals)

  console.log("Fetching quote…");
  const quote = await getQuote(USDC_MINT, SOL_MINT, amountIn);
  console.log(`Quote: ${amountIn / 1e6} USDC → ${quote.outAmount / 1e9} SOL`);
  console.log(`  Route: ${quote.routePlan?.map((r: any) => r.swapInfo?.label).join(" → ")}`);
  console.log(`  Price impact: ${quote.priceImpactPct}%`);

  // Reject if our trade would move the pool price by more than 1%
  assertPriceImpact(quote, 1.0);

  console.log("Building swap transaction…");
  const tx = await getSwapTransaction(quote);

  console.log("Signing and sending…");
  const sig = await executeSwap(tx);
  console.log(`Swap confirmed! Signature: ${sig}`);
  console.log(`  Explorer: https://solscan.io/tx/${sig}`);
})();
