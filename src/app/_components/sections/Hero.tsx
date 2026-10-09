import Image from "next/image";
import { Button } from "@/components/ui/button";
import robotHand from "@/../public/robothand.png";
import Link from "next/link";

const Hero = () => {
  return (
    <section>
      <div className="container h-screen flex flex-col lg:flex-row gap-10">
        {/* Left Side of Hero Section */}
        <div className="lg:flex-5/12 space-y-6 lg:space-y-9 mt-4 lg:mt-18">
          <p className="font-semibold text-xl lg:text-2xl text-primary text-center md:text-start">
            ANIRBAN BUSINESS FUND
          </p>

          <h2 className="text-4xl md:text-6xl font-semibold md:font-bold lg:pe-20 md:leading-18">
            Building a Fund. Growing Together.
          </h2>

          <p className="md:text-xl text-muted-foreground max-w-2xl">
            A member-driven fund built to bring together regular contributions,
            create business opportunities, and grow our collective financial
            future.
          </p>

          <div className="flex flex-wrap items-center gap-4">
            <Link href="/membership">
              <Button>Become a Member</Button>
            </Link>

            <Link href="#about">
              <Button variant="outline">Learn More</Button>
            </Link>
          </div>
        </div>

        {/* Right Side of Hero Section */}
        <div className="lg:flex-1/2 w-full flex flex-col items-center lg:mt-20">
          <Image
            src="/logos/anirban-logo-white.png"
            width={500}
            height={500}
            alt="Logo"
            className="md:translate-x-16 w-[clamp(10rem,30vw,20rem)] md:hidden lg:block"
          />

          <Image
            src={robotHand}
            width={1000}
            height={500}
            priority
            fetchPriority="high"
            alt="Robot hand Image"
            className="absolute right-0 bottom-0 lg:bottom-10 lg:w-[clamp(20rem,50vw,55rem)]"
          />
        </div>
      </div>
    </section>
  );
};

export default Hero;
