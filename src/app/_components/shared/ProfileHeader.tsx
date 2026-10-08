"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useSidebar } from "@/providers/SidebarContext";
import { useUser } from "@/providers/UserContext";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "cn";
import { Separator } from "@/components/ui/separator";
import { ChevronDown, PanelLeft, PanelRight, User } from "lucide-react";
import SignoutButton from "./SignoutButton";
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
  const { open, toggle } = useSidebar();
  const [showLogoutDialog, setShowLogoutDialog] = useState<boolean>(false);

  // Demo account
  const accounts = [
    { _id: "1", accName: "A" },
    { _id: "2", accName: "B" },
  ];
  const activeAccount = { _id: "2" };

  return (
    <header className="py-4 px-6 flex items-center justify-end md:justify-between border-b-2">
      {/* left side */}
      <button onClick={toggle} className="hidden md:block cursor-pointer">
        {open ? <PanelLeft /> : <PanelRight />}
      </button>

      {/* right side */}
      <div className="flex items-center gap-4 md:gap-5">
        {accounts.length > 1 && (
          <ul className="hidden md:flex gap-2.5">
            {accounts.map((account) => (
              <li
                key={account._id}
                className={cn(
                  "py-1 px-2.5 bg-muted rounded-full flex justify-center items-center cursor-pointer",
                  {
                    "text-green-500 ring ring-green-400":
                      account._id === activeAccount?._id,
                  },
                )}
              >
                {account.accName}
              </li>
            ))}
          </ul>
        )}

        <DropdownMenu>
          <DropdownMenuTrigger>
            {loading ? (
              <div className="flex items-center space-x-3">
                <Skeleton className="size-12 rounded-full" />
                <div className="space-y-2">
                  <Skeleton className="h-4 w-37.5" />
                  <Skeleton className="h-4 w-20" />
                </div>
              </div>
            ) : (
              <div className="text-start md:px-2.5 md:py-1.5 rounded-full border flex items-center gap-3 cursor-pointer">
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
            align="start"
            className="w-[calc(100vw-20px)] md:w-65 mr-2.5 p-2.5"
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

              {/* {accounts.length > 1 && (
                <Select
                  value={activeAccount ? String(activeAccount._id) : undefined}
                  onValueChange={(value) => {
                    const selected = accounts.find(
                      (acc) => String(acc._id) === value,
                    );
                    if (selected) setActiveAccount(selected);
                  }}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select account" />
                  </SelectTrigger>

                  <SelectContent>
                    {accounts.map((account) => (
                      <SelectItem
                        key={String(account._id)}
                        value={String(account._id)}
                      >
                        Account {account.accName}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              )} */}
            </DropdownMenuGroup>

            <DropdownMenuItem
              className="p-0"
              onSelect={(e) => e.preventDefault()}
            >
              {/* <FinancialAccCreatepage
                btnClass="px-2 p-1.5 text-inharit bg-inherit hover:bg-inherit hover:translate-0 w-full rounded justify-start"
                btnLabel={
                  accounts.length === 0
                    ? "Open an Account"
                    : "Open another Account"
                }
              /> */}
            </DropdownMenuItem>

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
