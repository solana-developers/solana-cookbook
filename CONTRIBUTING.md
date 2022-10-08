# Contributing to the Cookbook

👍🎉First off, thanks for taking the time to contribute🎉👍

The following is a set of guidelines on how to contribute

## What should I know before I get started?

### Solana Cookbook Layout

The cookbook is layed out in 4 different sections.

| Section         | Description                                                     |
| --------------- | --------------------------------------------------------------- |
| Getting Started | Resources for starting development on Solana                    |
| Core Concepts   | Building blocks of Solana that are good to know for development |
| Guides          | Snack-sized guides about different tools for development        |
| References      | References to commonly needed code snippets                     |

Depending on what you are writing, it will live in one of these sections

#### References

References are an overarching topic with a list of references of how to do
things under that topic. The general structure is the following:

```
Code Reference Title

Short Summary

Code Snippet
```

#### Guides

Guides are longer form informational documentation on various topics.
The general structure for writing a guide is the following:

```
Brief Summary/TLDR

Fact Sheet

Deep Dive

Other Resources
```

### Building

We recommend building and running the documentation in a development container
(requires Docker to be installed).
A `Dockerfile` is included in the `.devcontainer` directory which can be built
and run manually using docker or automatically by VS Code
([Instructions here](https://code.visualstudio.com/docs/remote/containers)).

To build and run perform the following commands in the terminal
(within the container if using the dev container)

```
yarn install
yarn start
```

It will take some time to start, the documentation can then be viewed
at (http://localhost:8080/)

### Code Previews

The Solana Cookbook utilizes code previews to articulate exactly what code is needed
for a reference, as well as the full source so that developers can reference any variables
needed.

While the preview highlights the needed code, it does not have to run alone.

We use the preview component `<SolanaCodeGroup>` with each language's snippet with
`<SolanaCodeGroupItem>`.

#### Example Preview

Let's take the following code for getting a `Keypair` from a `secret`:

```javascript
import { Keypair } from "@solana/web3.js";

const secret = Uint8Array.from([
  174, 47, 154, 16, 202, 193, 206, 113, 199, 190, 53, 133, 169, 175, 31, 56,
  222, 53, 138, 189, 224, 216, 117, 173, 10, 149, 53, 45, 73, 251, 237, 246, 15,
  185, 186, 82, 177, 240, 148, 69, 241, 227, 167, 80, 141, 89, 240, 121, 121,
  35, 172, 247, 68, 251, 226, 218, 48, 63, 176, 109, 168, 89, 238, 135,
]);

(async () => {
  const keypair = Keypair.fromSecretKey(secret);
})();
```

The preview for the above code could be:

```javascript
const keypair = Keypair.fromSecretKey(secret);
```

The developer can see exactly the method required to get a Keypair from a secret key
in the preview, but can view the full source on the component to understand the example
further.

## How Can I Contribute?

### Adding Content

There's a list of needed content tracked on the [project board](https://github.com/solana-developers/solana-cookbook/projects/1) of this repository.
The board is kept up to date with all work being worked on.

To start work, do the following:

1. Create an issue and/or comment on an existing issue to state you've started working
2. Create a PR during or when complete

### Request Missing Content

Missing something on the cookbook? Please create an issue and we'll try to get it added!

## Committing

We are using [conventional commits](https://www.conventionalcommits.org/en/v1.0.0/)
for this repository.

General flow for making a contribution:

1. Fork the repo on GitHub
2. Clone the project to your own machine
3. Commit changes to your own branch
4. Push your work back up to your fork
5. Submit a Pull request so that we can review your changes

**NOTE**: Be sure to merge the latest from "upstream" before making a
pull request!
