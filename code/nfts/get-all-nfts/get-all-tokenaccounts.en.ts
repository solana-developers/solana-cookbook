const { Connection, PublicKey } = require('@solana/web3.js');
const SPLToken = require('@solana/spl-token');
const Metaplex = require('@metaplex/js');

const MetadataProgram = Metaplex.programs.metadata;

(async () => {
  const connection = new Connection('mainnet-beta');
  const ownerPublickey = 'OWNER_PUBLICK_KEY';
  
  const tokenAccounts = await connection.getParsedTokenAccountsByOwner(
    ownerPublickey,
    { programId: SPLToken.TOKEN_PROGRAM_ID },
  );
  
})();