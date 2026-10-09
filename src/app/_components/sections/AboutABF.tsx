import { ArrowRight, BriefcaseBusiness, Users, TrendingUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const rightCardsContent = [
  {
    icon: Users,
    title: "Member Driven",
    description:
      "Built around regular member contributions and collective participation.",
  },
  {
    icon: BriefcaseBusiness,
    title: "Business Focused",
    description:
      "Focused on identifying suitable opportunities to put collective resources to productive use.",
  },
  {
    icon: TrendingUp,
    title: "Long-Term Growth",
    description:
      "Designed with a long-term mindset toward sustainable collective growth.",
  },
];

const AboutABF = () => {
  return (
    <section id="about" className="py-4 md:py-10 lg:py-20">
      <div className="container">
        {/* Section Heading */}
        <div className="max-w-3xl mx-auto text-center space-y-4">
          <p className="text-sm md:text-base font-semibold uppercase tracking-[0.2em] text-primary">
            About ABF
          </p>

          <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold tracking-tight">
            Building a Fund,
            <span className="text-primary"> Growing Together</span>
          </h2>

          <p className="text-muted-foreground text-base md:text-lg lg:text-xl md:leading-relaxed">
            Anirban Business Fund is a member-driven initiative under Anirban
            Organization, created to bring people together through regular
            contributions and collective business opportunities.
          </p>
        </div>

        {/* Main Content */}
        <div className="mt-14 md:mt-20 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-stretch">
          {/* Left Content */}
          <div className="lg:col-span-7 rounded-2xl border border-border bg-card p-6 md:p-8 lg:p-10">
            <div className="space-y-6">
              <div>
                <p className="text-sm font-medium text-primary mb-2">
                  Our Purpose
                </p>

                <h3 className="text-2xl md:text-3xl font-semibold">
                  Turning regular contributions into collective opportunities.
                </h3>
              </div>

              <p className="text-muted-foreground text-base md:text-lg md:leading-8">
                ABF was created with a simple idea: when people contribute
                consistently and work together with a shared purpose, those
                resources can create meaningful opportunities for business and
                financial growth.
              </p>

              <p className="text-muted-foreground text-base md:text-lg md:leading-8">
                Members contribute regularly to build a collective fund. The
                fund can then be used for suitable business and investment
                opportunities with the goal of creating sustainable growth over
                time.
              </p>

              <Link href="#how-abf-work">
                <Button variant="outline" className="group">
                  Learn More
                  <ArrowRight className="ml-2 size-4 transition-transform group-hover:translate-x-1" />
                </Button>
              </Link>
            </div>
          </div>

          {/* Right Cards */}
          <div className="lg:col-span-5 grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-1 gap-4">
            {rightCardsContent.map((cardContent) => {
              const Icon = cardContent.icon;
              return (
                <div
                  key={cardContent.title}
                  className="rounded-2xl border border-border bg-card p-6 md:p-7"
                >
                  <div className="size-11 rounded-xl bg-primary/10 text-primary flex items-center justify-center">
                    <Icon className="size-5" />
                  </div>

                  <h3 className="mt-5 text-lg md:text-xl font-semibold">
                    {cardContent.title}
                  </h3>

                  <p className="mt-2 text-sm md:text-base text-muted-foreground md:leading-7">
                    {cardContent.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Bottom Highlight */}
        <div className="mt-8 md:mt-10 rounded-2xl border border-primary/20 bg-primary/5 p-6 md:p-8 lg:p-10">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
            <div className="max-w-3xl">
              <p className="text-sm font-semibold text-primary uppercase tracking-wider">
                Our Vision
              </p>

              <h3 className="mt-2 text-2xl md:text-3xl font-semibold">
                Create opportunities through collective effort and responsible
                growth.
              </h3>

              <p className="mt-3 text-muted-foreground leading-7">
                ABF aims to build a structured and transparent environment where
                members can participate, contribute, and grow together.
              </p>
            </div>

            <div className="shrink-0">
              <Button variant="defaultAnimation" className="w-full md:w-auto">
                Explore ABF
                <ArrowRight className="ml-2 size-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutABF;
