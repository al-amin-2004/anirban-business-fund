import Link from "next/link";
import Image from "next/image";
import { ArrowLeft } from "lucide-react";
import style from "@/styles/rippleButton.module.css";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="relative min-h-screen overflow-hidden bg-background">
      {/* ABF Background Glow */}
      <div
        aria-hidden
        className="absolute inset-x-0 h-200 top-0 z-0 pointer-events-none"
        style={{
          backgroundImage: `
            radial-gradient(circle at 78% 24%,rgba(212, 167, 44, 0.10) 0,transparent 40%),
            radial-gradient(circle at 15% 15%,rgba(20, 83, 45, 0.10) 0,transparent 35%)`,
        }}
      />

      {/* Authentication Page Header */}
      <header className="absolute inset-x-0 top-0 z-50">
        <div className="container py-4 md:py-6 flex items-center justify-between">
          <Link
            href="/"
            type="button"
            aria-label="Back to home"
            className={style.rippleButton}
          >
            <ArrowLeft color="var(--primary)" />
          </Link>

          <Link href="/">
            <Image
              src="/logos/logo.png"
              alt="Logo"
              width={222}
              height={89}
              className="h-auto w-38 sm:w-40 lg:w-45"
            />
          </Link>
        </div>
      </header>

      {/* Authentication page main content */}
      <section className="relative z-10 min-h-screen flex justify-center md:items-center px-4 md:px-6 perspective-[1000px]">
        {children}
      </section>
    </main>
  );
}
