import { clusterApiUrl, Connection, PublicKey } from "@solana/web3.js";

(async () => {
  const MY_PROGRAM_ID = new PublicKey(
    "6a2GdmttJdanBkoHt7f4Kon4hfadx4UTUgJeRkCaiL3U"
  );
  const connection = new Connection(clusterApiUrl("devnet"), "confirmed");

  const accounts = await connection.getProgramAccounts(MY_PROGRAM_ID);

  console.log(`Accounts for program ${MY_PROGRAM_ID}: `);
  console.log(accounts);

  /*
  // Output

  Accounts for program 6a2GdmttJdanBkoHt7f4Kon4hfadx4UTUgJeRkCaiL3U:  
  [
    {
      account: {
        data: <Buffer 60 06 66 ca 2c 1d c7 85 04 00 00 00 00 00 00 00 05 00 00 00 00 00 00 00 fc>,
        executable: false,
        lamports: 1064880,
        owner: [PublicKey],
        rentEpoch: 228
      },
      pubkey: PublicKey {
        _bn: <BN: 82fc5b91154dc5c840cb464ba6a89212d0fd789367c0a1488fb1941d78f9727a>
      }
    },
    {
      account: {
        data: <Buffer 60 06 66 ca 2c 1d c7 85 03 00 00 00 00 00 00 00 04 00 00 00 00 00 00 00 fd>,
        executable: false,
        lamports: 1064880,
        owner: [PublicKey],
        rentEpoch: 229
      },
      pubkey: PublicKey {
        _bn: <BN: 404dc1fe368cf194f20cf3c681a071c61893ced98f65cda12ba5a147e984e669>
      }
    }
  ]
  */
})();
