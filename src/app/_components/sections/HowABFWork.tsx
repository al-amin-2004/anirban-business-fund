import { steps } from "@/constants/home";

const HowABFWorks = () => {
  return (
    <section className="py-7 md:py-16 lg:py-20">
      <div className="container">
        {/* Heading */}
        <div className="max-w-3xl mx-auto text-center space-y-4">
          <p className="text-sm md:text-base font-semibold uppercase tracking-[0.2em] text-primary">
            How ABF Works
          </p>

          <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold tracking-tight">
            Simple Steps,
            <span className="text-primary"> Shared Growth</span>
          </h2>

          <p className="text-muted-foreground text-base md:text-lg lg:text-xl md:leading-relaxed">
            ABF follows a simple collective approach — members contribute
            regularly, build the fund together, and work toward suitable
            business opportunities and long-term growth.
          </p>
        </div>

        {/* Steps */}
        <div className="relative mt-14 md:mt-20">
          {/* Desktop connecting line */}
          <div className="hidden lg:block absolute top-8 left-[10%] right-[10%] h-px bg-border" />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6 lg:gap-4">
            {steps.map((step) => {
              const Icon = step.icon;

              return (
                <div key={step.id} className="relative group text-center">
                  {/* Number / Icon */}
                  <div className="relative z-10 mx-auto flex size-16 items-center justify-center rounded-2xl border border-primary/20 bg-background text-primary shadow-sm transition-all duration-300 group-hover:border-primary/40 group-hover:bg-primary group-hover:text-primary-foreground">
                    <Icon className="size-7" />
                  </div>

                  <span className="mt-4 block text-xs font-semibold tracking-[0.2em] text-primary">
                    STEP {step.id}
                  </span>

                  <h3 className="mt-2 text-lg md:text-xl font-semibold">
                    {step.title}
                  </h3>

                  <p className="mt-3 text-sm md:text-base md:leading-7 text-muted-foreground">
                    {step.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Bottom message */}
        <div className="mt-12 md:mt-16 rounded-2xl border border-primary/20 bg-primary/5 px-6 py-7 md:px-10 md:py-9 text-center">
          <p className="text-base md:text-lg font-medium">
            <span className="text-primary">Contribute.</span>{" "}
            <span className="text-primary">Build.</span>{" "}
            <span className="text-primary">Grow.</span>
            <span className="text-muted-foreground"> — together as ABF.</span>
          </p>
        </div>
      </div>
    </section>
  );
};

export default HowABFWorks;
