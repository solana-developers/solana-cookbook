const paymentStatus = await torus.initateTopup("rampnetwork");

// topup with custom address
const paymentStatus = torus.initateTopup("rampnetwork", { selectedAddress : "< Recipient's Solana Public Key(base58) >"});
