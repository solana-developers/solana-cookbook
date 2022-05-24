while (blockheight < lastValidBlockHeight) {
  connection.sendRawTransaction(rawTransaction, {
    skipPreflight: true,
  });
  await sleep(500);
  blockheight = await connection.getBlockHeight();
}
