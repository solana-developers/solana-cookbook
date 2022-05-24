import { clusterApi, Connection } from "@solana/web3.js";

import Torus from "@toruslabs/solana-embed";

(async () => {
  const torus = new Torus();

  await torus.init({
    buildEnv: "testing", // uses solana-testing.tor.us (which uses testnet)
    enableLogging: true, // default : false
    showTorusButton: true, // default: true
  });
})();
