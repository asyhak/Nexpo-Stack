---
name: boneyard-js
description: Expert guidance for implementing pixel-perfect skeleton loading screens using boneyard-js in the Solito/Gluestack monorepo.
---

# Boneyard JS Implementation Guide

Boneyard-js provides pixel-perfect skeleton loading screens extracted directly from the real DOM.

## Core Concepts

1. **Skeleton Wrapper**: Wrap components with `<Skeleton name="unique-name" loading={isLoading}>`.
2. **Fixtures**: Use the `fixture` prop to provide mock data for the build step.
3. **Capture**: Run `npx boneyard-js build` to snapshot skeletons and generate bones.
4. **Registry**: Import `./bones/registry` in your app entry to auto-resolve bones.

## Universal Implementation (Solito)

In this monorepo, we use a wrapper to handle cross-platform imports.

### Folder Structure

- **`packages/ui/components/custom/skeleton`**: The designated home for the boneyard wrapper.

### Component API

| Prop     | Type      | Description                              |
| -------- | --------- | ---------------------------------------- |
| name     | string    | Unique identifier for the skeleton       |
| loading  | boolean   | Toggle between skeleton and real content |
| children | ReactNode | The content to be skeletonized           |
| fixture  | ReactNode | (Optional) Mock content for capture      |

## Capture Workflow

### Web

```bash
# From apps/web
npx boneyard-js build
```

### Mobile

```bash
# From apps/mobile
npx boneyard-js build --native
```

## Best Practices

1. **Unique Names**: Ensure every skeleton in your app has a globally unique `name`.
2. **Fixtures for Auth**: Always use `fixture` for screens that require authentication or complex state.
3. **Exclusions**: Use `data-no-skeleton` to hide non-essential elements (like navbars) from the capture.
4. **Incremental Builds**: The CLI hashes content; it only recaptures what has changed.
