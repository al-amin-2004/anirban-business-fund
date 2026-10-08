"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { cn } from "cn";
import { Undo2 } from "lucide-react";
import { usePathname } from "next/navigation";
import { useSidebar } from "@/providers/SidebarContext";
import { LeftArrowIcon } from "@/icons";
import { profileSidebarItems } from "@/constants/profile";

const ProfileSidebar = () => {
  const pathname = usePathname();
  const [navOpen, setNavOpen] = useState<boolean>(false);
  const { open } = useSidebar();
  return (
    <aside
      className={cn(
        "fixed md:relative h-full bg-background border-r-2 border-sidebar-border transition-all duration-300 ease-in-out z-60",
        navOpen ? "w-[calc(100%-30px)]" : "w-0",
        !!open ? "md:w-xs" : "md:w-25",
      )}
    >
      <LeftArrowIcon
        className={cn(
          "md:hidden size-10 cursor-pointer mt-3.5 mr-6 ml-auto z-60 transition",
          navOpen ? "rotate-0" : "rotate-180 -mr-12",
        )}
        onClick={() => setNavOpen(!navOpen)}
      />
      <div className="md:p-1.5 overflow-y-scroll scrollbar-none h-full">
        <div className="w-10/11 mx-auto p-2 px-4 border-b">
          <Link href="/">
            <Image
              src="/logos/logo.png"
              alt="Logo"
              width={300}
              height={100}
              className="h-auto w-full"
            />
          </Link>
        </div>
        <ul className="space-y-6 p-4">
          {profileSidebarItems.map(({ title, items }, idx) => (
            <div key={idx} className="space-y-0.5">
              {open && (
                <h4 className="text-sm text-primary font-bold">{title}</h4>
              )}
              {items.map((item) => {
                const navActive = pathname === item.link;
                return (
                  <li key={item.label} onClick={() => setNavOpen(false)}>
                    <Link
                      href={item.link}
                      className={cn(
                        "flex items-center gap-1 rounded ms-2 text-sm text-nowrap cursor-pointer",
                        { "hover:bg-slate-400/20": open },
                        { "bg-primary": open && navActive },
                      )}
                    >
                      <div
                        className={cn(
                          "p-2 rounded-full",
                          { "hover:bg-slate-400/20": !open && !navActive },
                          { "bg-primary": !open && navActive },
                        )}
                      >
                        <item.icon className="size-5" />
                      </div>
                      <p>{open && item.label}</p>
                    </Link>
                  </li>
                );
              })}
            </div>
          ))}
        </ul>
      </div>

      <Link
        href="/"
        className={cn(
          "w-full absolute bottom-0 flex items-center justify-center gap-1 rounded-t-lg bg-background hover:bg-slate-300/30 border-t",
        )}
      >
        <div className="p-2.5 rounded-full">
          <Undo2 />
        </div>
        <p>{open && !navOpen && "Back to Home"}</p>
      </Link>
    </aside>
  );
};

export default ProfileSidebar;
