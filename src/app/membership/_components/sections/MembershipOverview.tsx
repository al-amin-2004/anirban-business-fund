import { ArrowUpRight, HandCoins, UsersRound } from "lucide-react";

const MembershipOverview = () => {
  return (
    <section className="container py-10 lg:py-28">
      <div className="grid items-center gap-12 lg:grid-cols-12 lg:gap-16">
        {/* Left Content */}
        <div className="lg:col-span-7">
          <div className="mb-5 flex items-center gap-3">
            <span className="h-px w-8 bg-accent" />
            <span className="text-sm font-semibold uppercase tracking-wider text-primary">
              ABF Membership
            </span>
          </div>

          <h2 className="max-w-2xl text-2xl font-semibold tracking-tight text-foreground sm:text-4xl lg:text-5xl">
            More Than a Membership.
            <span className="mt-1 block text-primary">
              A Shared Commitment to Growth.
            </span>
          </h2>

          <p className="mt-6 max-w-2xl text-base md:leading-7 text-muted-foreground sm:text-lg">
            Anirban Business Fund is built around collective participation.
            Membership means becoming part of a structured community where
            regular contribution, responsibility, and long-term thinking come
            together to build a stronger fund.
          </p>

          <p className="mt-4 max-w-2xl text-base leading-7 text-muted-foreground">
            Every member contributes to the foundation of the fund and becomes
            part of its journey toward creating meaningful business
            opportunities and sustainable growth.
          </p>
        </div>

        {/* Right Visual */}
        <div className="lg:col-span-5">
          <div className="relative overflow-hidden rounded-2xl border bg-primary p-7 shadow-sm sm:p-9">
            {/* Decorative shape */}
            <div className="absolute -right-16 -top-16 size-40 rounded-full border border-accent/20" />
            <div className="absolute -bottom-20 -left-16 size-48 rounded-full border border-white/15" />

            <div>
              <div className="mb-5 md:mb-10 flex size-12 items-center justify-center rounded-xl bg-accent text-accent-foreground">
                <UsersRound className="size-6" />
              </div>

              <p className="text-sm font-medium text-white/70">
                ANIRBAN BUSINESS FUND
              </p>

              <h3 className="mt-3 text-2xl font-semibold leading-tight text-white sm:text-3xl">
                Building together.
                <br />
                Growing together.
              </h3>

              <div className="mt-3 md:mt-8 space-y-4 border-t border-white/10 pt-6">
                <div className="flex items-center gap-3">
                  <div className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-white/10">
                    <HandCoins className="size-4 text-accent" />
                  </div>

                  <p className="text-sm text-white/80">Regular contribution</p>
                </div>

                <div className="flex items-center gap-3">
                  <div className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-white/10">
                    <UsersRound className="size-4 text-accent" />
                  </div>

                  <p className="text-sm text-white/80">
                    Collective participation
                  </p>
                </div>
              </div>

              <div className="mt-6 md:mt-8 flex items-center gap-2 text-sm font-medium text-accent">
                A long-term vision
                <ArrowUpRight className="size-4" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MembershipOverview;
