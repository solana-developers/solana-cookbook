let aggregator = &ctx.accounts.aggregator_feed;
let val: u64 = AggregatorAccountData::new(aggregator)?
            .get_result()?
            .try_into()?;