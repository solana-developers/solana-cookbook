await fetch("https://quote-api.jup.ag/v1/swap", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
  body: JSON.stringify({
    
    route: routes[0],
   
    userPublicKey: wallet.publicKey.toString(),
   
    wrapUnwrapSOL: true,

    feeAccount: "xxxx",
  }),
});
