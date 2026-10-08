"use client";

import { FC, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { BarsIcon, TimesIcon } from "@/icons";
import { MoveRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Navlist } from "@/constants/home";
import { cn } from "cn";

const Header: FC = () => {
  const [navOpen, setNavOpen] = useState<boolean>(false);
  return (
    <header className="sticky top-0 mt-5 md:mt-10 z-99">
      <div className="relative w-11/12 md:w-10/12 mx-auto p-0.5 px-2 md:p-2 md:px-2.5 rounded-md backdrop-blur-md bg-background/70 border flex justify-between items-center">
        <Link href="/">
          <Image
            src="/logos/logo.png"
            alt="Logo"
            width={222}
            height={89}
            className="h-auto w-38 sm:w-40 lg:w-45"
          />
        </Link>

        <div className="flex items-center gap-2 md:gap-14">
          <ul
            className={`absolute md:static h-0 md:h-auto w-full md:w-auto top-full left-0 overflow-hidden p-0 rounded-b-md bg-background/95 md:bg-transparent md:flex items-center gap-2 md:gap-3 transition-all duration-300 ${
              navOpen && "h-fit p-1"
            }`}
          >
            {Navlist.map((list) => (
              <li
                key={list.link}
                className={cn({ hidden: !navOpen && list.label === "Profile" })}
                onClick={() => setNavOpen(false)}
              >
                <Link
                  href={list.link}
                  className="block px-2 py-1.5 text-[15px] text-nowrap text-foreground/80 hover:text-primary hover:bg-primary/10 font-medium dark:font-normal rounded-sm transition-all duration-300 cursor-pointer"
                >
                  {list.label}
                </Link>
              </li>
            ))}
          </ul>

          <Link href="/profile/dashboard" className="hidden lg:block">
            <Button variant="defaultAnimation">
              My Profile <MoveRight className="ms-1.5" />
            </Button>
          </Link>

          <div
            className="md:hidden fill-primary stroke-primary hover:bg-primary/10 rounded-full p-1.5 cursor-pointer"
            onClick={() => setNavOpen(!navOpen)}
          >
            {navOpen ? <TimesIcon /> : <BarsIcon />}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
