const nftAndMetadata = Promise.all(
  nftTokens.map((nftToken) =>
    async () => {
      const mint = nftToken.account.data.parsed.info.mint;
      const pda = await MetadataProgram.Metadata.getPDA(
        new PublicKey(mint),
      );
      const metadataAccountInfo = await connection.getAccountInfo(pda);
      const attachedMetadata = new MetadataProgram.Metadata(
        pda,
        metadataAccountInfo,
      );
      return { nftToken, attachedMetadata };
    },
  ),
);