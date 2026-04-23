import { HomeScreen } from "@repo/app/features/home/home-example-screen";
import { siteConfig } from "@/lib/config/site-config";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: siteConfig.title,
  description: siteConfig.description,
};

export default function Home() {
  return <HomeScreen />;
}
