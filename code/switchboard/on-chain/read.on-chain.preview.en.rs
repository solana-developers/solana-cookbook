let aggregator = &ctx.accounts.aggregator_feed.load()?;
let val:f64 = aggregator
    .get_result()?
    .try_into()?;
