import Link from "next/link";
import Image from "next/image";
import { footerLinks, socials } from "@/constants/home";

const Footer = () => {
  return (
    <footer className="bg-primary">
      <section className="max-w-11/12 mx-auto px-5 py-10 md:px-10 md:py-12 bg-background rounded-b-3xl grid grid-cols-3 xl:grid-cols-5 gap-8 lg:gap-10">
        {/* Brand */}
        <div className="space-y-5 col-span-3 lg:col-span-2">
          {/* Logo */}
          <Link href="/">
            <Image
              src="/logos/logo.png"
              alt="Logo"
              width={250}
              height={100}
              className="h-auto w-40 sm:w-45 lg:w-60"
            />
          </Link>

          <p className="max-w-md text-sm md:text-base md:leading-6 text-muted-foreground mt-2.5">
            A member-driven initiative under Anirban Organization, built around
            collective contribution, business opportunities, and long-term
            growth.
          </p>

          {/* Social */}
          <div className="flex items-center gap-3 pt-2">
            {socials.map((a, i) => (
              <Link
                key={i}
                href={a.link}
                aria-label={a.link}
                className="flex size-12 items-center justify-center rounded-full border border-border bg-card text-muted-foreground transition-colors hover:border-primary hover:bg-primary hover:text-primary-foreground"
              >
                <a.icon />
              </Link>
            ))}
          </div>

          {/* Address */}
          <div className="pt-5 md:pt-8">
            <h5 className="font-semibold bg-primary inline text-foreground p-1.5 pe-20 rounded-[15%_40%/40%_15%]">
              Address
            </h5>

            <address className="mt-2 max-w-sm text-sm md:leading-6 text-muted-foreground not-italic">
              203 Fake St. Mountain View, San Francisco, California, USA
            </address>
          </div>
        </div>

        {footerLinks.map(({ name, items }) => (
          <div key={name} className="col-span-3 lg:col-span-1">
            <h5 className="font-semibold bg-primary inline text-foreground p-1.5 pe-20 rounded-[15%_40%/40%_15%]">
              {name}
            </h5>

            <ul className="mt-5 space-y-3 text-sm text-muted-foreground font-medium dark:font-normal">
              {items.map(({ link, label }) => (
                <li key={label}>
                  <Link
                    href={link}
                    className="transition-colors hover:text-primary"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </section>

      <div className="container flex flex-col md:flex-row items-center justify-between gap-3 text-center md:text-left text-xs md:text-sm text-foreground p-4">
        <p>© 2026 Anirban Business Fund. All rights reserved.</p>

        <p>
          A part of <span className="font-semibold">Anirban Organization</span>
        </p>
      </div>
    </footer>
  );
};

export default Footer;
