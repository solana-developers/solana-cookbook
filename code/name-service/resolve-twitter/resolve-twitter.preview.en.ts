// Pubkey of the wallet you want to retrieve the Twitter handle
const pubkey = new PublicKey("FidaeBkZkvDqi1GXNEwB8uWmj9Ngx2HXSS5nyGRuVFcZ");

const [handle, registryKey] = await getHandleAndRegistryKey(connection, pubkey);
