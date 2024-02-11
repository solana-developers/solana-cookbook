particle.auth.on('connect',  (userInfo)  =>  {
	console.log("particle userInfo", userInfo);
});

particle.auth.on('disconnect',  ()  =>  {
	console.log("particle disconnect");
});

particle.auth.on('chainChanged',  (chain)  =>  {
	console.log("particle chainChanged", chain);
});
