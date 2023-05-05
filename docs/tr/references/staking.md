# Staking (Stake Etme)

## Get Current Validators (Geçerli Validator’ları Getirme)

SOL'u stake edebilir ve ağın güvenliğini sağlamaya yardımcı olduğumuz için ödüller kazanabiliriz. Stake etmek için, SOL'u sırayla işlemleri işleyen validator’lara devrederiz.

```ts
import { clusterApiUrl, Connection } from "@solana/web3.js";

(async () => {
  const connection = new Connection(clusterApiUrl("devnet"), "confirmed");

  // Get all validators, categorized by current (i.e. active) and deliquent (i.e. inactive)
  const { current, delinquent } = await connection.getVoteAccounts();
  console.log("current validators: ", current);
  console.log("all validators: ", current.concat(delinquent));
})();
```

## Create Stake Account (Stake hesabı oluşturma)

Tüm stake etme talimatları, [Stake Program](https://docs.solana.com/developing/runtime-facilities/programs#stake-program)ı tarafından işlenir. Başlamak için, standart bir [sistem account](accounts.md#create-a-system-account)'ından farklı olarak oluşturulan ve yönetilen bir [Stake Hesabı](https://docs.solana.com/staking/stake-accounts) oluşturuyoruz. Özellikle, account'ın `Stake Authority`’sini ve `Withdrawal Authority`’sini ayarlamalıyız.

```ts
// Setup a transaction to create our stake account
// Note: `StakeProgram.createAccount` returns a `Transaction` preconfigured with the necessary `TransactionInstruction`s
const createStakeAccountTx = StakeProgram.createAccount({
  authorized: new Authorized(wallet.publicKey, wallet.publicKey), // Here we set two authorities: Stake Authority and Withdrawal Authority. Both are set to our wallet.
  fromPubkey: wallet.publicKey,
  lamports: amountToStake,
  lockup: new Lockup(0, 0, wallet.publicKey), // Optional. We'll set this to 0 for demonstration purposes.
  stakePubkey: stakeAccount.publicKey,
});

const createStakeAccountTxId = await sendAndConfirmTransaction(
  connection,
  createStakeAccountTx,
  [
    wallet,
    stakeAccount, // Since we're creating a new stake account, we have that account sign as well
  ]
);
console.log(`Stake account created. Tx Id: ${createStakeAccountTxId}`);

// Check our newly created stake account balance. This should be 0.5 SOL.
let stakeBalance = await connection.getBalance(stakeAccount.publicKey);
console.log(`Stake account balance: ${stakeBalance / LAMPORTS_PER_SOL} SOL`);

// Verify the status of our stake account. This will start as inactive and will take some time to activate.
let stakeStatus = await connection.getStakeActivation(stakeAccount.publicKey);
console.log(`Stake account status: ${stakeStatus.state}`);

```

## Delegate Stake (Delegate Stake)

Bir stake account finanse edildiğinde, `Stake Authority` bunu bir validator’e devredebilir. Her stake account aynı anda yalnızca bir validator’e devredilebilir. Ayrıca, account'taki tüm tokenlar ya delegated(devredilebilir) ya da un-delegated(devredilemez) olmalıdır. Bir kez devredildikten sonra, bir stake account'ının aktif hale gelmesi birkaç epoch(döngü)sürer.

```ts
// With a validator selected, we can now setup a transaction that delegates our stake to their vote account.
const delegateTx = StakeProgram.delegate({
  stakePubkey: stakeAccount.publicKey,
  authorizedPubkey: wallet.publicKey,
  votePubkey: selectedValidatorPubkey,
});

const delegateTxId = await sendAndConfirmTransaction(connection, delegateTx, [
  wallet,
]);
console.log(
  `Stake account delegated to ${selectedValidatorPubkey}. Tx Id: ${delegateTxId}`
);

// Check in on our stake account. It should now be activating.
stakeStatus = await connection.getStakeActivation(stakeAccount.publicKey);
console.log(`Stake account status: ${stakeStatus.state}`);

```

## Get Delegator by Validators (Validator account’a stake eden account’ları getirme)

Birden fazla account, belirli bir validator account’a stake etmiş olabilir. Tüm stakerları getirmek için `getProgramAccounts` veya `getParsedProgramAccounts` API kullanacağız. Daha fazla bilgi için [kılavuzlar bölümü](/guides/get-program-accounts.html)ne bakın. Bahis account'ları 200 bayt uzunluğundadır ve Voter Public Key 124 bayttan başlar. [Referans](https://github.com/solana-labs/solana/blob/e960634909a9617fb98d5d836c9c4c5e0d9d59cc/sdk/program/src/stake/state.rs)

```ts
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

```

## Deactivate Stake (Stake’i Devre Dışı Bırakma)

Bir stake account devredildikten sonra herhangi bir zamanda, `Stake Authority` account'ı devre dışı bırakmayı seçebilir. Devre dışı bırakmanın tamamlanması birkaç epoch alabilir ve herhangi bir SOL geri çekilmeden önce gereklidir.

```ts
// At anytime we can choose to deactivate our stake. Our stake account must be inactive before we can withdraw funds.
const deactivateTx = StakeProgram.deactivate({
  stakePubkey: stakeAccount.publicKey,
  authorizedPubkey: wallet.publicKey,
});
const deactivateTxId = await sendAndConfirmTransaction(
  connection,
  deactivateTx,
  [wallet]
);
console.log(`Stake account deactivated. Tx Id: ${deactivateTxId}`);

// Check in on our stake account. It should now be inactive.
stakeStatus = await connection.getStakeActivation(stakeAccount.publicKey);
console.log(`Stake account status: ${stakeStatus.state}`);

```

## Withdraw Stake (Stake’i Çekme)

Devre dışı bırakıldığında,`Withdrawal Authority` SOL'yi bir sistem account'ına geri çekebilir. Bir stake hasabı artık devredilmediğinde ve 0 SOL bakiyesine sahip olduğunda, etkili bir şekilde yok edilir.

```ts
// Once deactivated, we can withdraw our SOL back to our main wallet
const withdrawTx = StakeProgram.withdraw({
  stakePubkey: stakeAccount.publicKey,
  authorizedPubkey: wallet.publicKey,
  toPubkey: wallet.publicKey,
  lamports: stakeBalance, // Withdraw the full balance at the time of the transaction
});

const withdrawTxId = await sendAndConfirmTransaction(connection, withdrawTx, [
  wallet,
]);
console.log(`Stake account withdrawn. Tx Id: ${withdrawTxId}`);

// Confirm that our stake account balance is now 0
stakeBalance = await connection.getBalance(stakeAccount.publicKey);
console.log(`Stake account balance: ${stakeBalance / LAMPORTS_PER_SOL} SOL`);

```
