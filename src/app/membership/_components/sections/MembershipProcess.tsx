import { steps } from "@/constants/membership";

const MembershipProcess = () => {
  return (
    <section
      id="membership-process"
      className="border-y bg-muted/30 py-20 lg:py-28"
    >
      <div className="container">
      {/* Heading */}
      <div className="mx-auto max-w-3xl text-center">
        <div className="mb-5 flex items-center justify-center gap-3">
          <span className="h-px w-8 bg-accent" />

          <span className="text-sm font-semibold uppercase tracking-wider text-primary">
            How Membership Works
          </span>

          <span className="h-px w-8 bg-accent" />
        </div>

        <h2 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl lg:text-5xl">
          A simple process,
          <span className="text-primary"> handled with care.</span>
        </h2>

        <p className="mt-5 text-base md:leading-7 text-muted-foreground sm:text-lg">
          Follow these steps to complete your ABF membership application and
          become an approved member.
        </p>
      </div>

      {/* Steps */}
      <div className="mx-auto my-10 max-w-5xl">
        <div className="grid gap-4 md:grid-cols-2">
          {steps.map((step) => {
            const Icon = step.icon;

            return (
              <div
                key={step.number}
                className="group relative rounded-2xl border bg-background p-6 transition-all duration-300 hover:-translate-y-0.5 hover:border-primary/20 hover:shadow-sm sm:p-7"
              >
                <div className="flex gap-5">
                  {/* Number + Icon */}
                  <div className="shrink-0">
                    <div className="relative flex size-12 items-center justify-center rounded-xl bg-primary text-primary-foreground">
                      <Icon className="size-5" />

                      <span className="absolute -right-2 -top-2 flex size-6 items-center justify-center rounded-full border-2 border-background bg-accent text-[10px] font-bold text-accent-foreground">
                        {step.number}
                      </span>
                    </div>
                  </div>

                  {/* Content */}
                  <div>
                    <h3 className="font-semibold">{step.title}</h3>

                    <p className="mt-2 text-sm md:leading-6 text-muted-foreground">
                      {step.description}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Bottom note */}
      <div className="mx-auto max-w-3xl rounded-xl border border-accent/20 bg-accent/5 px-5 py-4 text-center">
        <p className="text-sm leading-6 text-muted-foreground">
          <span className="font-semibold text-foreground">Please note:</span>{" "}
          Completing the online process or downloading the form does not
          automatically make you an ABF member. Membership is activated only
          after physical submission and approval.
        </p>
      </div>
      </div>
    </section>
  );
};

export default MembershipProcess;
