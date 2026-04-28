---
name: seo-optimization
description: "Expert guidance for website optimization, SEO best practices, and technical SEO (robots, sitemaps, JSON-LD, performance) in a Solito/Gluestack monorepo."
---

# Website Optimization & SEO Skill (Universal Monorepo)

You are an expert SEO Engineer. Your goal is to optimize this universal monorepo for search engines (SEO) while maintaining cross-platform parity.

## Core Principles

1.  **Centralized Configuration**: All site metadata MUST derive from `apps/web/src/lib/config/site-config.ts`.
2.  **Server-Side First**: Prefer Next.js Server Components for Page files (`page.tsx`) to enable `generateMetadata` and SSR benefits.
3.  **Technical SEO**: Ensure `robots.ts`, `sitemap.ts`, `JsonLd`, and `llm.txt` are maintained.
4.  **Client/Server Separation**: Keep data fetching and SEO in Server Components (Pages), and interactivity in Client Components (Features).
    - **Note**: Always mark feature screens in `packages/app/features` with `"use client"` if they use React hooks or browser-only APIs, allowing them to be safely imported into Next.js Server Pages.

## Server-Side Page Pattern

Always prefer this structure for routes in `apps/web`:

1.  **Server Page (`page.tsx`)**: Handles `Metadata`, `JsonLd`, and server-side data fetching. Runs on the server.
2.  **Client Feature (`packages/app/features/...`)**: Handles UI and interactivity. Marked with `"use client"`.

**Example**:

```tsx
// apps/web/src/app/user/[id]/page.tsx (Server)
export default async function UserPage({ params }) {
  const { id } = await params;
  const data = await fetchData(id);
  return (
    <>
      <JsonLd data={...} />
      <UserDetailScreen />
    </>
  );
}
```

```tsx
// packages/app/features/user/detail-screen.tsx (Client)
"use client";
import { useParams } from "solito/navigation";
export function UserDetailScreen() { ... }
```

Always use [site-config.ts](file:///c:/Users/UniPin/Downloads/gluestack-next-expo/apps/web/src/lib/config/site-config.ts) to manage global variables like site name, URL, and OG images.

## Metadata Handling in Next.js

### 1. Static Metadata

Used in `layout.tsx` for global settings.

```typescript
export const metadata: Metadata = {
  title: {
    default: siteConfig.name,
    template: `%s | ${siteConfig.name}`,
  },
};
```

### 2. Dynamic Metadata

Use `generateMetadata` in `page.tsx` for dynamic routes.

```typescript
export async function generateMetadata({ params }): Promise<Metadata> {
  const data = await fetchData(params.id);
  return {
    title: data.name,
    description: data.description,
  };
}
```

## Structured Data (JSON-LD)

Use the [JsonLd.tsx](file:///c:/Users/UniPin/Downloads/gluestack-next-expo/apps/web/src/components/seo/JsonLd.tsx) component to inject schema data.

```tsx
<JsonLd
  data={{
    "@context": "https://schema.org",
    "@type": "ProfilePage",
    mainEntity: { "@type": "Person", name: user.name },
  }}
/>
```

## AI & LLM Optimization

Maintain [llm.txt](file:///c:/Users/UniPin/Downloads/gluestack-next-expo/apps/web/public/llm.txt) to provide context for AI agents.

## Technical SEO Implementation

- **Robots**: [robots.ts](file:///c:/Users/UniPin/Downloads/gluestack-next-expo/apps/web/src/app/robots.ts)
- **Sitemap**: [sitemap.ts](file:///c:/Users/UniPin/Downloads/gluestack-next-expo/apps/web/src/app/sitemap.ts)
