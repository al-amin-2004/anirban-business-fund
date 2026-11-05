"use client";

import { useMemo, useState } from "react";
import { IAccount, Status } from "@/types";
import { EllipsisVertical } from "lucide-react";
import { useAllAccounts } from "@/providers/AllAccountsContext";
import { Option, Select } from "@/app/_components/ui/Select";
import { accStatus } from "@/constants/account";
import { useAllUsers } from "@/providers/AllUsersContext";
import { createMapById } from "@/helpers/createMapById";
import { cn } from "cn";
import Loader from "@/components/ui/loader";
import PagesTitle from "@/app/_components/ui/PagesTitle";
import Input from "@/app/_components/ui/Input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import ViewAccount from "../../_components/accounts/ViewAccount";
import EditAccount from "../../_components/accounts/EditAccount";
import ChangeStatus from "../../_components/accounts/ChangeStatus";
import Deposit from "../../_components/accounts/Deposit";

const Page = () => {
  const { allAccounts, loading } = useAllAccounts();
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<"all" | Status>("all");

  const { allUsers } = useAllUsers();
  const createMap = createMapById(allUsers);

  const [viewAccount, setViewAccount] = useState<IAccount | null>(null);
  const [editAccount, setEditAccount] = useState<IAccount | null>(null);
  const [changeStatus, setChangeStatus] = useState<IAccount | null>(null);
  const [deposit, setDeposit] = useState<IAccount | null>(null);

  const filteredAccounts = useMemo(() => {
    return allAccounts.filter((account) => {
      const keyword = search.toLowerCase();

      const matchSearch =
        account.accName.toLowerCase().includes(keyword) ||
        account.accNumber.toLowerCase().includes(keyword);

      const matchStatus =
        statusFilter === "all" || account.status === statusFilter;

      return matchSearch && matchStatus;
    });
  }, [allAccounts, search, statusFilter]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-[calc(100vh-85px)]">
        <Loader />
      </div>
    );
  }

  return (
    <main className="space-y-4 pb-4">
      {/* Page heading */}
      <PagesTitle
        title="All Accounts"
        description="Manage ABF accounts and their information."
      />

      {/* Filters */}
      <section className="flex items-center gap-4">
        <Input
          type="text"
          placeholder="Search by account name or number..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="md:max-w-90"
        />

        <Select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value as "all" | Status)}
          className="md:max-w-50"
        >
          <Option value="all">All Statuses</Option>
          {accStatus.map((s) => (
            <Option key={s} value={s}>
              {s}
            </Option>
          ))}
        </Select>
      </section>

      <section className="border rounded-xl overflow-hidden">
        <table className="w-full table-fixed">
          <thead className="h-12 bg-primary">
            <tr>
              <th className="border-x w-1/18">#</th>
              <th className="border-x w-4/18">Account Name</th>
              <th className="border-x w-4/18">Account Number</th>
              <th className="border-x w-4/18">Owner&apos;s Username</th>
              <th className="border-x w-3/18">Status</th>
              <th className="border-x w-2/18">Action</th>
            </tr>
          </thead>
          <tbody className="text-sm">
            {filteredAccounts.map((account, i) => (
              <tr
                key={account._id}
                className="h-10 border-t text-center even:bg-muted-foreground/5"
              >
                <td className="px-2 border-x">{i + 1}</td>
                <td className="px-2 border-x text-start">{account.accName}</td>
                <td className="px-2 border-x text-start">
                  {account.accNumber}
                </td>
                <td className="px-2 border-x text-start">
                  {createMap[account.userId.toString()]?.username}
                </td>
                <td className="px-2 border-x">
                  <div
                    className={cn(
                      "w-full mx-auto flex items-center justify-center gap-1.5 px-2 py-1.5 rounded uppercase",
                      {
                        "text-green-400 bg-green-500/20":
                          account.status === "active",
                        "text-red-400 bg-destructive/20":
                          account.status === "inactive",
                        "text-yellow-400 bg-yellow-500/20":
                          account.status === "frozen",
                      },
                    )}
                  >
                    {account.status}
                  </div>
                </td>
                <td className="px-2 border-x">
                  <DropdownMenu>
                    <DropdownMenuTrigger className="cursor-pointer">
                      <EllipsisVertical />
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="min-w-36 p-1.5">
                      <DropdownMenuItem onClick={() => setViewAccount(account)}>
                        View Account
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => setEditAccount(account)}>
                        Edit Account
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={() => setChangeStatus(account)}
                      >
                        Change Status
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => setDeposit(account)}>
                        Deposit
                      </DropdownMenuItem>
                      <DropdownMenuItem disabled>
                        Delete Account
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      {/* ====== All action Dialog components here ====== */}
      <ViewAccount
        title="Account"
        open={!!viewAccount}
        onClose={() => setViewAccount(null)}
        account={viewAccount}
      />
      <EditAccount
        title="Account"
        open={!!editAccount}
        onClose={() => setEditAccount(null)}
        account={editAccount}
      />
      <ChangeStatus
        title="Account"
        open={!!changeStatus}
        onClose={() => setChangeStatus(null)}
        account={changeStatus}
      />
      <Deposit
        open={!!deposit}
        onClose={() => setDeposit(null)}
        account={deposit}
      />
    </main>
  );
};

export default Page;
