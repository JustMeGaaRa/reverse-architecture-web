# Reverse Architecture Turborepo

This is an official npm starter turborepo.

## What's inside?

This turborepo uses [npm](https://www.npmjs.com/) as a package manager. It includes the following packages/apps:

### Apps and Packages

- `apps/restruct-app`: an application for creating and managing arhitecture workspaces and projects using C4 model and Structurizr language syntax.
- `apps/structurizr-preview-extensions`: a Visual Studio Code extension for previewing the diagrams of a code written in Structurizr language.
- `apps/structurizr-preview-webview`: a React app that is hosted inside the webview of the Visual Studio Code extension.
- `packages/@justmegaara/mxgraph`: a TypeScript library that defines types for MXGrap vector diagrams (draw.io diagrams).
- `packages/@justmegaara/graphviz-dot`: a very simple and limited builder of the Graphviz graphs in dot syntax (used internally).
- `packages/@monaco-editor/structurizr`: a Structurizr DSL language definition types for Monaco editor.
- `packages/@restruct`: a set of packages with common commponents and styles for the product suite.
- `packages/@structurizr/`: a set of packages to work with Structurizr DSL and C4 model.
- `packages/@structurizr-preview`: a set of common packages shared between Visual Studio Code extension project and React webview app.
- `@yjs/react`: a set of components and providers to work with Yjs framework in React.
- `eslint-config-custom`: `eslint` configurations (includes `eslint-config-next` and `eslint-config-prettier`)
- `tsconfig`: `tsconfig.json`s used throughout the monorepo

Each package/app is 100% [TypeScript](https://www.typescriptlang.org/).

### Utilities

This turborepo has some additional tools already setup for you:

- [TypeScript](https://www.typescriptlang.org/) for static type checking
- [ESLint](https://eslint.org/) for code linting
- [Prettier](https://prettier.io) for code formatting

### Build

To build all apps and packages, run the following command:

```
cd ./reverse-architecture-web
turbo run build
```

### Develop

To develop all apps and packages, run the following command:

```
cd ./reverse-architecture-web
turbo run dev
```

### Remote Caching

Turborepo can use a technique known as [Remote Caching](https://turbo.build/repo/docs/core-concepts/remote-caching) to share cache artifacts across machines, enabling you to share build caches with your team and CI/CD pipelines.

By default, Turborepo will cache locally. To enable Remote Caching you will need an account with Vercel. If you don't have an account you can [create one](https://vercel.com/signup), then enter the following commands:

```
cd ./reverse-architecture-web
npx turbo login
```

This will authenticate the Turborepo CLI with your [Vercel account](https://vercel.com/docs/concepts/personal-accounts/overview).

Next, you can link your Turborepo to your Remote Cache by running the following command from the root of your turborepo:

```
npx turbo link
```

## Useful Links

Learn more about the power of Turborepo:

- [Tasks](https://turbo.build/repo/docs/core-concepts/monorepos/running-tasks)
- [Caching](https://turbo.build/repo/docs/core-concepts/caching)
- [Remote Caching](https://turbo.build/repo/docs/core-concepts/remote-caching)
- [Filtering](https://turbo.build/repo/docs/core-concepts/monorepos/filtering)
- [Configuration Options](https://turbo.build/repo/docs/reference/configuration)
- [CLI Usage](https://turbo.build/repo/docs/reference/command-line-reference)
