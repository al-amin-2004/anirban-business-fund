"use client";

import { useEffect, useMemo, useState } from "react";
import { useAccounts } from "@/providers/AccountContext";
import { ITransaction, RequestTypes } from "@/types";
import { CalendarFold, LayoutGrid, List } from "lucide-react";
import { Option, Select } from "@/app/_components/ui/Select";
import { requestTypes } from "@/constants/account";
import { cn } from "cn";
import PagesTitle from "@/app/_components/ui/PagesTitle";
import Input from "@/app/_components/ui/Input";

const Page = () => {
  const { activeAccount } = useAccounts();
  const [isGrid, setIsGrid] = useState<boolean>(true);
  const [transactions, setTransactions] = useState<ITransaction[]>([]);

  const [requestType, setRequestType] = useState<"all" | RequestTypes>("all");
  const [filterDate, setFilterDate] = useState<"all" | Date>("all");

  useEffect(() => {
    const activeAccId = activeAccount?._id;

    if (!activeAccId) return;

    const fetchTransactions = async () => {
      try {
        const res = await fetch(
          `/api/transactions/me?accountId=${activeAccId}`,
        );
        const data = await res.json();

        if (data.success) setTransactions(data.transactions);
      } catch (error) {
        console.error("Api error", error);
      }
    };

    fetchTransactions();
  }, [activeAccount]);

  const filteredTransactions = useMemo(() => {
    return transactions.filter((transaction) => {
      const matchRequestType =
        requestType === "all" || transaction.transactionType === requestType;

      const matchFilterDate =
        filterDate === "all" ||
        new Date(transaction.transactionDate).toLocaleString("en-US", {
          dateStyle: "medium",
        }) === filterDate.toLocaleString("en-US", { dateStyle: "medium" });

      return matchRequestType && matchFilterDate;
    });
  }, [transactions, requestType, filterDate]);

  return (
    <div className="space-y-4 pb-4">
      {/* Page heading */}
      <PagesTitle
        title="Transactions"
        description="Showing your all transactions with a clear view."
      />

      <div className="hidden lg:flex items-center justify-end gap-2.5">
        <LayoutGrid
          size={34}
          className={`cursor-pointer p-1.5 border rounded-md ${
            isGrid && "bg-muted-foreground/10"
          }`}
          onClick={() => setIsGrid(true)}
        />
        <List
          size={34}
          className={`cursor-pointer p-1.5 border rounded-md ${
            !isGrid && "bg-muted-foreground/10"
          }`}
          onClick={() => setIsGrid(false)}
        />

        {"/"}

        <Select
          className="w-auto"
          value={requestType}
          onChange={(e) =>
            setRequestType(e.target.value as "all" | RequestTypes)
          }
        >
          <Option value="all">All Types</Option>
          {requestTypes.map((option) => (
            <Option key={option} value={option}>
              {option}
            </Option>
          ))}
        </Select>

        {"/"}

        <Input
          id="filterDate"
          type="date"
          onChange={(e) => setFilterDate(new Date(e.target.value))}
          className="w-auto"
        />
      </div>

      <section
        className={cn("border rounded-xl overflow-hidden", {
          "md:p-4 border-0 md:border grid grid-cols-1 sm:grid-cols-2 md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 xxl:grid-cols-4 gap-3":
            isGrid,
        })}
      >
        {isGrid ? (
          filteredTransactions.map((transaction) => (
            <div
              key={transaction._id}
              className="relative w-full rounded-lg p-4 min-w-68 bg-muted-foreground/10"
            >
              <h2 className="text-5xl font-bold capitalize absolute left-1/2 top-1/2 -translate-1/2 opacity-10 text-muted-foreground">
                {transaction.transactionType}
              </h2>

              <div className="flex items-center justify-end gap-1.5 -mt-2 -mr-2 mb-3">
                <CalendarFold size={16} />
                <p className="text-xs">
                  {new Date(transaction.transactionDate).toLocaleDateString(
                    "en-GB",
                  )}
                </p>
              </div>

              <div className="text-sm">
                <div className="flex justify-between mb-1">
                  <p>Amount: {transaction.amount}</p>
                  <p>
                    Month:{" "}
                    {transaction.month &&
                      new Date(transaction.month).toLocaleDateString("en-GB", {
                        month: "short",
                        year: "numeric",
                      })}
                  </p>
                </div>
                <div className="flex justify-between mb-1">
                  <p className="capitalize">Method: {transaction.method}</p>
                  <p>New Balance: {transaction.newBalance}</p>
                </div>
              </div>
            </div>
          ))
        ) : (
          <table className="w-full table-fixed">
            <thead className="h-12 bg-primary">
              <tr>
                <th className="border-x w-2/12">Transaction Type</th>
                <th className="border-x w-2/12">Month</th>
                <th className="border-x w-2/12">Date</th>
                <th className="border-x w-2/12">Method</th>
                <th className="border-x w-2/12">Amount</th>
                <th className="border-x w-2/12">New Balance</th>
              </tr>
            </thead>
            <tbody className="text-sm">
              {filteredTransactions.map((transaction) => (
                <tr
                  key={transaction._id}
                  className="h-10 border-t text-center even:bg-muted-foreground/5"
                >
                  <td className="px-2 border-x uppercase">
                    {transaction.transactionType}
                  </td>
                  <td className="px-2 border-x">
                    {transaction.month
                      ? new Date(transaction.month).toLocaleDateString(
                          "en-GB",
                          {
                            month: "long",
                            year: "numeric",
                          },
                        )
                      : "—"}
                  </td>
                  <td className="px-2 border-x">
                    {new Date(transaction.transactionDate).toLocaleDateString(
                      "en-GB",
                      {
                        day: "2-digit",
                        month: "long",
                        year: "numeric",
                      },
                    )}
                  </td>
                  <td className="px-2 border-x uppercase">
                    {transaction.method}
                  </td>
                  <td className="px-2 border-x">{transaction.amount}</td>
                  <td className="px-2 border-x">{transaction.newBalance}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </section>
    </div>
  );
};

export default Page;
