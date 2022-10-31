import {
  keypairIdentity,
  Metaplex,
  sol,
  toBigNumber,
} from "@metaplex-foundation/js";
import { Keypair, Connection, LAMPORTS_PER_SOL } from "@solana/web3.js";

const createCandyMachine = async () => {
  const connection = new Connection(
    "https://api.devnet.solana.com/",
    "confirmed"
  );
  const payer = Keypair.generate();

  // request airdrop
  const airdropSignature = await connection.requestAirdrop(
    payer.publicKey,
    2 * LAMPORTS_PER_SOL
  );

  console.log(`Airdrop signature - ${airdropSignature}`);

  // creating metaplex instance with payer as the authority
  const metaplex = Metaplex.make(connection).use(keypairIdentity(payer));

  // creating a candy machine
  const { candyMachine } = await metaplex.candyMachinesV2().create({
    sellerFeeBasisPoints: 5, // 0.05% royalties
    price: sol(0.0001), // 0.0001 SOL
    itemsAvailable: toBigNumber(5), // 5 items available
  });

  console.log(`Candy Machine ID - ${candyMachine.address.toString()}`);
};

createCandyMachine();
