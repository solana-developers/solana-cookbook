import { clusterApiUrl, Connection, PublicKey } from "@solana/web3.js";
import { getAccount } from "@solana/spl-token";

(async () => {
  const connection = new Connection(clusterApiUrl("devnet"), "confirmed");

  const tokenAccountPubkey = new PublicKey("2XYiFjmU1pCXmC2QfEAghk6S7UADseupkNQdnRBXszD5");

  let tokenAccount = await getAccount(connection, tokenAccountPubkey);
  console.log(tokenAccount);
  /*
  {
    address: PublicKey {
      _bn: <BN: 16aef79dfadb39ffedb3b6f77688b8c162b18bb9cba2ffefe152303629ae3030>
    },
    mint: PublicKey {
      _bn: <BN: 7351e5e067cc7cfefef42e78915d3c513edbb8adeeab4d9092e814fe68c39fec>
    },
    owner: PublicKey {
      _bn: <BN: df30e6ca0981c1a677eed6f7cb46b2aa442ca9b7a10a10e494badea4b9b6944f>
    },
    amount: 0n,
    delegate: null,
    delegatedAmount: 0n,
    isInitialized: true,
    isFrozen: false,
    isNative: false,
    rentExemptReserve: null,
    closeAuthority: null
  }
  */

})();
