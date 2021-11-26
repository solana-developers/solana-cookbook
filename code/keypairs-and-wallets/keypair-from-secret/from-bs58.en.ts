import { Keypair } from "@solana/web3.js";
import * as bs58 from "bs58";

(async () => {
  const keypair = Keypair.fromSecretKey(
    bs58.decode("5MaiiCavjCmn9Hs1o3eznqDEhRwxo7pXiAYez7keQUviUkauRiTMD8DrESdrNjN8zd9mTmVhRvBJeg5vhyvgrAhG")
  );
})();
