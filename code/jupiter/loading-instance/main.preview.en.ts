const jupiter = await Jupiter.load({
  connection,
  cluster: ENV,
  user: USER_KEYPAIR, // or public key
  // platformFeeAndAccounts:  NO_PLATFORM_FEE,
  // routeCacheDuration: CACHE_DURATION_MS
  // wrapUnwrapSOL: true (default) | false
});
