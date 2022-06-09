const vrfAccount = new VrfAccount({
  program,
  publicKey: vrfKey,
});
const vrf = await vrfAccount.loadData();
console.log(vrf.currentRound.result);
