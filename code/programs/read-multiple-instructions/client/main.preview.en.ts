const tx = new anchor.web3.Transaction();
const printName_ix = await program.instruction.printName({
  accounts: {},
});

tx.add(printName_ix);

const printTime_ix = await program.instruction.printTime({
  accounts: {},
});

tx.add(printTime_ix);

const print_random_ix = await program.instruction.printRandom({
  accounts: {},
});

tx.add(print_random_ix);

await program.provider.send(tx);