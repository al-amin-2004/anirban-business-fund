"use client";

import { useAccounts } from "@/providers/AccountContext";
import { Button } from "@/components/ui/button";
import { Check, ChevronsUpDown, CreditCard } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export default function AccountSelector() {
  const { accounts, activeAccount, setActiveAccount } = useAccounts();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        render={
          <Button variant="outline" className="rounded-lg px-3 py-2">
            {activeAccount?.accName ?? "Select account"}
            <ChevronsUpDown className="size-4 text-muted-foreground ms-2" />
          </Button>
        }
      />

      <DropdownMenuContent align="end" className="w-72 rounded-xl p-2">
        <DropdownMenuGroup>
          <DropdownMenuLabel className="px-2 py-2">
            <p className="text-base">Your accounts</p>
            <p className="text-xs font-normal text-muted-foreground">
              Choose an account to continue
            </p>
          </DropdownMenuLabel>
        </DropdownMenuGroup>

        <DropdownMenuSeparator />

        {accounts.map((account) => {
          const isSelected = activeAccount?._id === account._id;

          return (
            <DropdownMenuItem
              key={account._id}
              onClick={() => setActiveAccount(account)}
              className="cursor-pointer rounded-lg px-2 py-3"
            >
              <div className="flex w-full items-center gap-3">
                <div
                  className={`flex size-10 items-center justify-center rounded-lg ${
                    isSelected
                      ? "bg-emerald-900 text-white"
                      : "bg-muted text-muted-foreground"
                  }`}
                >
                  <CreditCard className="size-5" />
                </div>

                <div className="flex-1">
                  <p className="truncate font-medium">{account.accName}</p>
                  <p className="text-xs text-muted-foreground">
                    •••• {account.accNumber.slice(-4)}
                  </p>
                </div>

                {isSelected && <Check className="size-4 text-primary" />}
              </div>
            </DropdownMenuItem>
          );
        })}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
