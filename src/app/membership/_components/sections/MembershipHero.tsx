import Link from "next/link";
import { ArrowRight, UsersRound } from "lucide-react";

const MembershipHero = () => {
  return (
    <section className="relative overflow-hidden border-b">
      {/* Background decoration */}
      <div className="pointer-events-none absolute -left-32 top-10 h-72 w-72 rounded-full bg-primary/8 blur-3xl" />
      <div className="pointer-events-none absolute -right-32 bottom-0 h-80 w-80 rounded-full bg-accent/10 blur-3xl" />

      <div className="container relative py-10 lg:py-28">
        <div className="mx-auto max-w-4xl text-center">
          {/* Eyebrow */}
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-primary/15 bg-primary/5 px-4 py-2 text-sm font-medium text-primary">
            <UsersRound className="size-4" />
            ABF Membership
          </div>

          {/* Heading */}
          <h1 className="text-4xl font-semibold tracking-tight text-foreground sm:text-5xl lg:text-6xl">
            Become Part of{" "}
            <span className="text-primary">Anirban Business Fund</span>
          </h1>

          {/* Description */}
          <p className="mx-auto mt-6 max-w-2xl text-base md:leading-7 text-muted-foreground sm:text-lg">
            Join a member-driven fund built around regular contribution,
            collective participation, and a long-term vision for growth and
            opportunity.
          </p>

          {/* CTA */}
          <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Link
              href="/profile/membership-apply"
              className="inline-flex items-center justify-center gap-2 rounded-md bg-primary py-3 px-6 text-sm font-medium text-primary-foreground shadow-sm transition-all duration-200 hover:bg-primary/90"
            >
              Start Membership Process
              <ArrowRight className="size-4" />
            </Link>

            <Link
              href="#membership-process"
              className="inline-flex items-center justify-center rounded-md border py-3 px-6 text-sm font-medium  transition-all duration-200 hover:border-primary/30 hover:bg-primary/5"
            >
              How It Works
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MembershipHero;
