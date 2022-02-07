(async () => {
while (!done && getUnixTs() - startTime < timeout) {
    connection.sendRawTransaction(rawTransaction, {
        skipPreflight: true,
    });
    await sleep(300);
}
})();