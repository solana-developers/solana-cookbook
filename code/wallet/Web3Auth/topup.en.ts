(async () => {
  const paymentStatus = await torus.initateTopup("moonpay");

  // topup with custom address
  const paymentStatus = torus.initateTopup("moonpay", {
    selectedAddress: "< Recipient's Solana Public Key(base58) >",
  });
})();
