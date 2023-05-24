# Reverse Architecture Turborepo

This is an official npm starter turborepo.

## What's inside?

This turborepo uses [npm](https://www.npmjs.com/) as a package manager. It includes the following packages/apps:

### Apps and Packages

- `apps/website`: a main website for the Reverse Architecture platform with product information.
- `apps/main`: an application for creating and managing arhitecture workspaces and projects using C4 model and Structurizr.
- `apps/auth`: an application for authentication via GitHub and accessing projects and workspaces in repositories.
- `packages/@structurizr/dsl`: a TypeScript library that defines types for Structurizr DSL structures and files.
- `packages/@structurizr/parser`: a library with types for parsing the Structurizr DSL language.
- `packages/@structurizr/react`: a library with react bindings and hooks for Structurizr DSL to use in React apps.
- `packages/@reversearchitecture/theme`: a Chakra UI theme for the entire platform.
- `packages/@reversearchitecture/ui`: a set of reusable components within the entire platform.
- `packages/@reversearchitecture/workspace-breadcrumb`
- `packages/@reversearchitecture/workspace-editor`
- `packages/@reversearchitecture/workspace-toolbar`
- `packages/@reversearchitecture/workspace-viewer`
- `packages/@reversearchitecture/workspace-zoom`
- `packages/@monaco-editor/structurizr`: a Structurizr DSL language definition types for Monaco editor.
- `packages/@justmegaara/mxgraph`: a TypeScript library that defines types for MXGrap vector diagrams (draw.io diagrams).
- `packages/@justmegaara/y-reactflow`: a library with bindings and hooks for ReacFlow using yjs framework.
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
