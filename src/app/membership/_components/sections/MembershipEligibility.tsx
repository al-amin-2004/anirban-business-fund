import { requirements } from "@/constants/membership";

const MembershipEligibility = () => {
  return (
    <section className="container py-10 lg:py-28 grid gap-12 lg:grid-cols-12 lg:gap-16">
      {/* Left */}
      <div className="lg:col-span-5">
        <div className="sticky top-24">
          <div className="mb-5 flex items-center gap-3">
            <span className="h-px w-8 bg-accent" />

            <span className="text-sm font-semibold uppercase tracking-wider text-primary">
              Membership Eligibility
            </span>
          </div>

          <h2 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl lg:text-5xl">
            Ready to become part of <span className="text-primary">ABF?</span>
          </h2>

          <p className="mt-6 text-base md:leading-7 text-muted-foreground sm:text-lg">
            Becoming an ABF member follows a simple but structured process. Make
            sure your information is complete and follow the application process
            before submitting your form.
          </p>

          <div className="mt-8 rounded-xl border border-primary/15 bg-primary/4 p-5">
            <p className="text-sm leading-6 text-muted-foreground">
              <span className="font-semibold text-foreground">Important:</span>{" "}
              Membership is subject to review and approval by the authorized ABF
              authority.
            </p>
          </div>
        </div>
      </div>

      {/* Right */}
      <div className="lg:col-span-7">
        <div className="divide-y divide-border rounded-2xl border">
          {requirements.map((item) => {
            const Icon = item.icon;

            return (
              <div
                key={item.title}
                className="group flex gap-5 p-6 transition-colors duration-300 hover:bg-primary/2.5 sm:p-7"
              >
                <div className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-primary/8 text-primary transition-all duration-300 group-hover:bg-primary group-hover:text-primary-foreground">
                  <Icon className="size-5" />
                </div>

                <div>
                  <div className="flex items-center gap-3">
                    <span className="text-xs font-semibold text-muted-foreground">
                      {item.number}
                    </span>

                    <h3 className="font-semibold text-foreground">
                      {item.title}
                    </h3>
                  </div>

                  <p className="mt-2 text-sm md:leading-6 text-muted-foreground">
                    {item.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default MembershipEligibility;
