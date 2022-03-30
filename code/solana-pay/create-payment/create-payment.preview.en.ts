const connection = new Connection(clusterApiUrl("devnet"), "confirmed");

const recipient = new PublicKey("MERCHANT_WALLET");
const amount = new BigNumber(20);
const reference = new Keypair().publicKey;
const label = "Solana Merchant Store";
const message = "Product-1 - your order - #001234";
const memo = "P-1-001234";

const url = encodeURL({ recipient, amount, reference, label, message, memo });

const qrCode = createQR(url);
