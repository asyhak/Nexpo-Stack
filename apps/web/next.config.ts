import { withGluestackUI } from "@gluestack/ui-next-adapter";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  transpilePackages: [
    "app",
    "ui",
    "nativewind",
    "@gluestack-ui/core",
    "@gluestack-ui/utils",
    "react-native-svg",
    "react-native-css-interop",
    "react-native-reanimated",
    "expo-modules-core",
    "expo-linking",
    "expo-constants",
    "expo-asset",
    "expo",
    "expo-font",
    "react-native-worklets",
    "react-native-safe-area-context",
    "lucide-react-native",
    "@expo/html-elements",
  ],
  webpack: (config) => {
    config.resolve.alias = {
      ...(config.resolve.alias || {}),
      // Transform all direct `react-native` imports to `react-native-web`
      "react-native$": "react-native-web",
    };
    config.resolve.extensions = [
      ".web.js",
      ".web.jsx",
      ".web.ts",
      ".web.tsx",
      ...config.resolve.extensions,
    ];
    return config;
  },
};

export default withGluestackUI(nextConfig);
