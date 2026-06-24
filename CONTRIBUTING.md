# Contributing

Thanks for taking the time to improve React Hooks Library. This guide covers the
basic workflow for local development and pull requests.

## Setup

This repository uses Yarn workspaces. The lockfile is for Yarn classic.

```bash
corepack yarn install --frozen-lockfile
```

The current CI runs on Node 16. If you are using a newer Node version and hit
old Next.js or Rollup tooling errors, retry the same command on Node 16 before
debugging the change itself.

## Local Development

Run the documentation site:

```bash
NODE_OPTIONS=--openssl-legacy-provider corepack yarn website:dev
```

Run tests:

```bash
corepack yarn test --runInBand
```

Run lint:

```bash
corepack yarn lint
```

Build packages:

```bash
corepack yarn build:full
```

On Node 17 or newer, the Next.js website build may require the OpenSSL
compatibility flag:

```bash
NODE_OPTIONS=--openssl-legacy-provider corepack yarn website:build
```

## Adding or Updating a Hook

Hooks live in `packages/core/<hook-name>`. A complete hook directory usually
contains:

- `index.ts` for the implementation
- `docs.mdx` for documentation and metadata
- `demo.tsx` for the documentation playground
- `index.test.ts` when behavior can be covered in Jest

Use `packages/core/_template` as a starting point for a new hook.

When adding a hook, run the full build once. The build script regenerates package
entry points before Rollup runs.

## Documentation

Each `docs.mdx` file needs frontmatter with:

```md
---
category: state
name: useExample
description: Short description of the hook
---
```

Include a usage example, type declaration, and `<Source name="..." pkg="core" />`
at the bottom of the page.

## Pull Requests

Keep pull requests focused on one bug, hook, or documentation improvement. Before
opening a PR, run the checks that match the change:

- Code changes: tests and lint
- Hook API changes: package build
- Documentation changes: website build when the page rendering changes

Mention any known tooling warnings in the PR if they are unrelated to the
change.

## Releases

Releases are handled by the maintainers. The release script bumps package
versions, creates a commit and tag, and publishes packages from generated `dist`
folders.
