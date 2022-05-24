import { Connection, PublicKey } from "@solana/web3.js";

(async () => {
  const connection = new Connection("https://api.mainnet-beta.solana.com");
  const tokenMint = "9ARngHhVaCtH5JFieRdSS5Y8cdZk2TMF4tfGSWFB9iSK";

  const largestAccounts = await connection.getTokenLargestAccounts(
    new PublicKey(tokenMint)
  );
  const largestAccountInfo = await connection.getParsedAccountInfo(
    largestAccounts.value[0].address
  );
  console.log(largestAccountInfo.value.data.parsed.info.owner);
  /*
    PublicKey {
        _bn: <BN: 6ddf6e1d765a193d9cbe146ceeb79ac1cb485ed5f5b37913a8cf5857eff00a9>
    }
     */
})();
