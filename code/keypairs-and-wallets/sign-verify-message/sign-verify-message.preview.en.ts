const message = "The quick brown fox jumps over the lazy dog";
const messageBytes = decodeUTF8(message);

const signature = nacl.sign.detached(messageBytes, keypair.secretKey);
const result = nacl.sign.detached.verify(
  messageBytes,
  signature,
  keypair.publicKey.toBytes()
);

console.log(result);
