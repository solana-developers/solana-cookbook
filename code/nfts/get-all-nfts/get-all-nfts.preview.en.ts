const nftTokens = tokenAccounts.value.filter(
    (item, _, __, tokenAmount = item.account.data.parsed.info.tokenAmount) =>
        parseFloat(tokenAmount.amount) === 1 &&
        parseInt(tokenAmount.decimals) === 0,
);