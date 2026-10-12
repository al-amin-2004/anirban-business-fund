"use client";

import { useSidebar } from "@/providers/SidebarContext";
import { Bell, PanelLeft, PanelRight } from "lucide-react";

const AdminHeader = () => {
  const { toggle, open } = useSidebar();

  return (
    <header className="py-4 px-6 flex items-center justify-end md:justify-between border-b-2">
      {/* left side */}
      <button onClick={toggle} className="hidden md:block cursor-pointer">
        {open ? <PanelLeft /> : <PanelRight />}
      </button>

      {/* right side */}
      <div className="flex items-center gap-4 md:gap-5">
        <Bell className="cursor-pointer" />
      </div>
    </header>
  );
};

export default AdminHeader;
