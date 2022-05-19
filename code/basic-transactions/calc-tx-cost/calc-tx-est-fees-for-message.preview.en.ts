const message = new Message(messageParams);

const fees = await connection.getFeeForMessage(message);
console.log(`Estimated SOL transfer cost: ${fees.value} lamports`);
// Estimated SOL transfer cost: 5000 lamports
