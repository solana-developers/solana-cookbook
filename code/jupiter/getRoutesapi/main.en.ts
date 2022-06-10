(async() => {
  const { data } = await(
    await fetch(
      "https://quote-api.jup.ag/v1/quote?inputMint=So11111111111111111111111111111111111111112&outputMint=EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v&amount=100000000&slippage=0.5&feeBps=4"
    )
  ).json();
  const routes = data;
    
})()