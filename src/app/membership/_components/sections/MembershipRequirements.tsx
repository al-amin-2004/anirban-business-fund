import { requirements2 } from "@/constants/membership";

const MembershipRequirements = () => {
  return (
    <section className="container py-10 lg:py-28">
      <div className="mx-auto max-w-3xl text-center">
        <div className="mb-5 flex items-center justify-center gap-3">
          <span className="h-px w-8 bg-accent" />

          <span className="text-sm font-semibold uppercase tracking-wider text-primary">
            Requirements
          </span>

          <span className="h-px w-8 bg-accent" />
        </div>

        <h2 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl lg:text-5xl">
          Everything you need to{" "}
          <span className="text-primary">get started.</span>
        </h2>

        <p className="mt-5 text-base md:leading-7 text-muted-foreground sm:text-lg">
          Prepare the required information and complete each part of the
          application carefully before submitting your membership form.
        </p>
      </div>

      <div className="mx-auto mt-10 md:mt-14 grid max-w-5xl gap-5 sm:grid-cols-2">
        {requirements2.map((item) => {
          const Icon = item.icon;

          return (
            <div
              key={item.number}
              className="group flex gap-5 rounded-2xl border bg-background p-4 sm:p-7 transition-all duration-300 hover:border-primary/20 hover:shadow-sm"
            >
              <div className="flex size-12 shrink-0 items-center justify-center rounded-xl bg-primary/8 text-primary transition-colors duration-300 group-hover:bg-primary group-hover:text-primary-foreground">
                <Icon className="size-5" />
              </div>

              <div>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-semibold text-muted-foreground">
                    {item.number}
                  </span>

                  <h3 className="text-sm md:text-base font-semibold">
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

      {/* Important note */}
      <div className="mx-auto mt-8 max-w-5xl rounded-2xl border bg-muted/30 p-4 sm:p-7">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-start">
          <div className="size-2 shrink-0 rounded-full bg-accent sm:mt-2" />

          <p className="text-sm leading-6 text-muted-foreground">
            <span className="font-semibold text-foreground">Important:</span>{" "}
            Please ensure that the information provided in your application
            matches your official information. The submitted physical form may
            be reviewed by the authorized ABF authority before approval.
          </p>
        </div>
      </div>
    </section>
  );
};

export default MembershipRequirements;
