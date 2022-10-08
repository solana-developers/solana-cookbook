# Solana Cookbook

The Solana Cookbook is meant to house small digestible code snippets
for someone that has no experience with blockchain or Solana to be able
to grab and go.

## Contributing

The Cookbook is welcome to any and all contributions. Please refer to
the project's style when contributing new snippets of code.

### Structure

Currently we have "topics" under `/docs` and the code for those topics
lives under `/code/<topic>`.

### References

References are an overarching topic with a list of references of how to do
things under that topic. The general structure is the following:

```
Code Reference Title

Short Summary

Code Snippet
```

### Guides

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

### Committing

We are using [conventional commits](https://www.conventionalcommits.org/en/v1.0.0/)
for this repository.

To choose a task or make your own, do the following:

1. [Add an issue](https://github.com/solana-developers/solana-cookbook/issues/new) for the task and assign it to yourself or comment on the issue
2. Make a draft PR referencing the issue.

The general flow for making a contribution:

1. Fork the repo on GitHub
2. Clone the project to your own machine
3. Commit changes to your own branch
4. Push your work back up to your fork
5. Submit a Pull request so that we can review your changes

**NOTE**: Be sure to merge the latest from "upstream" before making a
pull request!

You can find tasks on the [project board](https://github.com/solana-developers/solana-cookbook/projects/1)
or create an issue and assign it to yourself.

Happy Cooking!
