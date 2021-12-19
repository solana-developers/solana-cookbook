// Public key of bonfida.sol
const domainKey = new PublicKey("Crf8hzfthWGbGbLTVCiqRqV5MVnbpHB1L9KQMd6gsinb");

const domainName = await performReverseLookup(connection, domainKey); // bonfida
