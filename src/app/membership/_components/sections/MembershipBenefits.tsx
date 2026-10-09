import { benefits } from "@/constants/membership";
import { ArrowUpRight } from "lucide-react";

const MembershipBenefits = () => {
  return (
    <section className="border-y bg-muted/30 py-10 lg:py-28">
      <div className="container">
        {/* Heading */}
        <div className="mx-auto max-w-3xl text-center">
          <div className="mb-5 flex items-center justify-center gap-3">
            <span className="h-px w-8 bg-accent" />

            <span className="text-sm font-semibold uppercase tracking-wider text-primary">
              Why Become a Member?
            </span>

            <span className="h-px w-8 bg-accent" />
          </div>

          <h2 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl lg:text-5xl">
            Grow with a <span className="text-primary">shared purpose.</span>
          </h2>

          <p className="mt-5 text-base md:leading-7 text-muted-foreground sm:text-lg">
            Membership is about more than contributing to a fund. It is about
            taking part in a structured journey built on participation,
            responsibility, and long-term thinking.
          </p>
        </div>

        {/* Benefits */}
        <div className="mt-10 md:mt-14 grid gap-px overflow-hidden rounded-2xl border bg-border sm:grid-cols-2 lg:grid-cols-4">
          {benefits.map((benefit) => {
            const Icon = benefit.icon;

            return (
              <div
                key={benefit.number}
                className="group bg-background p-7 transition-colors duration-300 hover:bg-primary/3 sm:p-8"
              >
                <div className="flex items-start justify-between">
                  <div className="flex size-11 items-center justify-center rounded-xl bg-primary/8 text-primary transition-colors duration-300 group-hover:bg-primary group-hover:text-primary-foreground">
                    <Icon className="size-5" />
                  </div>

                  <span className="text-sm font-medium text-muted-foreground/60">
                    {benefit.number}
                  </span>
                </div>

                <h3 className="mt-7 text-lg font-semibold text-foreground">
                  {benefit.title}
                </h3>

                <p className="mt-3 text-sm leading-6 text-muted-foreground">
                  {benefit.description}
                </p>

                <ArrowUpRight className="mt-6 size-4 text-primary opacity-0 transition-all duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:opacity-100" />
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default MembershipBenefits;
