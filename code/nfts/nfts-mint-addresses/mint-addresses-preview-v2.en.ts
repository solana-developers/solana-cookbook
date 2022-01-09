const getCandyMachineCreator = async (candyMachine: PublicKey): Promise<[PublicKey, number]> => (
  PublicKey.findProgramAddress(
    [Buffer.from('candy_machine'), candyMachine.toBuffer()],
    CANDY_MACHINE_V2_PROGRAM,
  )
);

getMintAddresses(getCandyMachineCreator(candyMachineId));