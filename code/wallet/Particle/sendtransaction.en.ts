// With a transaction object
const result =  await particle.solana.signAndSendTransaction(transaction)

// Signing a transaction
const result =  await particle.solana.signTransaction('base58 transaction string');

// Signing multiple transactions
const results =  await particle.solana.signAllTransactions([
	'base58 transaction1 string',
	'base58 transaction2 string'
]);
