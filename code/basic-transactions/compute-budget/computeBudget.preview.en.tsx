const modifyComputeUnits = ComputeBudgetProgram.setComputeUnitLimit({ 
  units: 1000000 
});

const addPriorityFee = ComputeBudgetProgram.setComputeUnitPrice({ 
  microLamports: 1 
});

const transaction = new Transaction()
.add(modifyComputeUnits)
.add(addPriorityFee)
.add(
    SystemProgram.transfer({
      fromPubkey: payer.publicKey,
      toPubkey: toAccount,
      lamports: 10000000,
    })
  );
