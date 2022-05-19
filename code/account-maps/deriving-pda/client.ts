import * as borsh from "@project-serum/borsh";
import { PublicKey } from "@solana/web3.js";

export const BLOG_ACCOUNT_DATA_LAYOUT = borsh.struct([
  borsh.publicKey("authorityPubkey"),
  borsh.u8("bump"),
  borsh.u8("postCount"),
]);

export const POST_ACCOUNT_DATA_LAYOUT = borsh.struct([
  borsh.publicKey("author"),
  borsh.publicKey("blog"),
  borsh.u8("bump"),
  borsh.str("slug"),
  borsh.str("title"),
  borsh.str("content"),
]);

async () => {
  const connection = new Connection("http://localhost:8899", "confirmed");

  const [blogAccount] = await PublicKey.findProgramAddress(
    [Buffer.from("blog"), user.publicKey.toBuffer()],
    MY_PROGRAM_ID
  );

  const [postAccount] = await PublicKey.findProgramAddress(
    [Buffer.from("post"), Buffer.from("slug-1"), user.publicKey.toBuffer()],
    MY_PROGRAM_ID
  );

  const blogAccountInfo = await connection.getAccountInfo(blogAccount);
  const blogAccountState = BLOG_ACCOUNT_DATA_LAYOUT.decode(
    blogAccountInfo.data
  );
  console.log("Blog account state: ", blogAccountState);

  const postAccountInfo = await connection.getAccountInfo(postAccount);
  const postAccountState = POST_ACCOUNT_DATA_LAYOUT.decode(
    postAccountInfo.data
  );
  console.log("Post account state: ", postAccountState);
};
