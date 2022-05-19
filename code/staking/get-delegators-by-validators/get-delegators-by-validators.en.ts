import { clusterApiUrl, Connection, PublicKey } from "@solana/web3.js";

(async () => {
  const STAKE_PROGRAM_ID = new PublicKey(
    "Stake11111111111111111111111111111111111111"
  );
  const VOTE_PUB_KEY = "27MtjMSAQ2BGkXNuJEJkxFyCJT8dugGAaHJ9T7Gc6x4x";

  const connection = new Connection(clusterApiUrl("mainnet-beta"), "confirmed");
  const accounts = await connection.getParsedProgramAccounts(STAKE_PROGRAM_ID, {
    filters: [
      {
        dataSize: 200, // number of bytes
      },
      {
        memcmp: {
          offset: 124, // number of bytes
          bytes: VOTE_PUB_KEY, // base58 encoded string
        },
      },
    ],
  });

  console.log(`Accounts for program ${STAKE_PROGRAM_ID}: `);
  console.log(
    `Total number of delegators found for ${VOTE_PUB_KEY} is: ${accounts.length}`
  );
  if (accounts.length)
    console.log(`Sample delegator:`, JSON.stringify(accounts[0]));

  /*
  // Output

    Accounts for program Stake11111111111111111111111111111111111111: 
    Total number of delegators found for 27MtjMSAQ2BGkXNuJEJkxFyCJT8dugGAaHJ9T7Gc6x4x is: 184
    Sample delegator: 
    {
      "account": {
        "data": {
          "parsed": {
            "info": {
              "meta": {
                "authorized": {
                  "staker": "3VDVh3rHTLkNJp6FVYbuFcaihYBFCQX5VSBZk23ckDGV",
                  "withdrawer": "EhYXq3ANp5nAerUpbSgd7VK2RRcxK1zNuSQ755G5Mtxx"
                },
                "lockup": {
                  "custodian": "3XdBZcURF5nKg3oTZAcfQZg8XEc5eKsx6vK8r3BdGGxg",
                  "epoch": 0,
                  "unixTimestamp": 1822867200
                },
                "rentExemptReserve": "2282880"
              },
              "stake": {
                "creditsObserved": 58685367,
                "delegation": {
                  "activationEpoch": "208",
                  "deactivationEpoch": "18446744073709551615",
                  "stake": "433005300621",
                  "voter": "27MtjMSAQ2BGkXNuJEJkxFyCJT8dugGAaHJ9T7Gc6x4x",
                  "warmupCooldownRate": 0.25
                }
              }
            },
            "type": "delegated"
          },
          "program": "stake",
          "space": 200
        },
        "executable": false,
        "lamports": 433012149261,
        "owner": {
          "_bn": "06a1d8179137542a983437bdfe2a7ab2557f535c8a78722b68a49dc000000000"
        },
        "rentEpoch": 264
      },
      "pubkey": {
        "_bn": "0dc8b506f95e52c9ac725e714c7078799dd3268df562161411fe0916a4dc0a43"
      }
    }

  */
})();
