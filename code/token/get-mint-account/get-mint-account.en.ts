import { clusterApiUrl, Connection, PublicKey } from "@solana/web3.js";
import { MintLayout, u64 } from "@solana/spl-token";

(async () => {
  const connection = new Connection(clusterApiUrl("devnet"), "confirmed");

  const mint = new PublicKey("54dQ8cfHsW1YfKYpmdVZhWpb9iSi6Pac82Nf7sg3bVb");

  // 1. use getParsedAccountInfo
  {
    let accountInfo = await connection.getParsedAccountInfo(mint);
    // console.log(`raw data: ${JSON.stringify(accountInfo.value.data["parsed"]["info"])}`);
    console.log(`supply: ${accountInfo.value.data["parsed"]["info"]["supply"]}`);
    console.log(`decimals: ${accountInfo.value.data["parsed"]["info"]["decimals"]}`);
    console.log(`mintAuthority: ${accountInfo.value.data["parsed"]["info"]["mintAuthority"]}`);
    console.log(`freezeAuthority: ${accountInfo.value.data["parsed"]["info"]["freezeAuthority"]}`);
  }

  console.log("=====");

  // 2. use getAccountInfo then deserialize data
  {
    let accountInfo = await connection.getAccountInfo(mint);
    let mintInfo = MintLayout.decode(accountInfo.data);
    // console.log(`raw data: ${mintInfo}`);
    console.log(`supply: ${u64.fromBuffer(mintInfo.supply)}`);
    console.log(`decimals: ${mintInfo.decimals}`);
    if (mintInfo.mintAuthorityOption === 1) {
      console.log(`mintAuthority: ${new PublicKey(mintInfo.mintAuthority)}`);
    } else {
      console.log(`mintAuthority: null`);
    }
    if (mintInfo.freezeAuthorityOption === 1) {
      console.log(`freezeAuthority: ${new PublicKey(mintInfo.freezeAuthority)}`);
    } else {
      console.log(`freezeAuthority: null`);
    }
  }
})();
