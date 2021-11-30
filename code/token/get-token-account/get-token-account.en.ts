import { clusterApiUrl, Connection, PublicKey } from "@solana/web3.js";
import { AccountLayout, u64 } from "@solana/spl-token";

(async () => {
  const connection = new Connection(clusterApiUrl("devnet"), "confirmed");

  const tokenAccount = new PublicKey("DRS5CSgPQp4uvPPcUA34tckfYFNUPNBJi77fVbnSfQHr");

  // 1. use getParsedAccountInfo
  {
    let accountInfo = await connection.getParsedAccountInfo(tokenAccount);
    // console.log(`raw data: ${JSON.stringify(accountInfo.value.data["parsed"]["info"])}`);
    console.log(`isNative: ${accountInfo.value.data["parsed"]["info"]["isNative"]}`);
    console.log(`mint: ${accountInfo.value.data["parsed"]["info"]["mint"]}`);
    console.log(`owner: ${accountInfo.value.data["parsed"]["info"]["owner"]}`);
    console.log(`decimals: ${accountInfo.value.data["parsed"]["info"]["tokenAmount"]["decimals"]}`);
    console.log(`amount: ${accountInfo.value.data["parsed"]["info"]["tokenAmount"]["amount"]}`);
    console.log(`delegate: ${accountInfo.value.data["parsed"]["info"]["delegate"]}`);
    if (accountInfo.value.data["parsed"]["info"]["delegate"] === undefined) {
      console.log(`delegate amount: 0}`);
    } else {
      console.log(`delegate amount: ${accountInfo.value.data["parsed"]["info"]["delegatedAmount"]["amount"]}`);
    }
    console.log(`closeAuthority: ${accountInfo.value.data["parsed"]["info"]["closeAuthority"]}`);
  }

  console.log("======");

  // 2. use getAccountInfo then deserialize data
  {
    let accountInfo = await connection.getAccountInfo(tokenAccount);
    let tokenAccountInfo = AccountLayout.decode(accountInfo.data);
    // console.log(`raw data: ${tokenAccountInfo}`);
    console.log(`isNative: ${tokenAccountInfo.isNativeOption === 1}`);
    console.log(`mint: ${new PublicKey(tokenAccountInfo.mint)}`);
    console.log(`owner: ${new PublicKey(tokenAccountInfo.owner)}`);
    // console.log(`decimals: `); actually decimals is stored in `mint` not in token account
    console.log(`amount: ${u64.fromBuffer(tokenAccountInfo.amount)}`);
    if (tokenAccountInfo.delegateOption === 1) {
      console.log(`delegate: ${new PublicKey(tokenAccountInfo.delegate)}`);
      console.log(`delegate amount: ${u64.fromBuffer(tokenAccountInfo.delegatedAmount)}`);
    } else {
      console.log(`delegate: undefined`);
      console.log(`delegate amount: ${u64.fromBuffer(tokenAccountInfo.delegatedAmount)}`);
    }
    if (tokenAccountInfo.closeAuthorityOption === 1) {
      console.log(`closeAuthority: ${new PublicKey(tokenAccountInfo.closeAuthority)}`);
    } else {
      console.log(`closeAuthority: undefined`);
    }
  }
})();
