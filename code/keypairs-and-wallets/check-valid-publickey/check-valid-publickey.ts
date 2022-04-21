import { PublicKey } from "@solana/web3.js";

(async function () {
  // Note that Keypair.generate() will always give a public key that is valid for users
  const key = new PublicKey("5oNDL3swdJJF1g9DzJiZ4ynHXgszjAEpUkxVYejchzrY"); // Valid public key
  console.log(PublicKey.isOnCurve(key.toBytes())); // Lies on the ed25519 curve and is suitable for users

  const offCurveAddress = new PublicKey(
    "4BJXYkfvg37zEmBbsacZjeQDpTNx91KppxFJxRqrz48e"
  ); // Valid public key
  console.log(PublicKey.isOnCurve(offCurveAddress.toBytes())); // Not on the ed25519 curve, therefore not suitable for users

  const errorPubkey = new PublicKey("testPubkey"); // Is not a valid public key
})();
