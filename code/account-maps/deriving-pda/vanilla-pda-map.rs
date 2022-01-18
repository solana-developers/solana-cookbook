use std::convert::TryInto;
use borsh::{BorshDeserialize, BorshSerialize};
use solana_program::{
    sysvar::{rent::Rent, Sysvar},
    borsh::try_from_slice_unchecked,
    account_info::{AccountInfo, next_account_info},
    entrypoint,
    entrypoint::ProgramResult, 
    pubkey::Pubkey, 
    msg,
    program_error::ProgramError, system_instruction, program::invoke_signed,
};
use thiserror::Error;


entrypoint!(process_instruction);
fn process_instruction(
    program_id: &Pubkey,
    accounts: &[AccountInfo],
    instruction_data: &[u8],
) -> ProgramResult {
    Processor::process(program_id, accounts, instruction_data)
}

pub enum BlogInstruction {

    /// Accounts expected:
    /// 
    /// 0. `[signer]` User account who is creating the blog
    /// 1. `[writable]` Blog account derived from PDA
    /// 2. `[]` The System Program
    InitBlog {},

    /// Accounts expected:
    /// 
    /// 0. `[signer]` User account who is creating the post
    /// 1. `[writable]` Blog account for which post is being created
    /// 2. `[writable]` Post account derived from PDA
    /// 3. `[]` System Program
    CreatePost {
        slug: String,
        title: String,
        content: String,
    }
}

pub struct Processor;
impl Processor {
    pub fn process(program_id: &Pubkey, accounts: &[AccountInfo], instruction_data: &[u8]) -> ProgramResult {
        
        let instruction = BlogInstruction::unpack(instruction_data)?;

        match instruction {
            BlogInstruction::InitBlog {} => {
                msg!("Instruction: InitBlog");
                Self::process_init_blog(accounts, program_id)
            },
            BlogInstruction::CreatePost { slug, title, content} => {
                msg!("Instruction: CreatePost");
                Self::process_create_post(accounts, slug, title, content, program_id)
            }
        }
    }

    fn process_create_post(
        accounts: &[AccountInfo],
        slug: String,
        title: String,
        content: String,
        program_id: &Pubkey
    ) -> ProgramResult {
        if slug.len() > 10 || content.len() > 20 || title.len() > 50 {
            return Err(BlogError::InvalidPostData.into())
        }

        let account_info_iter = &mut accounts.iter();

        let authority_account = next_account_info(account_info_iter)?;
        let blog_account = next_account_info(account_info_iter)?;
        let post_account = next_account_info(account_info_iter)?;
        let system_program = next_account_info(account_info_iter)?;

        if !authority_account.is_signer {
            return Err(ProgramError::MissingRequiredSignature);
        }

        let (blog_pda, _blog_bump) = Pubkey::find_program_address(
            &[b"blog".as_ref(), authority_account.key.as_ref()],
            program_id
        );
        if blog_pda != *blog_account.key || !blog_account.is_writable || blog_account.data_is_empty() {
            return Err(BlogError::InvalidBlogAccount.into())
        }

        let (post_pda, post_bump) = Pubkey::find_program_address(
            &[b"post".as_ref(), slug.as_ref(), authority_account.key.as_ref()],
            program_id
        );
        if post_pda != *post_account.key {
            return Err(BlogError::InvalidPostAccount.into())
        }

        let post_len: usize = 32 + 32 + 1 + (4 + slug.len()) + (4 + title.len()) + (4 + content.len());

        let rent = Rent::get()?;
        let rent_lamports = rent.minimum_balance(post_len);

        let create_post_pda_ix = &system_instruction::create_account(
            authority_account.key,
            post_account.key,
            rent_lamports,
            post_len.try_into().unwrap(),
            program_id
        );
        msg!("Creating post account!");
        invoke_signed(
            create_post_pda_ix, 
            &[
                authority_account.clone(),
                post_account.clone(),
                system_program.clone()
            ],
            &[&[
                b"post".as_ref(),
                slug.as_ref(),
                authority_account.key.as_ref(),
                &[post_bump]
            ]]
        )?;

        let mut post_account_state = try_from_slice_unchecked::<Post>(&post_account.data.borrow()).unwrap();
        post_account_state.author = *authority_account.key;
        post_account_state.blog = *blog_account.key;
        post_account_state.bump = post_bump;
        post_account_state.slug = slug;
        post_account_state.title = title;
        post_account_state.content = content;

        msg!("Serializing Post data");
        post_account_state.serialize(&mut &mut post_account.data.borrow_mut()[..])?;


        let mut blog_account_state = Blog::try_from_slice(&blog_account.data.borrow())?;
        blog_account_state.post_count += 1;

        msg!("Serializing Blog data");
        blog_account_state.serialize(&mut &mut blog_account.data.borrow_mut()[..])?;

        Ok(())
    }

    fn process_init_blog(
        accounts: &[AccountInfo],
        program_id: &Pubkey
    ) -> ProgramResult {
        let account_info_iter = &mut accounts.iter();
        
        let authority_account = next_account_info(account_info_iter)?;
        let blog_account = next_account_info(account_info_iter)?;
        let system_program = next_account_info(account_info_iter)?;

        if !authority_account.is_signer {
            return Err(ProgramError::MissingRequiredSignature);
        }

        let (blog_pda, blog_bump) = Pubkey::find_program_address(
            &[b"blog".as_ref(), authority_account.key.as_ref()],
            program_id 
        );
        if blog_pda != *blog_account.key {
            return Err(BlogError::InvalidBlogAccount.into())
        }

        let rent = Rent::get()?;
        let rent_lamports = rent.minimum_balance(Blog::LEN);
        
        let create_blog_pda_ix = &system_instruction::create_account(
            authority_account.key,
            blog_account.key,
            rent_lamports,
            Blog::LEN.try_into().unwrap(),
            program_id
        );
        msg!("Creating blog account!");
        invoke_signed(
            create_blog_pda_ix, 
            &[
                authority_account.clone(),
                blog_account.clone(),
                system_program.clone()
            ],
            &[&[
                b"blog".as_ref(),
                authority_account.key.as_ref(),
                &[blog_bump]
            ]]
        )?;

        let mut blog_account_state = Blog::try_from_slice(&blog_account.data.borrow())?;
        blog_account_state.authority = *authority_account.key;
        blog_account_state.bump = blog_bump;
        blog_account_state.post_count = 0;
        blog_account_state.serialize(&mut &mut blog_account.data.borrow_mut()[..])?;
        

        Ok(())
    }
}



#[derive(BorshDeserialize, Debug)]
struct PostIxPayload {
    slug: String,
    title: String,
    content: String
}


impl BlogInstruction {
    pub fn unpack(input: &[u8]) -> Result<Self, ProgramError> {
        let (variant, rest) = input.split_first().ok_or(BlogError::InvalidInstruction)?;
        let payload = PostIxPayload::try_from_slice(rest).unwrap();

        Ok(match variant {
            0 => Self::InitBlog {},
            1 => Self::CreatePost {
                slug: payload.slug,
                title: payload.title,
                content: payload.content
            },
            _ => return Err(BlogError::InvalidInstruction.into()),
        })
    }
}

#[derive(BorshSerialize, BorshDeserialize, Debug, Clone)]
pub struct Blog {
    pub authority: Pubkey,
    pub bump: u8,
    pub post_count: u8 // 10 posts max
}

#[derive(BorshSerialize, BorshDeserialize, Debug, Clone)]
pub struct Post {
    pub author: Pubkey,
    pub blog: Pubkey,
    pub bump: u8,
    pub slug: String, // 10 chars max
    pub title: String, // 20 chars max
    pub content: String, // 50 chars max
}

impl Blog {
    pub const LEN: usize = 32 + 1 + 1;
}

#[derive(Error, Debug, Copy, Clone)]
pub enum BlogError {
    #[error("Invalid Instruction")]
    InvalidInstruction,

    #[error("Invalid Blog Account")]
    InvalidBlogAccount,

    #[error("Invalid Post Account")]
    InvalidPostAccount,

    #[error("Invalid Post Data")]
    InvalidPostData,

    #[error("Account not Writable")]
    AccountNotWritable,
}

impl From<BlogError> for ProgramError {
    fn from(e: BlogError) -> Self {
        return ProgramError::Custom(e as u32);
    }
}