---
title: Combine a game with Solana Pay
description: Solana Pay can be used for any kind of transaction signing, also for games
---

# Control a game via solana pay qr codes

Solana Pay is a very nice system which lets you create Qr codes that people can scan and sign any transaction on their phones. 
This can also be used for games.

Tug of war game live Version.
<iframe height='850' scrolling='no' title='TugOfWar' src='https://tug-of-war.vercel.app/' frameborder='no' allowtransparency='true' allowfullscreen='true' style='width: 110%;'>
</iframe>

Video live stream:
<div class="video-block">
<iframe width="320" height="200" src="https://www.youtube.com/embed/_XBvEHwSqJc" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
</div>

When the Player scans a Solana Pay Qr code the Wallet does a get request to your API to get a description and an Icon: 

```js
const get = async (req: NextApiRequest, res: NextApiResponse<GET>) => {
  const label = 'Tug of war';
  const icon =
    'https://media.discordapp.net/attachments/964525722301501477/978683590743302184/sol-logo1.png';

  res.status(200).json({
    label,
    icon,
  });
};
```

Then the wallet does a post request to get the transaction that you want to sign. 

```js
type POST = {
  transaction: string;
  message: string;
};

const post = async (req: NextApiRequest, res: NextApiResponse<POST>) => {

    const accountField = getFromPayload(req, 'Body', 'account');
    const instructionField = getFromPayload(req, 'Query', 'instruction');
    const amountField = getFromPayload(req, 'Query', 'amount');

    const sender = new PublicKey(accountField);
    const amount = Number.parseInt(amountField);

    const transaction = new Transaction();
    const latestBlockhash = await CONNECTION.getLatestBlockhash();
    transaction.feePayer = sender;
    transaction.recentBlockhash = latestBlockhash.blockhash;

    let message;

    // Here you can use instructionField to switch different instructions 

    transaction.add(new TransactionInstruction({
        keys: [
            { pubkey: getGameDataAccountPublicKey(), isSigner: false, isWritable: true },
            { pubkey: getChestAccountPublicKey(), isSigner: false, isWritable: true },
            { pubkey: payer, isSigner: true, isWritable: true },
        ],
        programId: TUG_OF_WAR_PROGRAM_ID,
        data: Buffer.from(sha256("global:pull_right").toString().substring(0, 16), "hex")
    }));
    message = 'Pull to the right !';

    // Serialize and return the unsigned transaction.
    const serializedTransaction = transaction.serialize({
    verifySignatures: false,
    requireAllSignatures: false,
    });

    const base64Transaction = serializedTransaction.toString('base64');

    res.status(200).send({ transaction: base64Transaction, message });
};
```

In the client you then create a QR code with the URL to the next js api.
For that you need the npm package: [@solana/pay](https://www.npmjs.com/package/@solana/pay)

```js
const PayQR: FC<TransactionRequestQRProps> = (
  { instruction }
) => {
  const qrRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const params = [
      ['amount', (0.001).toString()],
      ['instruction', instruction],
    ];

    const apiUrl = queryBuilder(
      `${window.location.protocol}//${window.location.host}/api/transaction`,
      params,
    );

    const qr = createQR(
      encodeURL({ link: new URL(apiUrl) }),
      360,
      'transparent'
    );

    qr.update({ backgroundOptions: { round: 1000 } });
    qr.update({ type: 'canvas' });

    if (qrRef.current != null) {
      qrRef.current.innerHTML = '';
      qr.append(qrRef.current)
    }

  }, [])
```

Here you can try a live version and find the full source code:

[Full Source](https://github.com/Solana-Workshops/tug-of-war-solana-pay)<br />
[Live Example](https://tug-of-war.vercel.app/)<br />
[Video Walkthrough](https://www.youtube.com/watch?v=_XBvEHwSqJc&ab_channel=SolPlay)<br />
