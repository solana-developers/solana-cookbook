# Account Maps (Hesap Haritaları)

Maps, bir key’i  bir tür değerle ilişkilendirmek için programlamada sıklıkla kullandığımız veri yapılarıdır. **Key** ve **değer** herhangi bir türde olabilir ve key, kaydedilmekte olan belirli bir değer için tanımlayıcı görevi görür. Daha sonra, key’i verildiğinde, bu değerleri verimli bir şekilde eklememize, almamıza ve güncellememize izin verir.

Solana'nın Hesap modeli, bildiğimiz gibi, program verilerinin ve ilgili durum verilerinin farklı account'larda depolanmasını gerektirir. Bu account'ların kendileriyle ilişkili bir adresi vardır. Bu, kendi içinde bir map görevi görür! Solana'nın Hesap modu hakkında daha fazla bilgiyi [buradan][AccountCookbook] edinebilirsiniz.

Bu nedenle, değeri almak için gereken key adresiyle değerlerinizi ayrı account'larda saklamak mantıklı olacaktır. Ancak bu, aşağıdaki gibi birkaç sorunu beraberinde getirir:

* Yukarıda bahsedilen adresler, büyük olasılıkla, hatırlayabileceğiniz ve gerekli değeri alabileceğiniz ideal **key**’ler olmayacaktır.

* Yukarıda bahsedilen adresler, her bir public key’in (veya adresin) kendisiyle ilişkilendirilmiş bir **private key**’e sahip olacağı farklı **Keypair**’lerin public key’lerine atıfta bulunur. Bu private key, gerektiğinde ve gerektiğinde farklı talimatları imzalamak için gerekli olacaktır, bu da private key’i bir yerde saklamamızı gerektirir, ki bu kesinlikle önerilmez!

Bu, birçok Solana geliştiricisinin karşılaştığı ve programlarına `Map` benzeri bir logic uygulayan bir sorun sunuyor. Bu sorunla nasıl başa çıkacağımıza birkaç yoldan bakalım:

## Deriving PDAs
PDA, [Program Derived Address][PDA] (Programdan Türetilmiş Adres) anlamına gelir ve kısaca, bir dizi seed ve bir program kimliğinden (veya adresinden) türetilen adreslerdir.

PDA'larla ilgili benzersiz olan şey, bu adreslerin herhangi bir private key ile ilişkili olmamasıdır. Bunun nedeni, bu adreslerin ED25519 eğrisi üzerinde yer almamasıdır. Bu nedenle, yalnızca bu adresin türetildiği program, seedler de sağlanmışsa, key’le bir talimat imzalayabilir. Bu konuda [buradan][CPI] daha fazla bilgi edinebilirsiniz.

Artık PDA'ların ne olduğu hakkında bir fikrimiz olduğuna göre, onları bazı account'ları eşleştirmek için kullanalım! Bunun nasıl uygulanacağını göstermek için bir **Blog** programı örneği alacağız.

Bu Blog programında, her `Kullanıcı`nın(User) tek bir `Blog`'u olmasını istiyoruz. Bu blog herhangi bir sayıda `Post` içerebilir. Bu, her kullanıcıyı bir blogla eşleştirdiğimiz (**mapping**) ve her yazının belirli bir blogla eşleştirildiği (**mapped**) anlamına gelir.

Kısacası, bir kullanıcı ile blogu arasında `1:1` eşleme varken, blog ve gönderileri arasında `1:N` eşleme vardır.

`1:1` eşleme için, bir blog adresinin yalnızca kullanıcısından türetilmesini isteriz; bu, yetkisi (veya kullanıcısı) verildiğinde bir blogu geri almamıza izin verir. Bu nedenle, bir blogun seed’leri, authority's key’den(otorite anahtarından) ve muhtemelen bir tür tanımlayıcısı olarak işlev görmesi için "blog" ön ekinden oluşacaktır.
`1:N` eşleme için, her bir gönderinin adresinin yalnızca ilişkili olduğu blogdan değil, aynı zamanda blogdaki N sayıda gönderi arasında ayrım yapmamıza izin veren başka bir tanımlayıcıdan türetilmesini isteriz. Aşağıdaki örnekte, her gönderinin adresi, **blog anahtarından**, her gönderiyi tanımlamak için bir **bilgi işaretinden** ve bir tür tanımlayıcısı olarak işlev görmek için "**Post**" ön ekinden türetilmiştir.

Kod aşağıda gösterildiği gibidir:
```rs
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
```

Client tarafında, gerekli `Blog` ve `Post` account'ı adresini almak için `PublicKey.findProgramAddress()`'i kullanabilirsiniz; bu adresi account verilerini almak için `connection.getAccountInfo()`'ya aktarabilirsiniz. Aşağıda bir örnek gösterilmiştir:
```ts
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

```

## Single Map Account

Mapping uygulamanın başka bir yolu, tek bir account'ta açık olarak saklanan bir `BTreeMap` veri yapısına sahip olmaktır. Bu account'ın adresi bir PDA veya oluşturulan bir Keypair’in public key’i olabilir.

Bu yöntem aşağıdaki nedenlerden dolayı ideal değildir:

* Gerekli key/value pairs çiftlerini buna eklemeden önce, önce `BTreeMap`'i depolayan account'ı başlatmanız gerekecektir. Ardından, her seferinde güncellemek için bu account'ın adresini de bir yere kaydetmeniz gerekir.

* Bir account'ın, bir account'ın maksimum 10 megabayt boyutuna sahip olabileceği ve BTreeMap'in çok sayıda key/value pairs depolamasını kısıtlayan bellek sınırlamaları vardır.

Bu nedenle, kullanım durumunuzu düşündükten sonra, bu yöntemi aşağıda gösterildiği gibi uygulayabilirsiniz:
```rs
fn process_init_map(accounts: &[AccountInfo], program_id: &Pubkey) -> ProgramResult {
    let account_info_iter = &mut accounts.iter();

    let authority_account = next_account_info(account_info_iter)?;
    let map_account = next_account_info(account_info_iter)?;
    let system_program = next_account_info(account_info_iter)?;

    if !authority_account.is_signer {
        return Err(ProgramError::MissingRequiredSignature)
    }

    let (map_pda, map_bump) = Pubkey::find_program_address(
        &[b"map".as_ref()],
        program_id
    );

    if map_pda != *map_account.key || !map_account.is_writable || !map_account.data_is_empty() {
        return Err(BlogError::InvalidMapAccount.into())
    }

    let rent = Rent::get()?;
    let rent_lamports = rent.minimum_balance(MapAccount::LEN);

    let create_map_ix = &system_instruction::create_account(
        authority_account.key, 
        map_account.key, 
        rent_lamports, 
        MapAccount::LEN.try_into().unwrap(), 
        program_id
    );

    msg!("Creating MapAccount account");
    invoke_signed(
        create_map_ix, 
        &[
            authority_account.clone(),
            map_account.clone(),
            system_program.clone()
        ],
        &[&[
            b"map".as_ref(),
            &[map_bump]
        ]]
    )?;

    msg!("Deserializing MapAccount account");
    let mut map_state = try_from_slice_unchecked::<MapAccount>(&map_account.data.borrow()).unwrap();
    let empty_map: BTreeMap<Pubkey, Pubkey> = BTreeMap::new();

    map_state.is_initialized = 1;
    map_state.map = empty_map;

    msg!("Serializing MapAccount account");
    map_state.serialize(&mut &mut map_account.data.borrow_mut()[..])?;

    Ok(())
}

fn process_insert_entry(accounts: &[AccountInfo], program_id: &Pubkey) -> ProgramResult {
    
    let account_info_iter = &mut accounts.iter();

    let a_account = next_account_info(account_info_iter)?;
    let b_account = next_account_info(account_info_iter)?;
    let map_account = next_account_info(account_info_iter)?;

    if !a_account.is_signer {
        return Err(ProgramError::MissingRequiredSignature)
    }

    if map_account.data.borrow()[0] == 0 || *map_account.owner != *program_id {
        return Err(BlogError::InvalidMapAccount.into())
    }

    msg!("Deserializing MapAccount account");
    let mut map_state = try_from_slice_unchecked::<MapAccount>(&map_account.data.borrow())?;

    if map_state.map.contains_key(a_account.key) {
        return Err(BlogError::AccountAlreadyHasEntry.into())
    }

    map_state.map.insert(*a_account.key, *b_account.key);
    
    msg!("Serializing MapAccount account");
    map_state.serialize(&mut &mut map_account.data.borrow_mut()[..])?;

    Ok(())
}

```


Yukarıdaki programı test etmek için Client tarafı kodu aşağıda gösterildiği gibi görünecektir:
```ts
const insertABIx = new TransactionInstruction({
  programId: MY_PROGRAM_ID,
  keys: [
    {
      pubkey: userA.publicKey,
      isSigner: true,
      isWritable: true,
    },
    {
      pubkey: userB.publicKey,
      isSigner: false,
      isWritable: false,
    },
    {
      pubkey: mapKey,
      isSigner: false,
      isWritable: true,
    },
  ],
  data: Buffer.from(Uint8Array.of(1)),
});

const insertBCIx = new TransactionInstruction({
  programId: MY_PROGRAM_ID,
  keys: [
    {
      pubkey: userB.publicKey,
      isSigner: true,
      isWritable: true,
    },
    {
      pubkey: userC.publicKey,
      isSigner: false,
      isWritable: false,
    },
    {
      pubkey: mapKey,
      isSigner: false,
      isWritable: true,
    },
  ],
  data: Buffer.from(Uint8Array.of(1)),
});

const insertCAIx = new TransactionInstruction({
  programId: MY_PROGRAM_ID,
  keys: [
    {
      pubkey: userC.publicKey,
      isSigner: true,
      isWritable: true,
    },
    {
      pubkey: userA.publicKey,
      isSigner: false,
      isWritable: false,
    },
    {
      pubkey: mapKey,
      isSigner: false,
      isWritable: true,
    },
  ],
  data: Buffer.from(Uint8Array.of(1)),
});

const tx = new Transaction();
tx.add(initMapIx);
tx.add(insertABIx);
tx.add(insertBCIx);
tx.add(insertCAIx);

```
[AccountCookbook]: https://solanacookbook.com/core-concepts/accounts.html
[PDA]: https://solanacookbook.com/references/accounts.html#program-derived-address
[CPI]: https://solanacookbook.com/references/programs.html#create-a-program-derived-address
