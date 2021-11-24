import {
    Connection,
    clusterApiUrl,
} from "@solana/web3.js";

(async () => {
    const connection = new Connection(clusterApiUrl('devnet'), 'confirmed');

    // length of data in the account to calculate rent for
    const dataLength = 1500;
    const rentExemptionAmount = await connection.getMinimumBalanceForRentExemption(dataLength);
    console.log({
        rentExemptionAmount
    })
})();