(async () => {
  const msg = Buffer.from("Test Signing Message ", "utf8");
  const signed_message = await torus.signMessage(msg);
})();
