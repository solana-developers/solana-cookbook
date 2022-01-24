use anchor_lang::prelude::*;

declare_id!("2vD2HBhLnkcYcKxnxLjFYXokHdcsgJnyEXGnSpAX376e");

#[program]
pub mod mapping_pda {
    use super::*;
    pub fn initialize_blog(ctx: Context<InitializeBlog>, _blog_account_bump: u8, blog: Blog) -> ProgramResult {
        ctx.accounts.blog_account.set_inner(blog);
        Ok(())
    }

    pub fn create_post(ctx: Context<CreatePost>, _post_account_bump: u8, post: Post) -> ProgramResult {
        if (post.title.len() > 20) || (post.content.len() > 50) {
            return Err(ErrorCode::InvalidContentOrTitle.into());
        }

        ctx.accounts.post_account.set_inner(post);
        ctx.accounts.blog_account.post_count += 1;

        Ok(())
    }
}

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

#[account]
pub struct Blog {
    pub authority: Pubkey,
    pub bump: u8,
    pub post_count: u8,
}

#[account]
pub struct Post {
    pub author: Pubkey,
    pub slug: String, // 10 characters max
    pub title: String, // 20 characters max
    pub content: String // 50 characters max
}

impl Blog {
    const LEN: usize = 8 + 32 + 1 + (4 + (10 * 32));
}

impl Post {
    const LEN: usize = 8 + 32 + 32 + (4 + 10) + (4 + 20) + (4 + 50); 
}

#[error]
pub enum ErrorCode {
    #[msg("Invalid Content or Title.")]
    InvalidContentOrTitle,
}