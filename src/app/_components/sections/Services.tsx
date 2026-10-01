import { servicescardData } from "@/constants/home";

const Services = () => {
  return (
    <section id="activities" className="py-6 md:py-16 lg:py-26">
      <div className="container">
        {/* Section Heading */}
        <div className="max-w-3xl mx-auto text-center space-y-4">
          <p className="text-sm md:text-base font-semibold uppercase tracking-[0.2em] text-primary">
            What We Focus On
          </p>

          <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold tracking-tight">
            Building Together,
            <span className="text-primary"> Growing Together</span>
          </h2>

          <p className="text-muted-foreground text-base md:text-lg lg:text-xl md:leading-relaxed px-4">
            ABF brings members together around regular contribution, collective
            participation, and suitable opportunities for long-term growth.
          </p>
        </div>

        {/* Cards */}
        <div className="mt-12 md:mt-16 grid grid-cols-1 md:grid-cols-3 gap-5 md:gap-6">
          {servicescardData.map(({ desc, head, icon }, i) => {
            const Icon = icon;

            return (
              <div
                key={i}
                className="group relative overflow-hidden rounded-2xl border border-border bg-card p-6 md:p-8 transition-all duration-300 hover:-translate-y-1 hover:border-primary/40 hover:shadow-lg"
              >
                {/* Background Accent */}
                <div className="pointer-events-none absolute -right-12 -top-12 size-32 rounded-full bg-primary/5 transition-transform duration-500 group-hover:scale-150" />

                {/* Icon */}
                <div className="relative flex size-12 md:size-14 items-center justify-center rounded-xl bg-primary/10 text-primary transition-colors duration-300 group-hover:bg-primary group-hover:text-primary-foreground">
                  <Icon className="size-6 md:size-7" />
                </div>

                {/* Content */}
                <div className="relative mt-6">
                  <p className="text-xs font-semibold uppercase tracking-[0.15em] text-primary">
                    0{i + 1}
                  </p>

                  <h3 className="mt-2 text-xl md:text-2xl font-semibold">
                    {head}
                  </h3>

                  <p className="mt-3 text-sm md:text-base md:leading-7 text-muted-foreground">
                    {desc}
                  </p>
                </div>

                {/* Bottom accent */}
                <div className="mt-6 h-1 w-10 rounded-full bg-primary/20 transition-all duration-300 group-hover:w-16 group-hover:bg-primary" />
              </div>
            );
          })}
        </div>

        {/* Bottom Statement */}
        <div className="mt-8 md:mt-10 rounded-2xl border border-primary/20 bg-primary/5 p-6 md:p-8 text-center">
          <p className="text-base md:text-lg font-medium">
            <span className="text-primary">Participation</span>
            <span className="text-muted-foreground"> → </span>
            <span className="text-primary">Contribution</span>
            <span className="text-muted-foreground"> → </span>
            <span className="text-primary">Opportunity</span>
            <span className="text-muted-foreground"> → </span>
            <span className="text-primary">Growth</span>
          </p>
        </div>
      </div>
    </section>
  );
};

export default Services;
