const fs = require("fs");
const path = require("path");

const ROOT = path.resolve(__dirname, "..");
const FEATURES_DIR = path.join(ROOT, "packages", "app", "features");
const WEB_APP_DIR = path.join(ROOT, "apps", "web", "src", "app");
const MOBILE_APP_DIR = path.join(ROOT, "apps", "mobile", "src", "app");

// ANSI Colors for premium output
const COLORS = {
  reset: "\x1b[0m",
  bright: "\x1b[1m",
  green: "\x1b[32m",
  yellow: "\x1b[33m",
  red: "\x1b[31m",
  cyan: "\x1b[36m",
  bgBlack: "\x1b[40m",
};

function getFeatures() {
  if (!fs.existsSync(FEATURES_DIR)) return [];
  return fs
    .readdirSync(FEATURES_DIR)
    .filter((f) => fs.statSync(path.join(FEATURES_DIR, f)).isDirectory());
}

function searchInDir(dir, pattern) {
  if (!fs.existsSync(dir)) return false;
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const fullPath = path.join(dir, file);
    if (fs.statSync(fullPath).isDirectory()) {
      if (searchInDir(fullPath, pattern)) return true;
    } else if (
      file.endsWith(".tsx") ||
      file.endsWith(".ts") ||
      file.endsWith(".js")
    ) {
      const content = fs.readFileSync(fullPath, "utf8");
      if (content.includes(pattern)) return true;
    }
  }
  return false;
}

const features = getFeatures();

console.log(`${COLORS.bgBlack}${COLORS.cyan}${COLORS.bright}`);
console.log("╔══════════════════════════════════════════════════╗");
console.log("║         UNIVERSAL PARITY INTEGRITY CHECK         ║");
console.log("╚══════════════════════════════════════════════════╝");
console.log(`${COLORS.reset}\n`);

console.log(
  `🔍 Scanning ${COLORS.bright}${features.length}${COLORS.reset} shared features...\n`,
);

let allMatched = true;

features.forEach((feature) => {
  const hasWeb = searchInDir(WEB_APP_DIR, `features/${feature}`);
  const hasMobile = searchInDir(MOBILE_APP_DIR, `features/${feature}`);

  const overallStatus =
    hasWeb && hasMobile
      ? `${COLORS.green}✅ COMPLETE${COLORS.reset}`
      : `${COLORS.red}❌ INCOMPLETE${COLORS.reset}`;

  console.log(
    `${COLORS.bright}Feature: [${feature.toUpperCase()}]${COLORS.reset} -> ${overallStatus}`,
  );
  console.log(
    `   🌐 Web (Next.js):    ${hasWeb ? COLORS.green + "MAPPED" : COLORS.red + "MISSING"}${COLORS.reset}`,
  );
  console.log(
    `   📱 Mobile (Expo):    ${hasMobile ? COLORS.green + "MAPPED" : COLORS.red + "MISSING"}${COLORS.reset}\n`,
  );

  if (!hasWeb || !hasMobile) allMatched = false;
});

if (allMatched) {
  console.log("──────────────────────────────────────────────────");
  console.log(
    `${COLORS.green}${COLORS.bright}✨ SUCCESS: All components verified across all platforms!${COLORS.reset}`,
  );
  console.log("──────────────────────────────────────────────────\n");
  process.exit(0);
} else {
  console.log("──────────────────────────────────────────────────");
  console.log(
    `${COLORS.yellow}${COLORS.bright}⚠️ WARNING: Parity gaps detected. Ensure universal coverage.${COLORS.reset}`,
  );
  console.log("──────────────────────────────────────────────────\n");
  process.exit(1);
}
