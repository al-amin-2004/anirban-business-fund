import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "@/styles/globals.css";
import { cn } from "@/lib/utils";
import { Toaster } from "@/components/ui/toast";

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });

export const metadata: Metadata = {
  title: {
    default: "Anirban Business Fund",
    template: "%s | Anirban Business Fund",
  },
  description: "A helpful organization by Anirban Organization",
  classification: "Teamwork",
  authors: [
    { name: "Arvin Tushar", url: "https://arvin-tushar.vercel.app" },
    { name: "Al amin, alaminmridha2004@gmail.com" },
  ],
  keywords: [
    "anirban organization",
    "anirban business fund",
    "anirban donation fund",
    "abf",
  ],
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={cn("dark", inter.variable, "font-sans")}>
      <body>
        {children}
        <Toaster />
      </body>
    </html>
  );
}
