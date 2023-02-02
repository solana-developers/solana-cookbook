# Name Service (Name Servisi)

## Name registry (Name kaydı)

Name registry stores (ad kayıt defteri), alan adıyla ilgili bilgileri depolar. İki şeyden oluşur:

- Başlık
- Veri

Bir alan adının verilerinin önüne her zaman başlık eklenir, JS'deki başlığın yapısı aşağıdadır:

```ts
export class NameRegistryState {
  parentName: PublicKey;
  owner: PublicKey;
  class: PublicKey;
  data: Buffer | undefined;

  static HEADER_LEN = 96;

  static schema: Schema = new Map([
    [
      NameRegistryState,
      {
        kind: "struct",
        fields: [
          ["parentName", [32]],
          ["owner", [32]],
          ["class", [32]],
        ],
      },
    ],
  ]);
  constructor(obj: {
    parentName: Uint8Array;
    owner: Uint8Array;
    class: Uint8Array;
  }) {
    this.parentName = new PublicKey(obj.parentName);
    this.owner = new PublicKey(obj.owner);
    this.class = new PublicKey(obj.class);
  }
}

```


## Resolving SOL domains (SOL alan adlarını çözme)

.SOL alan adları, publicKey'lere dönüşen benzersiz, kullanıcı dostu alan adlarıdır. Birçok cüzdan, bunları token veya SOL göndermek için başka bir seçenek olarak kullanır. .SOL alan adlarını aşağıdakilerle publicKey'lerine dönüştürebilirsiniz:

```ts
const domain = "levi.sol";
const hashedName = await getHashedName(domain.replace(".sol", ""));
const nameAccountKey = await getNameAccountKey(
  hashedName,
  undefined,
  new PublicKey("58PwtjSDuFHuUkYjH9BYnnQKHfwo9reZhC2zMJv9JPkx") // SOL TLD Authority
);
const owner = await NameRegistryState.retrieve(
  new Connection(clusterApiUrl("mainnet-beta")),
  nameAccountKey
);
console.log(owner.registry.owner.toBase58());
// JUskoxS2PTiaBpxfGaAPgf3cUNhdeYFGMKdL6mZKKfR

```

## Reverse lookup (Geriye doğru arama)

Reverse lookup, alan adını public key’den çözmek için kullanılabilir.

```ts
// Public key of bonfida.sol
const domainKey = new PublicKey("Crf8hzfthWGbGbLTVCiqRqV5MVnbpHB1L9KQMd6gsinb");

const domainName = await performReverseLookup(connection, domainKey); // bonfida

```

## Subdomain lookup (Subdomain arama)

Bir subdomain’i çözmek için yapmanız gerekenler:

1. Üst etki alanı anahtarını(parent domain key) alın
2. Alt alan anahtarını(subdomain key) alın
3. Hesap bilgilerini geri alın

```ts
const parentDomain = "bonfida";
const subDomain = "demo";

// Step 1
const hashedParentDomain = await getHashedName(parentDomain);
const parentDomainKey = await getNameAccountKey(
  hashedParentDomain,
  undefined,
  SOL_TLD_AUTHORITY
);

// Step 2
const subDomainKey = await getDNSRecordAddress(parentDomainKey, subDomain);

// Step 3
const registry = await NameRegistryState.retrieve(connection, subDomainKey);
```

## Find all the domain names owned by a public key (Bir public key’in sahip olduğu tüm isimleri bulma)

Bir `memcmp` filtresiyle bir `getProgramAccounts` isteği yaparak bir cüzdanın tüm alan adlarını alabilirsiniz.

```ts
export async function findOwnedNameAccountsForUser(
  connection: Connection,
  userAccount: PublicKey
): Promise<PublicKey[]> {
  const filters = [
    {
      memcmp: {
        offset: 32,
        bytes: userAccount.toBase58(),
      },
    },
  ];
  const accounts = await connection.getProgramAccounts(NAME_PROGRAM_ID, {
    filters,
  });
  return accounts.map((a) => a.publicKey);
}
```

## Resolve a Twitter handle (Twitter handle’ını çözme)

[Twitter handles Solana name service](https://naming.bonfida.org/#/twitter-registration)’e kaydedilebilir ve .SOL alan adları gibi kullanılabilir.

```ts
// Pubkey of the wallet you want to retrieve the Twitter handle
const pubkey = new PublicKey("FidaeBkZkvDqi1GXNEwB8uWmj9Ngx2HXSS5nyGRuVFcZ");

const [handle, registryKey] = await getHandleAndRegistryKey(connection, pubkey);

```

## Reverse lookup of a Twitter handle (Twitter handle’ını geri aratma)

Bir Twitter tanıtıcısıyla ilişkili SOL adresini bulmak için geriye doğru bir arama yapabilirsiniz.

```ts
const handle = "bonfida";

const registry = await getTwitterRegistry(connection, handle);
```

