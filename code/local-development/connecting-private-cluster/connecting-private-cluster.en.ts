import {Connection} from "@solana/web3.js";

(async () => {
  // This will connect you to your local validator
  const connection = new Connection("http://127.0.0.1:8899", 'confirmed');
})();