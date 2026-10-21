"use client";

import { useState } from "react";
import { useUser } from "@/providers/UserContext";
import { useAccounts } from "@/providers/AccountContext";
import { useSidebar } from "@/providers/SidebarContext";
import { Skeleton } from "@/components/ui/skeleton";
import { Separator } from "@/components/ui/separator";
import { ChevronDown, PanelLeft, PanelRight, User } from "lucide-react";
import AccountSelector from "@/app/profile/_components/ui/AccountSelector";
import SignoutButton from "../ui/SignoutButton";
import Link from "next/link";
import Image from "next/image";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

const ProfileHeader = () => {
  const { user, loading } = useUser();
  const { accounts } = useAccounts();
  const { open, toggle } = useSidebar();
  const [showLogoutDialog, setShowLogoutDialog] = useState<boolean>(false);

  return (
    <header className="py-4 px-6 flex items-center justify-end md:justify-between border-b-2">
      {/* left side */}
      <button onClick={toggle} className="hidden md:block cursor-pointer">
        {open ? <PanelLeft /> : <PanelRight />}
      </button>

      {/* right side */}
      <div className="flex items-center gap-4 md:gap-5">
        {accounts.length > 1 && <AccountSelector className="hidden md:flex" />}

        {/* <Bell className="cursor-pointer" /> */}

        <DropdownMenu>
          <DropdownMenuTrigger>
            {loading ? (
              <div className="flex items-center space-x-3">
                <Skeleton className="size-10 rounded-full" />
                <div className="space-y-2 hidden md:block">
                  <Skeleton className="h-4 w-37.5" />
                  <Skeleton className="h-4 w-20" />
                </div>
              </div>
            ) : (
              <div className="text-start md:px-2 md:py-1.5 rounded-full border flex items-center gap-3 cursor-pointer">
                {user?.avatar ? (
                  <Image
                    src={user.avatar}
                    width={300}
                    height={300}
                    alt="Profile Picture"
                    className="size-9 ring-2 ring-ring rounded-full"
                  />
                ) : (
                  <User className="size-9 p-1 ring-2 ring-ring rounded-full" />
                )}

                <Separator orientation="vertical" className="hidden md:block" />

                <div className="hidden md:block">
                  <h2 className="font-semibold text-sm leading-4 tracking-wider">
                    {user?.fullName}
                  </h2>
                  <p className="text-xs text-primary">{user?.role}</p>
                </div>
                <ChevronDown className="hidden md:block size-5 ms-2.5" />
              </div>
            )}
          </DropdownMenuTrigger>

          <DropdownMenuContent
            align="center"
            className="w-[calc(100vw-28px)] sm:w-full mr-2.5 p-2.5"
          >
            <DropdownMenuGroup className="shadow-xl bg-primary rounded-sm p-2 mb-2">
              <DropdownMenuItem disabled className="data-disabled:opacity-100">
                {user?.avatar ? (
                  <Image
                    src={user.avatar}
                    width={300}
                    height={300}
                    alt="Profile Picture"
                    className="size-7 ring-2 ring-ring rounded-full"
                  />
                ) : (
                  <User className="size-7 p-1 ring-2 ring-ring rounded-full" />
                )}

                <Separator orientation="vertical" />

                <div>
                  <h2 className="font-semibold text-sm leading-4 tracking-wider">
                    {user?.fullName}
                  </h2>
                  <p className="text-xs text-primary-foreground">
                    {user?.role}
                  </p>
                </div>
              </DropdownMenuItem>
            </DropdownMenuGroup>

            {accounts.length > 1 && (
              <AccountSelector className="w-full justify-between" />
            )}

            {user?.role === "admin" && (
              <div>
                <Link href="/admin">
                  <DropdownMenuItem className="cursor-pointer">
                    Admin Panel
                  </DropdownMenuItem>
                </Link>
                <DropdownMenuSeparator />
              </div>
            )}

            <DropdownMenuItem
              variant="destructive"
              className="cursor-pointer"
              onClick={() => setShowLogoutDialog(true)}
            >
              Signout
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        {/* Logout Popup */}
        <Dialog open={showLogoutDialog} onOpenChange={setShowLogoutDialog}>
          <DialogContent className="sm:max-w-106.25">
            <DialogHeader>
              <DialogTitle>Logout Account</DialogTitle>
              <DialogDescription>
                Are you sure you want to{" "}
                <b className="text-destructive">Sign out</b> of your account?
              </DialogDescription>
            </DialogHeader>
            <DialogFooter>
              <DialogClose>Cancel</DialogClose>
              <SignoutButton>Sure</SignoutButton>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </header>
  );
};

export default ProfileHeader;
