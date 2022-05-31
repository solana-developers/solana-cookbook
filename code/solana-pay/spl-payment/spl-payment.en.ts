import {
  Cluster,
  clusterApiUrl,
  Connection,
  PublicKey,
  Keypair,
} from "@solana/web3.js";
import { encodeURL, createQR, findTransactionSignature } from "@solana/pay";
import BigNumber from "bignumber.js";

(async () => {
  const connection = new Connection(clusterApiUrl("devnet"), "confirmed");

  let paymentStatus: string;

  const recipient = new PublicKey("MERCHANT_WALLET");
  const amount = new BigNumber(20);
  const reference = new Keypair().publicKey;
  const label = "Solana Merchant Store";
  const message = "Product-1 - your order - #001234";
  const memo = "P-1-001234";

  const splToken = new PublicKey(
    "EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v"
  );

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

  const element = document.getElementById("qr-code");

  // append QR code to the element
  qrCode.append(element);

  const signatureInfo = await findTransactionSignature(
    connection,
    reference,
    undefined,
    "confirmed"
  );

  paymentStatus = "confirmed";

  // allows us to validate the transaction using the signature that we get above using `findTransactionSignature`
  await validateTransactionSignature(
    connection,
    signature,
    MERCHANT_WALLET,
    amount,
    undefined,
    reference
  );

  // Update payment status
  paymentStatus = "validated";
  console.log("✅ Payment validated");
})();
