import Link from "next/link";
import { ArrowRight, FileSignature } from "lucide-react";

const MembershipCTA = () => {
  return (
    <section className="container pb-10 lg:pb-28">
      <div className="relative overflow-hidden rounded-3xl bg-primary px-4 py-10 sm:px-8 lg:p-16">
        {/* Decorative elements */}
        <div className="pointer-events-none absolute -right-20 -top-20 size-64 rounded-full border border-accent/15" />
        <div className="pointer-events-none absolute -bottom-24 -left-20 size-72 rounded-full border border-white/15" />

        <div className="relative mx-auto max-w-3xl text-center">
          <div className="mx-auto flex size-12 items-center justify-center rounded-xl bg-accent text-accent-foreground">
            <FileSignature className="size-5" />
          </div>

          <h2 className="mt-6 text-3xl font-semibold tracking-tight text-white sm:text-4xl lg:text-5xl">
            Ready to become an <span className="text-accent">ABF member?</span>
          </h2>

          <p className="mt-5 max-w-2xl text-base md:leading-7 text-white/70 sm:text-lg">
            Take the first step toward becoming part of Anirban Business Fund.
            Start your application and prepare your official membership form.
          </p>

          <div className="mt-6 md:mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Link
              href="/profile/membership/apply"
              className="inline-flex items-center justify-center gap-2 rounded-md bg-accent py-3 px-6 text-sm font-semibold text-accent-foreground shadow-sm transition-all duration-200 hover:opacity-90"
            >
              Start Membership Process
              <ArrowRight className="size-4" />
            </Link>

            <Link
              href="/contact"
              className="inline-flex items-center justify-center rounded-md border border-white/20 bg-white/5 py-3 px-6 text-sm font-medium text-white transition-all duration-200 hover:bg-white/10"
            >
              Contact ABF
            </Link>
          </div>

          <p className="mt-6 text-xs text-white/50">
            Membership becomes active only after physical submission and
            approval by the authorized ABF authority.
          </p>
        </div>
      </div>
    </section>
  );
};

export default MembershipCTA;
