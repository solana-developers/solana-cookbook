#[derive(Accounts)]
#[instruction(blog_account_bump: u8)]
pub struct InitializeBlog<'info> {
    #[account(
        init,
        seeds = [
            b"blog".as_ref(),
            authority.key().as_ref()
        ],
        bump = blog_account_bump,
        payer = authority,
        space = Blog::LEN
    )]
    pub blog_account: Account<'info, Blog>,

    #[account(mut)]
    pub authority: Signer<'info>,

    pub system_program: Program<'info, System>
}

#[derive(Accounts)]
#[instruction(post_account_bump: u8, post: Post)]
pub struct CreatePost<'info> {
    #[account(mut, has_one = authority)]
    pub blog_account: Account<'info, Blog>,

    #[account(
        init,
        seeds = [
            b"post".as_ref(),
            blog_account.key().as_ref(),
            post.slug.as_ref(),
        ],
        bump = post_account_bump,
        payer = authority,
        space = Post::LEN
    )]
    pub post_account: Account<'info, Post>,

    #[account(mut)]
    pub authority: Signer<'info>,
    
    pub system_program: Program<'info, System>
}