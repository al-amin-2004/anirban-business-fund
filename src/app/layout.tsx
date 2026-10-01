import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "@/styles/globals.css";

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
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable}`}>
      <body>{children}</body>
    </html>
  );
}
