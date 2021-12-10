import { TOKEN_PROGRAM_ID } from "@solana/spl-token";
import { clusterApiUrl, Connection } from "@solana/web3.js";

(async () => {
  const MY_TOKEN_MINT_ADDRESS = "BUGuuhPsHpk8YZrL2GctsCtXGneL1gmT5zYb7eMHZDWf";
  const connection = new Connection(clusterApiUrl("devnet"), "confirmed");

  const accounts = await connection.getProgramAccounts(
    TOKEN_PROGRAM_ID, // new PublicKey("TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA")
    {
      dataSlice: {
        offset: 0, // number of bytes
        length: 0, // number of bytes
      },
      filters: [
        {
          dataSize: 165, // number of bytes
        },
        {
          memcmp: {
            offset: 0, // number of bytes
            bytes: MY_TOKEN_MINT_ADDRESS, // base58 encoded string
          },
        },
      ],
    }
  );
  console.log(
    `Found ${accounts.length} token account(s) for mint ${MY_TOKEN_MINT_ADDRESS}`
  );
  console.log(accounts);

  /*
  // Output (notice the empty <Buffer > at acccount.data)
  
  Found 3 token account(s) for mint BUGuuhPsHpk8YZrL2GctsCtXGneL1gmT5zYb7eMHZDWf
  [
    {
      account: {
        data: <Buffer >,
        executable: false,
        lamports: 2039280,
        owner: [PublicKey],
        rentEpoch: 228
      },
      pubkey: PublicKey {
        _bn: <BN: a8aca7a3132e74db2ca37bfcd66f4450f4631a5464b62fffbd83c48ef814d8d7>
      }
    },
    {
      account: {
        data: <Buffer >,
        executable: false,
        lamports: 2039280,
        owner: [PublicKey],
        rentEpoch: 228
      },
      pubkey: PublicKey {
        _bn: <BN: ce3b7b906c2ff6c6b62dc4798136ec017611078443918b2fad1cadff3c2e0448>
      }
    },
    {
      account: {
        data: <Buffer >,
        executable: false,
        lamports: 2039280,
        owner: [PublicKey],
        rentEpoch: 228
      },
      pubkey: PublicKey {
        _bn: <BN: d4560e42cb24472b0e1203ff4b0079d6452b19367b701643fa4ac33e0501cb1>
      }
    }
  ]
  */
})();
