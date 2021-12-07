const tokenAccount = new PublicKey("FWZedVtyKQtP4CXhT7XDnLidRADrJknmZGA2qNjpTPg8");

let tokenAmount = await connection.getTokenAccountBalance(tokenAccount);
console.log(`amount: ${tokenAmount.value.amount}`);
console.log(`decimals: ${tokenAmount.value.decimals}`);
