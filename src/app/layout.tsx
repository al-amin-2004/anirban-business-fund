import type { Metadata } from "next";
import { Geist, Geist_Mono, Inter } from "next/font/google";
import "@/styles/globals.css";
import { cn } from "@/lib/utils";
import { Toaster } from "@/components/ui/toast";

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Create Next App",
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
    <html
      lang="en"
      className={cn(
        geistSans.variable,
        geistMono.variable,
        "font-sans",
        inter.variable,
      )}
    >
      <body>
        {children}
        <Toaster/>
      </body>
    </html>
  );
}
