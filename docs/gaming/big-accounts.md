---
title: How to handle big accounts with zero copy
description: Stack and heap size is rather limited on Solana so here is some help
---

# How to handle big accounts

[Zero Copy Example with tests](https://github.com/Woody4618/anchor-zero-copy-example)

The heap and stack memory in the solana runtime are very limited. We have 4Kb to work with on the stack and 32Kb on the heap.
The stack increased by 10Kb per loaded account. These limits are quickly reached when building a game. 
By default in Anchor all accounts being loaded will be on the stack. If you reach the stack limit you will an error similar to this: 

```js
Stack offset of -30728 exceeded max offset of -4096 by 26632 bytes, please minimize large stack variables
```

To prevent this to a certain degree, you can box your account. What this means is that the account will move to the heap, and there will only be a pointer saved on the stack. 
This can be done like this:

```js
#[derive(Accounts)]
pub struct Example {
    pub my_acc: Box<Account<'info, MyData>>
}
```

If your account gets bigger it gets a bit more complicated. Solana does not allow Cross Program Invocations with accounts bigger than 10Kb.
Anchor does use a CPI to initialize all new accounts. So it calls the System Program internally to create a new account.
You can allocate more memory to your account like this with an extra transaction: 

```js
Program: 

    #[derive(Accounts)]
    #[instruction(len: u16)]
    pub struct IncreaseAccountSize<'info> {
        #[account(mut, 
            realloc = len as usize, 
            realloc::zero = true, 
            realloc::payer=signer)]
        pub data_holder: Account<'info, DataHolderNoZeroCopy>,
        #[account(mut)]
        pub signer: Signer<'info>,
        #[account(address = system_program::ID)]
        pub system_program: Program<'info, System>,
    }

Js: 
    let txRealloc = await program.methods
    .increaseAccountData(20480)
    .accounts({
    signer: signer.publicKey,
    dataHolder: pdaNoZeroCopy,
    systemProgram: anchor.web3.SystemProgram.programId
    })
    .signers([signer])
    .rpc();
```

You can then call this multiple times, adding 10240 bytes in each transaction. When loading an account that is bigger than 10240 bytes, however, you will get an out-of-memory exception.

If you need an even bigger account size, you need to look into Zero Copy serialization. You should only use zero copy for large accounts that cannot be Borsh/Anchor deserialized without hitting the heap or stack limits. With zero copy deserialization, all bytes from the account's backing RefCell<&mut [u8]> are simply reinterpreted as a reference to the data structure. No allocations or copies are necessary. This is how we can get around the stack and heap limitations.

For the account you want to serialize with zero copy, you need to add this zero_copy attribute to the account:

```js
#[account(zero_copy)]
```

Then you can define the repr which defines how the data will be packed. By default repr[c] will be used, so the C serialization. 
This will by default break options and enums in your structs because the C serialization is different from the Borsh serialization.
You can also use:  

```js
#[repr(packed)]
```

which should remove all the extra space that the C serialization adds.

Here is a list of different repr types <br/>
[Repr types](https://doc.rust-lang.org/nomicon/other-reprs.html)<br/>
[Space needed for different data types](https://book.anchor-lang.com/anchor_references/space.html)<br/>

Next you replace Account with AccountLoader and then in you anchor program you can access the data using .load_mut()?
Like this you can interact with the data of the account using copy_from_slice or mem copy without loading the whole account into memory.

```js

    pub fn set_data(ctx: Context<SetData>, string_to_set: String, index: u64) -> Result<()> {
        let text_to_add_to_the_account = str::from_utf8(string_to_set.as_bytes()).unwrap();
        msg!(text_to_add_to_the_account);

        // Since the account is bigger that the heap space as soon as we access the whole account we will get a out of memory error        
        // let string = &ctx.accounts.data_holder.load_mut()?.long_string;
        // let complete_string = str::from_utf8(string).unwrap(); 
        // msg!("DataLength: {}", string.len());
        // msg!("CompleteString: {}", complete_string);

        // So the solution is use copy_from_slice and mem copy when we want to access data in the big account
        ctx.accounts
            .data_holder
            .load_mut()?
            .long_string[((index) as usize)..((index +912) as usize)]
            .copy_from_slice(string_to_set.as_bytes());

        Ok(())
    }

    // This will initialize the PDA with the maximum possible size of 10 Kb
    #[derive(Accounts)]
    pub struct Initialize<'info> {
        #[account(init, seeds = [b"data_holder_zero_copy_v0", 
        signer.key().as_ref()], 
        bump, 
        payer=signer, 
        space= 10 * 1024 as usize)]
        pub data_holder: AccountLoader<'info, DataHolder>,
        #[account(mut)]
        pub signer: Signer<'info>,
        #[account(address = system_program::ID)]
        pub system_program: Program<'info, System>,
    }

    #[account(zero_copy)]
    #[repr(packed)]
    pub struct DataHolder {
        // 40952 = 40960 - 8 (account desciminator)
        pub long_string: [u8; 40952],
    }

    #[derive(Accounts)]
    #[instruction(len: u16)]
    pub struct IncreaseZeroCopy<'info> {
        #[account(mut, 
            realloc = len as usize, 
            realloc::zero = true, 
            realloc::payer=signer)]
        pub data_holder: AccountLoader<'info, DataHolder>,
        #[account(mut)]
        pub signer: Signer<'info>,
        #[account(address = system_program::ID)]
        pub system_program: Program<'info, System>,
    }
}
```

Here is a game anchor program that uses Zero Copy for a game grid: <br/> 
[Anchor Program](https://github.com/Woody4618/SolPlay_Unity_SDK/blob/main/Assets/SolPlay/Examples/SolHunter/AnchorProgram/src/state/game.rs)
[Another Example using items](https://github.com/coral-xyz/anchor/issues/651)

