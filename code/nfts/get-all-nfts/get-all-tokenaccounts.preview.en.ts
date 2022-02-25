const connection = new Connection('mainnet-beta');
const ownerPublickey = 'OWNER_PUBLICK_KEY';

const tokenAccounts = await connection.getParsedTokenAccountsByOwner(
  ownerPublickey,
  { programId: SPLToken.TOKEN_PROGRAM_ID },
);

