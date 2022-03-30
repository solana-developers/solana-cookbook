const connection = new Connection(clusterApiUrl("devnet"), "confirmed");

const recipient = new PublicKey("MERCHANT_WALLET");
const amount = new BigNumber(20);
const reference = new Keypair().publicKey;
const label = "Solana Merchant Store";
const message = "Product-1 - your order - #001234";
const memo = "P-1-001234";

// This is the SPL token Mint Address in which the merchant is accepting the tokens.
const splToken = new PublicKey("EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v");

const url = encodeURL({
  recipient,
  amount,
  splToken,
  reference,
  label,
  message,
  memo,
});

const qrCode = createQR(url);

const signatureInfo = await findTransactionSignature(
  connection,
  reference,
  undefined,
  "confirmed"
);
