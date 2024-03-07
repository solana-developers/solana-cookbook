import { Connection, PublicKey } from '@solana/web3.js';
import { Market } from '@openbook-dex/openbook';

let connection = new Connection('https://testnet.solana.com');
let marketAddress = new PublicKey('...');
let programAddress = new PublicKey('...');
let market = await Market.load(connection, marketAddress, {}, programAddress);

