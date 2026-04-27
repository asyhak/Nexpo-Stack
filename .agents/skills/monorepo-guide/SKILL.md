---
name: monorepo-guide
description: Architecture guidance, development commands, and project configuration for the gluestack-next-expo monorepo.
---

# 🛸 Monorepo Guide Skill

> [!IMPORTANT]
> **Single Source of Truth**: For project versions and setup, always refer to the [README.md](file:///c:/Users/UniPin/Downloads/gluestack-next-expo/README.md). This skill focuses on the **internal mechanics** and **AI workflow** for development.

This skill provides deep-dive context about the repository's internal configuration and agent-specific development strategies for maintaining a high-fidelity cross-platform application.

## 🏗️ Architecture Map

This Turborepo monorepo is built for **Shared-First** development. Most business logic and UI live in `packages/app`.

| Location                      | Purpose                     | Core Technologies             |
| :---------------------------- | :-------------------------- | :---------------------------- |
| `apps/mobile/`                | Expo iOS/Android App        | Expo Router, SDK 55           |
| `apps/web/`                   | Next.js Web App             | App Router, Next.js 16.2      |
| `apps/server/`                | Hono Backend Server         | Hono, Hono RPC                |
| `packages/app/`               | **Shared Features & Logic** | Solito, React 19, Lucide      |
| `packages/ui/`                | **Shared Design System**    | Gluestack v4, NativeWind v4   |
| `packages/schema/`            | **Centralized Schemas**     | TypeScript, Zod, Shared Types |
| `packages/db/`                | **Database Layer**          | Drizzle ORM, SQLite           |
| `packages/auth/`              | **Authentication**          | Better Auth                   |
| `packages/app/store/`         | **Client State**            | Zustand                       |
| `packages/app/services/`      | **API & Implementation**    | Hono RPC Client               |
| `packages/typescript-config/` | **Centralized TSConfig**    | Modular TypeScript Configs    |
| `packages/app/hooks/`         | **Server State Hooks**      | TanStack Query                |

---

## 🛠️ Command Toolbox

Always use the fastest command for the task. Most commands are run from the **root**.

| Command                | Action                                                |
| :--------------------- | :---------------------------------------------------- |
| `pnpm dev`             | Start Web, Mobile, Server, and shared packages        |
| `pnpm build`           | Build all workspaces for production                   |
| `pnpm lint`            | Run ESLint across the entire monorepo                 |
| `pnpm format`          | Run Prettier on all files                             |
| `pnpm g screen <Name>` | **Scaffold a new screen** across Web, Mobile, and App |
| `pnpm add-ui <Name>`   | **Add official Gluestack UI** primitive using CLI     |
| `pnpm db:push`         | **Push DB schema** changes to SQLite                  |
| `pnpm db:studio`       | **Open Drizzle Studio** to explore database           |
| `pnpm parity-check`    | Verify Web and Mobile routes are in sync              |
| `pnpm clean`           | Wipe all `node_modules` and caches                    |

---

## 📜 Development Standards (The "Golden Rules")

To ensure the app looks and feels premium on all platforms, adhere to these strict standards:

### 1. Styling & Primitives

- **NEVER use HTML tags**: Avoid `div`, `span`, `p`, etc. Use `Box`, `Text`, `Heading` from `@repo/ui`. HTML tags will crash the mobile app.
- **Semantic Tokens (Shadcn-pattern)**: Always use theme-aware classes instead of static Tailwind colors.
  - **Correct Examples**: `text-foreground`, `bg-background`, `bg-primary`, `text-destructive`.
  - **Avoid Static Colors**: Do NOT use `bg-gray-100` or `text-blue-500` for core UI. Static classes will **not swap** in Dark Mode.
- **Single Source of Truth**: All theme variables are defined in `packages/ui/global.css`.
- **Layout Clarity**: Always specify `flex-row` or `flex-col`. Web defaults to row; Native defaults to column.
- **Tailwind Variants (`tva`) vs. Strings**:
  - **Use Strings** for static styles that don't change (e.g., `const container = "p-4 bg-white"`).
  - **Use `tva`** ONLY when you have variants (e.g., `size: { sm: "...", lg: "..." }`).
  - **CRITICAL**: Do NOT use `tva({ base: "..." })` with no variants and then call it like `className={style()}`. This causes an undefined `parentVariants` crash. If there are no variants, use a plain string.
  - **Example (Correct Strings)**: `<Box className="p-4" />` or `<Box className={cardStyle} />`
  - **Example (Correct `tva`)**: `<Box className={buttonStyle({ variant: 'outline' })} />`

### 2. State Management (Zustand)

- **Strict Immutability**: NEVER mutate state properties directly in a store action (e.g., `state.user.name = "..."`). Always use spread operators or `.map()` to return new objects/arrays.
  - **Wrong**: `existingItem.quantity = newQty; return { inventory };`
  - **Right**: `inventory[index] = { ...inventory[index], quantity: newQty }; return { inventory };`
- **Cross-Platform Persistence**: Always use the `universalStorage` utility from `packages/app/utils/storage.ts`. This handles safe SSR for Next.js and `AsyncStorage` for Native.
  - **Pattern**:
    ```tsx
    import { universalStorage } from "../utils/storage";
    // ... inside persist config
    storage: createJSONStorage(() => universalStorage);
    ```
- **Zustand 5 Compatibility**: For Zustand 5, ensure `babel.config.js` in the mobile app includes `unstable_transformImportMeta: true` in the `babel-preset-expo` options to handle environment metadata correctly.

### 3. Centralized Schemas (@repo/schema)

- **Zod as Source of Truth**: All shared data models **MUST** be defined using Zod schemas. This ensures runtime integrity and provides inferred TypeScript types.
- **Single Source of Truth**: All shared TypeScript interfaces, Zod schemas, and API response models **MUST** reside in `packages/schema`.
- **Validation**: Use Zod schemas exported from `@repo/schema` for:
  - **API Boundaries**: Validate data coming from the network before it enters your app.
  - **Forms**: Use schemas for client-side validation (e.g., with React Hook Form).
- **Consistency**: Never redefine an interface (e.g., `User`) locally if it exists in the schema package.

#### ❓ Why Zod for Schemas?

In a cross-platform monorepo (Expo + Next.js + Hono), TypeScript types are not enough because they are erased at runtime. Zod allows us to:

1. **Catch API Mismatches**: If the backend changes, the frontend catches the error at the network layer rather than crashing in a component.
2. **Inferred Types**: Define once, get both validation and types (`z.infer`).
3. **Unified Validation**: Use the same logic for the DB, API, and UI.

### 4. Backend & API Logic (Hono RPC)

- **End-to-End Type Safety**: We use **Hono RPC** to share types between the server and the frontend without code generation.
- **AppType**: The `AppType` exported from `apps/server/src/index.ts` is the source of truth for all API routes.
- **API Client**: Always use the `apiClient` from `packages/app/services/api-client.ts`.
  - **Usage**:
    ```tsx
    import { apiClient } from "../services/api-client";
    const res = await apiClient.users.$get();
    const data = await res.json(); // Data is fully typed!
    ```
- **Error Handling**: Use the Zod schemas from `@repo/schema` to handle validation errors consistently on both sides.

### 5. Database & Authentication

- **Database (Drizzle ORM)**: We use **SQLite** with **Drizzle ORM** for lightweight, type-safe data persistence.
  - Schema is defined in `packages/db/src/schema/`.
  - Use `pnpm db:push` to sync schema changes during development.
- **Authentication (Better Auth)**: A universal authentication solution integrated with Hono and Drizzle.
  - Config resides in `packages/auth`.
  - Client hooks are available in `@repo/auth/client`.

### 6. Universal Navigation (Solito)

- **Button Navigation**: For complex buttons or UI elements (like those using `Box` or Gluestack `Button`), prefer using the `useRouter` hook from `solito/navigation` with the `onPress` prop. This is significantly more reliable on Native/Mobile than wrapping complex layouts in a `Link` component.
- **Route Definitions**: All routes **MUST** be defined in `packages/app/constants/routes.ts`.
- **Hooks**: Use `useRouter` from `solito/navigation` instead of platform-specific hooks.

### 7. State Management Strategy (Dual-Layer)

We use a dual-layer state management approach to ensure scalability and performance:

- **Server State (TanStack Query)**: Use for all external data fetching.
  - **Usecase**: Caching, synchronization, loading/error handling, and background updates.
  - **Location**: Define fetchers in `packages/app/services/` and hooks in `packages/app/hooks/`.
  - **Provider**: Managed in `packages/app/provider/index.tsx` via `QueryClientProvider`.
- **Client State (Zustand)**: Use for global UI state and local entity management.
  - **Usecase**: Authentication status, theme overrides, user preferences, and cross-screen ephemeral state.
  - **Location**: Define stores in `packages/app/store/`.
  - **Best Practice**: Use `devtools` middleware and keep stores focused (e.g., `user-store.ts`).
  - **Next.js Directive**: Any component or screen consuming client-side features (`useState`, `useEffect`, custom hooks, or Zustand) MUST include the `"use client";` directive at the top of the file.

### 8. Native-First Logic

- **Verification**: If a UI works on Mobile (Expo) using NativeWind, it will almost certainly work on Web. Always test Mobile first.
- **Platform Branching**: Use `Platform.OS === 'web'` for minor logic differences. Use `.web.tsx` / `.native.tsx` only for platform-specific implementations.

### 9. Automated Skeleton Loading (Boneyard)

To provide a premium loading experience, we use `boneyard-js` to auto-generate pixel-perfect skeleton screens.

- **Wrapper**: Always wrap main feature content in the `<Skeleton>` component from `@repo/ui`.
- **Naming**: Use a unique, descriptive `name` (e.g., `user-profile-card`) so the CLI can map the captured bones back to the component.
- **Workflow**:
  - Skeletons are **NOT** hardcoded. They are captured from the running UI.
  - After updating a UI layout, you **MUST** run the generation command to update the "bones" JSON files in `packages/app/bones/`.
- **Cross-Platform**: The `Skeleton` component is universal. It uses `boneyard-js/react` on Web and `boneyard-js/native` on Mobile.

### 10. TypeScript Integrity (@repo/typescript-config)

- **Centralized Rules**: Always extend the shared configuration from `@repo/typescript-config` in your package's `tsconfig.json`.
- **Environment Specific**: Use the correct base (e.g., `nextjs.json` for web apps, `native.json` for Expo apps, `react-library.json` for UI packages).
- **No In-Situ Rules**: Avoid overriding core compiler flags (like `strict`, `noEmit`, `target`) inside individual packages. Change them in the configuration package instead.

### 11. Icon Strategy (@repo/ui)

- **Centralized Wrapper**: Always import icons from `ui` instead of `lucide-react` or `lucide-react-native` directly.
- **Universal API**: The `ui` package provides a unified export of Lucide icons under the `Icons` namespace.
- **Usage**:
  ```tsx
  import { Icon, Icons } from "ui";
  <Icon as={Icons.Home} size="md" />;
  ```

### 12. Next.js Directive ("use client")

- **Requirement**: Any file in `packages/app` or `packages/ui` that uses **React hooks** (`useState`, `useEffect`, `useContext`, etc.) or **client-side libraries** (Zustand, TanStack Query) **MUST** have `"use client";` at the very top.
- **Why**: Next.js App Router defaults to **Server Components**. Shared code in a monorepo will cause a runtime error on Web if it attempts to use client-only features without this directive.

---

## 📂 Directory Organization

1. **`packages/ui/components/ui` (The Library)**: This folder is RESERVED for pure components added directly via the Gluestack CLI. DO NOT modify these files.
2. **`packages/ui/components/custom` (The Application)**: This folder is for custom components, modified CLI components, or project-specific UI compositions.

---

### 📦 UI Components Inventory (Gluestack v4)

Use these official components to build high-fidelity interfaces. If a component is missing from `packages/ui/components/ui`, add it using the CLI.

| Category          | Components                                                                                                                                         |
| :---------------- | :------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Typography**    | `Heading`, `Text`                                                                                                                                  |
| **Layout**        | `Box`, `Center`, `Divider`, `HStack`, `VStack`, `Grid`                                                                                             |
| **Feedback**      | `Alert`, `Progress`, `Spinner`, `Toast`                                                                                                            |
| **Data Display**  | `Badge`, `Card`, `Table`, `Tabs`                                                                                                                   |
| **Forms**         | `Button`, `Calendar`, `Checkbox`, `DateTimePicker`, `FormControl`, `Input`, `Link`, `Pressable`, `Radio`, `Select`, `Slider`, `Switch`, `Textarea` |
| **Overlay**       | `AlertDialog`, `Drawer`, `Image Viewer`, `Liquid Glass`, `Menu`, `Modal`, `Popover`, `Portal`, `Tooltip`                                           |
| **Disclosure**    | `Accordion`, `Actionsheet`, `BottomSheet`                                                                                                          |
| **Media & Icons** | `Avatar`, `Icon`, `Image`                                                                                                                          |
| **Others**        | `Fab`, `Skeleton`                                                                                                                                  |

---

## 🤖 AI Workflow: Step-by-Step

Follow these workflows to maintain perfect parity and follow project patterns.

### Adding a New Screen

1.  **Define Route**: Add the route pattern to `packages/app/constants/routes.ts`.
2.  **Scaffold**: Run `pnpm g screen MyNewFeature`.
3.  **Implement**: Open `packages/app/features/my-new-feature/screen.tsx` and build the UI using the `ScreenWrapper`.
    - **IMPORTANT**: If your screen uses ANY hooks (`useState`, `useEffect`, `useRouter`, Zustand stores, etc.), you **MUST** add `"use client";` to the very top of the file.
    - **Navigation**: For primary call-to-action buttons, use Gluestack `Button` + `useRouter` instead of `Link` for better native reliability.
    - **Platform Fallback**: If a Gluestack component does not exist or behaves poorly on a specific platform, use conditional rendering:
      ```tsx
      import { Platform } from "react-native";
      {
        Platform.OS === "web" ? <WebOnlyComp /> : <NativeOnlyComp />;
      }
      ```
4.  **Verify**: Check both `apps/web/src/app/my-new-feature/page.tsx` and `apps/mobile/src/app/my-new-feature.tsx` (automatically created).
5.  **Skeletonize**: Wrap the new UI in `<Skeleton name="my-feature">` and run `pnpm skeleton:build` to capture the layout.
6.  **Audit**: Run `pnpm parity-check`.

### Adding a UI Component (Gluestack CLI)

Use the official Gluestack UI v4 CLI to add primitives to the design system.

1.  **Identify**: Check the **UI Components Inventory** above for the correct name.
2.  **Command**: From the root, run:
    `pnpm --filter ui add-ui <component-name>`
    - **Naming Convention**: Use lowercase and replace spaces with hyphens (e.g., `Image Viewer` becomes `image-viewer`, `Actionsheet` becomes `actionsheet`).
3.  **Manual CLI (Fallback)**:
    - `cd packages/ui`
    - `npx gluestack-ui@<version> add <component-name>` (Version: `4.1.0-alpha.3`)
4.  **Export**: Open `packages/ui/components/ui/index.ts` and add an export for the new component.
    - Example: Add `export * from "./input";` after adding the Input component.
5.  **Fix Type Errors**: If the component has TypeScript errors (common in `cssInterop`), use `as any` or `//@ts-ignore`.
    - Example: Cast `nativeStyleToProp` to `any` in the `cssInterop` block.
6.  **Verify**: Components are available for import from the `@repo/ui` or `ui` package.
    - Example: `import { Input, InputField } from "ui";`

---

## 🔍 Debugging Handbook

| Symptom                                  | Recovery Action                                                               |
| :--------------------------------------- | :---------------------------------------------------------------------------- |
| Styles not appearing on Web              | Ensure the path is in `apps/web/tailwind.config.js`.                          |
| "Invalid Hook Call"                      | Check for duplicate React versions in `pnpm-lock.yaml`.                       |
| Metro/Fast Refresh Lag                   | Run `pnpm clean` and then `pnpm install`.                                     |
| Expo: "Failed to download remote update" | Disable **VPN**, ensure device/host are on same WiFi, or run `expo start -c`. |
| Solito Navigation Error                  | Ensure you are using `solito/navigation` and not `next/navigation`.           |

### VS Code TypeScript Errors (Ghost Errors)

If you see persistent TypeScript errors (like `File '@repo/typescript-config/base.json' not found`) even though `pnpm check-types` passes, it's likely a caching issue with the VS Code TypeScript Language Server (especially after creating new packages or running `pnpm install`).

To fix this immediately, you just need to restart the TS server. You can do this by:

1. Opening the VS Code Command Palette (`Ctrl+Shift+P` or `Cmd+Shift+P`)
2. Typing "Developer: Restart TS Server" and hitting enter. (Alternatively, you can just reload the VS Code window).

---

## 🧠 Agent Mental Model

When acting as an assistant in this repo, embody these principles:

1.  **Shared-First**: If logic resides in a specific app, it's a bug. Move it to `packages/app`.
2.  **Atomic Scaffolding**: Always start new features with `pnpm g`. It prevents mapping mistakes.
3.  **Parity is Non-Negotiable**: Never finish a task without confirming it works (or is at least implemented) for both Web and Mobile.
4.  **Clean Architecture**: UI primitives go to `packages/ui`, business logic/screens go to `packages/app/features`.
