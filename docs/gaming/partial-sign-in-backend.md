---
title: Partial sign in the backend
description: Sometimes it makes sense to sign a transaction in the backend for security
---

# How to sign your transaction in the backend

Sometimes you do not want to trust the client or you want to add some extra data to a transaction in the backend. 
For this you can partially sign and transaction and then send it to the client to finish of with a signature of the user. 

The easiest way to do this is to create a [Next js app](https://nextjs.org/learn/basics/create-nextjs-app) and use the api to create a transaction. 
Like this you can be sure that the client can not change the transaction afterwards otherwise the signature would not be correct anymore.

```js 
type GET = {
  transaction: string;
  message: string;
};

const get = async (req: NextApiRequest, res: NextApiResponse<GET>) => {
  // Load a private key from the local environment. Make sure to not commit the key to your repository! 
  const authorityKeypair = JSON.parse(process.env.PRIVATE_KEY??"[]");
  const backendWallet = Keypair.fromSecretKey(
    Uint8Array.from(authorityKeypair)
  );

  const someDataString = getFromPayload(req, 'Query', 'someData');

  const pubkey = getFromPayload(req, 'Query', 'playerPubkey');
  const feepayer: PublicKey = new PublicKey(pubkey);

  const blockhash = await CONNECTION.getLatestBlockhash();

  const transaction = new Transaction();
  //transaction.addInstruction(someInstruction)

  transaction.recentBlockhash = blockhash.blockhash;
  transaction.feepayer = feepayer;

  transaction.partialSign(backendWallet);
  
  const serializedTransaction = transaction.serialize({
    verifySignatures: false,
    requireAllSignatures: false,
  });

  const base64Transaction = serializedTransaction.toString('base64');

  res.status(200).json({
    transaction: base64Transaction,
    message: "OK",
  });
};
```

In the client you can then unpack the transaction and sign it with the users wallet, for example using the Solana wallet adapter.

```js 
    const response = await fetch(url);
    const jsonResponse = await response.json(); //extract JSON from the http response

    const decodedTx = Buffer.from(jsonResponse.transaction, "base64");
    const transaction = Transaction.from(decodedTx);

    const signature = await sendTransaction(transaction, CONNECTION, {
        skipPreflight: true,
    });

    console.log("Signature: " + signature);
    await CONNECTION.confirmTransaction(signature, "confirmed");
```
