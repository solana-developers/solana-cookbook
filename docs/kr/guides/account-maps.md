---
title: Account Maps
---

# Account Maps

Map들은 우리가 프로그래밍에서 **key**를 어떤 종류의 **value**와 연관시키기 위해 자주 사용하는 데이터 구조들입니다.
key와 value는 임의의 타입이 될 수 있고 key는 저장할 value를 위한 식별자로써 기능할 수 있습니다.
그러면, 주어진 key들은 우리가 이 value들을 효율적으로 insert, retrieve 그리고 update 할 수 있게 해줍니다.

우리가 알고 있듯이, Solana의 Account 모델은 Program Data와 이것과 관련있는 다른 Account들에 저장될 상태 데이터를 요구합니다.
이러한 Account들은 Address를 갖고 있습니다. 이것은 자체적으로 Map으로 동작합니다. Solana의 Account 모델에 대한 더 자세한 내용은 [여기][AccountCookbook]에서 확인 할 수 있습니다.

그래서, 이제 **key**가 되는 Account의 address를 가지고 나누어진 Account들에 **values**를 저장하고, 가져오는 것을 이해할 것입니다.
그러나 이것은 다음과 같은 몇 가지 이슈들을 야기합니다.

* 위에서 언급된 address들은 아마도 이상적인 **keys**가 될 수는 없습니다. 이것들은 당신이 기억할 수 없고 원하는 값을 가져올 수 없습니다.

다른 **Keypairs**의 public key들로 언급된 Address들에서, 각 public key (or *address*)는 연관된 **private key** 또한 갖고 있습니다.
이 private key는 필요할때 instruction들에 서명하기 위해 요구될 것입니다. 이것은 우리가 private key를 어딘가에 저장해야 하는 것을 의미하며 이것은 완전히 추천되지 **않는** 방식입니다.

이것은 Program들에 `Map`과 같은 로직을 구현하는 데 문제가 있고, 많은 Solana 개발자들이 당면하고 있습니다. 우리가 이 문제를 어떻게 할지 몇 가지 방법을 살펴 봄시다.

## Deriving PDAs

PDA는 [Program Derived Address][PDA]를 의미하는 줄임말이고, seeds들의 집합으로부터 **비롯된** Address들이며, Program id(or _address_)입니다.

PDA들에 관해 유니크한 것은 이들 Address들은 어떤 private key와도 연관되어 있지 않다는 것입니다.
이것은 Address들이 ED25519 곡선에 놓여 있지 않기 때문입니다.
이런 이유로, 오직 이 _address_ 를 구한 program만이 key를 가지고 instruction에 서명할 수 있습니다. 이 key 또한 제공된 seeds입니다. 더 자세한 내용은 [여기][CPI]에 있습니다. 

우리는 이제 PDA들이 무엇인지 알았습니다. PDA들을 사용해 몇 가지 Account들을 맵핑 해봅시다.
우리는 어떻게 구현되는지 설명하기 위해 **Blog** Program에 대한 한 예제를 살펴볼 것입니다.

이 Blog Program에서 우리는 각 `User`가 하나의 `Blog`를 갖도록 하고 싶습니다. 이 blog는 여러개의 `Posts`를 가질 수 있습니다.
이것은 우리가 각 user를 하나의 blog에 **맵핑**하고 각 post는 특정 blog에 **맵핑**된다는 것을 의미합니다.

요약하면, user와 그/그녀의 blog 사이에는 `1:1` 맵핑 관계가 있고, 하나의 blog와 이것의 posts 에는 `1:N` 맵핑 관계가 있습니다.

`1:1` 맵핑 관게를 위해서, 우리는 blog의 address가 **오직** blog의 사용자로부터 만들어지길 원합니다. 이것은 blog의 authority (or _user_)가 주어졌을 때, 하나의 blog를 가져오는 것을 가능하게 합니다.
이런 이유로, blog의 seeds는 blog의 **authority's key** 로 구성될 것이고, 타입 식별자로써 기능하기 위해 가능하면 **"blog"**라는 prefix를 가지도록 구성될 것입니다.

`1:N` 맵핑 관계를 위해서, 우리는 각 post의 address가 **오직** 연관된 blog로부터만 만들어지길 원하지 **않고**, 또 다른 **식별자**로부터 함께 만들어지길 원합니다.
이 식별자는 우리가 blog에서 `N` 개의 post들을 구별할 수 있게 해줍니다.
아래의 예제에서 각 post의 address는 각 post를 식별하기 위해 **blog's key**와 하나의 **slug**, 그리고 타입 식별자로써 기능하기 위한 **"post"**라는 prefix로부터 만들어집니다.

코드는 아래와 같습니다.

<SolanaCodeGroup>
  <SolanaCodeGroupItem title="Anchor" active>

  <template v-slot:default>

@[code](@/code/account-maps/deriving-pda/anchor-pda-map.rs)

  </template>

  <template v-slot:preview>

@[code](@/code/account-maps/deriving-pda/anchor-pda-map.preview.rs)

  </template>

  </SolanaCodeGroupItem>

  <SolanaCodeGroupItem title="Rust" active>

  <template v-slot:default>

@[code](@/code/account-maps/deriving-pda/vanilla-pda-map.rs)

  </template>

  <template v-slot:preview>

@[code](@/code/account-maps/deriving-pda/vanilla-pda-map.preview.rs)

  </template>

  </SolanaCodeGroupItem>

</SolanaCodeGroup>

Client 영역에서, 당신은 `Blog`와 `Post` Account address를 얻기 위해 `PublicKey.findProgramAddress()`를 사용할 수 있습니다. 당신은 Account Data를 가져오기 위해 이 Address를 `connection.getAccountInfo()`로 넘길 수 있습니다. 아래는 그 예제입니다.

<SolanaCodeGroup>
  <SolanaCodeGroupItem title="TS" active>

  <template v-slot:default>

@[code](@/code/account-maps/deriving-pda/client.ts)

  </template>

  <template v-slot:preview>

@[code](@/code/account-maps/deriving-pda/client.preview.ts)

  </template>

  </SolanaCodeGroupItem>

</SolanaCodeGroup>

## Single Map Account

맵핑을 구현하는 또 다른 방법은 하나의 Account안에 명확히 저장되는 `BTreeMap` 데이터 구조입니다. 이 Account의 Address는 자체적으로 PDA일 수 있고, 또는 생성된 Keypair의 public key일 수도 있습니다.

Account들을 맵핑하는 이 방법은 아래 이유들로 이상적이진 않습니다.

* 당신은 필요한 key-value 쌍들을 넣기 전에, 먼저 `BTreeMap`을 저장하는 Account를 초기화 해야 할 것입니다. 그러면, 당신은 이 Account의 주소를 또 어딘가에 저장해야 할 것입니다.

* 하나의 Account는 **10 megabytes** 최대 사이즈의 메모리 제한이 있습니다. 이것은 `BTreeMap`을 많은 수의 key-value 쌍들을 저장할 수 없게 만듭니다.

이런 이유로, 당신의 케이스를 고려한 후 아래의 방법을 사용하세요.

<SolanaCodeGroup>
  <SolanaCodeGroupItem title="Rust" active>

  <template v-slot:default>

@[code](@/code/account-maps/trivial/vanilla-trivial-map.rs)

  </template>

  <template v-slot:preview>

@[code](@/code/account-maps/trivial/vanilla-trivial-map.preview.rs)

  </template>

  </SolanaCodeGroupItem>
</SolanaCodeGroup>

위 프로그램을 테스트하기 위한 Client 영역의 코드는 아래와 같습니다.

<SolanaCodeGroup>
  <SolanaCodeGroupItem title="TS" active>

  <template v-slot:default>

@[code](@/code/account-maps/trivial/client.ts)

  </template>

  <template v-slot:preview>

@[code](@/code/account-maps/trivial/client.preview.ts)

  </template>

  </SolanaCodeGroupItem>
</SolanaCodeGroup>



[AccountCookbook]: https://solanacookbook.com/core-concepts/accounts.html
[PDA]: https://solanacookbook.com/references/accounts.html#program-derived-address
[CPI]: https://solanacookbook.com/references/programs.html#create-a-program-derived-address