# Website

This is the documentation and demos website for `@react-hooks-library`. The library documentation is not written here, but it is imported and built here.

It is built using:

- [next js](https://nextjs.org/)
- [tailwind css](https://tailwindcss.com/)
- [react](https://reactjs.org/)
- [typescript](https://www.typescriptlang.org/)
- [framer-motion](https://framer.com/motion/)
- [zustand](https://github.com/pmndrs/zustand)
- [mdx-bundler](https://github.com/kentcdodds/mdx-bundler)

## Code Guide

Most of the code is written in TypeScript, but most pages are written in Markdown, we build our website by importing the Markdown files and compiling them into react using `mdx-bundler`. These `.mdx` files embed interactive react components(with state, effects etc.).

The loader functions are defined at [loadMDX.ts](/website/utils/loadMDX.ts). All hooks docs are built by importing all the `.mdx` files.
This implementation can be seen [here](/website/pages/[package]/[function].tsx).

The rest of the UI component are at [ui](/website/ui) and the rest is normal next js.

There are special components that available to the mdx file that don't need to be imported, these are defined at [ui/docs](/website/ui/docs), they are imported and in [mdxComponents.tsx](/website/ui/docs/mdxComponents.tsx) which also modifies the incoming html to add special nextjs features.

A simpler example of this workflow is seen at [functions](/website/pages/functions.tsx) or the [getting-started](/website/pages/getting-started.tsx) pages, which is a list of all the hooks.

That's most of it, we also use framer-motion for animation, primary state transitions and zustand is used for global state management.
