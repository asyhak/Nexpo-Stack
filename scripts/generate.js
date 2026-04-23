const fs = require("fs");
const path = require("path");

const ROOT = path.resolve(__dirname, "..");
const ARGS = process.argv.slice(2);

const TYPE = ARGS[0]; // screen | component
const NAME = ARGS[1];

if (!TYPE || !NAME) {
  console.error("Usage: pnpm g <screen|component|contract> <Name>");
  process.exit(1);
}

const pascalName = NAME.charAt(0).toUpperCase() + NAME.slice(1);
const kebabName = NAME.replace(/([a-z0-9])([A-Z])/g, "$1-$2").toLowerCase();

function createDir(dir) {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
}

function writeFile(filePath, content) {
  if (fs.existsSync(filePath)) {
    console.warn(`⚠️ File already exists: ${filePath}`);
    return;
  }
  fs.writeFileSync(filePath, content);
  console.log(`✅ Created: ${filePath}`);
}

if (TYPE === "screen") {
  // 1. Shared Feature
  const featureDir = path.join(ROOT, "packages", "app", "features", kebabName);
  createDir(featureDir);
  writeFile(
    path.join(featureDir, "screen.tsx"),
    `"use client";

import { Text, Box, Heading, ScreenWrapper } from '@repo/ui'

const ${pascalName}ContainerStyle = 'flex-1 items-center justify-center p-4'

export function ${pascalName}Screen() {
  return (
    <ScreenWrapper>
      <Box className={${pascalName}ContainerStyle}>
        <Heading size="xl" className="text-typography-900">${pascalName} Screen</Heading>
        <Text className="text-typography-500 mt-2">
          This is a generated universal screen with standardized styling.
        </Text>
      </Box>
    </ScreenWrapper>
  )
}
`,
  );

  // 2. Web App Router
  const webDir = path.join(ROOT, "apps", "web", "src", "app", kebabName);
  createDir(webDir);
  writeFile(
    path.join(webDir, "page.tsx"),
    `import { ${pascalName}Screen } from '@repo/app/features/${kebabName}/screen'

export default function Page() {
  return <${pascalName}Screen />
}
`,
  );

  // 3. Mobile App Router
  const mobilePath = path.join(
    ROOT,
    "apps",
    "mobile",
    "src",
    "app",
    `${kebabName}.tsx`,
  );
  writeFile(
    mobilePath,
    `import { ${pascalName}Screen } from '@repo/app/features/${kebabName}/screen'

export default function Page() {
  return <${pascalName}Screen />
}
`,
  );

  console.log(`\n🎉 Screen "${pascalName}" generated with platform parity!`);
} else if (TYPE === "component") {
  const componentDir = path.join(
    ROOT,
    "packages",
    "ui",
    "components",
    "custom",
    kebabName,
  );
  createDir(componentDir);

  writeFile(
    path.join(componentDir, "index.tsx"),
    `import React from 'react'
import { Box, Text, Heading } from '../../ui'

interface ${pascalName}Props {
  title?: string
}

export function ${pascalName}({ title = '${pascalName}' }: ${pascalName}Props) {
  return (
    <Box className="p-4 bg-card rounded-lg border border-border">
      <Heading size="md">{title}</Heading>
      <Text className="text-muted-foreground mt-1">
        Generated custom component.
      </Text>
    </Box>
  )
}
`,
  );

  // Update barrel file
  const barrelFile = path.join(
    ROOT,
    "packages",
    "ui",
    "components",
    "custom",
    "index.ts",
  );
  if (fs.existsSync(barrelFile)) {
    let content = fs.readFileSync(barrelFile, "utf8");
    const exportLine = `export * from './${kebabName}';\n`;
    if (!content.includes(exportLine)) {
      content += exportLine;
      fs.writeFileSync(barrelFile, content);
      console.log(`✅ Updated: ${barrelFile}`);
    }
  }

  console.log(`\n🎉 Component "${pascalName}" generated in packages/ui!`);
} else if (TYPE === "contract") {
  const contractDir = path.join(ROOT, "packages", "contracts", "src", "models");
  createDir(contractDir);

  writeFile(
    path.join(contractDir, `${kebabName}.ts`),
    `import { z } from 'zod'

export const ${pascalName}Schema = z.object({
  id: z.string(),
  // Add more fields here
})

export type ${pascalName} = z.infer<typeof ${pascalName}Schema>
`,
  );

  // Update barrel file
  const barrelFile = path.join(
    ROOT,
    "packages",
    "contracts",
    "src",
    "index.ts",
  );
  if (fs.existsSync(barrelFile)) {
    let content = fs.readFileSync(barrelFile, "utf8");
    const exportLine = `export * from './models/${kebabName}';\n`;
    if (!content.includes(exportLine)) {
      content = exportLine + content;
      fs.writeFileSync(barrelFile, content);
      console.log(`✅ Updated: ${barrelFile}`);
    }
  }

  console.log(`\n🎉 Contract "${pascalName}" generated in packages/contracts!`);
} else {
  console.error("Unknown type. Use 'screen', 'component', or 'contract'.");
  process.exit(1);
}
