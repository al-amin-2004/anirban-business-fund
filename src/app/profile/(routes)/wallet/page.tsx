"use client";

import { useEffect, useState } from "react";
import { useAccounts } from "@/providers/AccountContext";
import { formatCurrency } from "@/helpers/formatCurrency";
import { Separator } from "@/components/ui/separator";
import { IRequest } from "@/types";
import { cn } from "cn";
import PagesTitle from "@/app/_components/ui/PagesTitle";
import Loader from "@/components/ui/loader";
import Link from "next/link";
import {
  Wallet,
  Plus,
  ArrowUp,
  ArrowLeftRight,
  ArrowRight,
  Clock3,
  ShieldCheck,
  CircleArrowDown,
  CircleArrowUp,
  Send,
  CalendarDays,
} from "lucide-react";

const Page = () => {
  const { activeAccount, loading } = useAccounts();
  const [pendingReq, setPendingReq] = useState<IRequest[]>([]);

  useEffect(() => {
    const accountId = activeAccount?._id;
    if (!accountId || loading) return;

    const fetchHistories = async () => {
      try {
        const params = new URLSearchParams({
          accountId,
          status: "pending",
        });

        const res = await fetch(`/api/requests/me?${params.toString()}`);
        const data = await res.json();

        if (!res.ok) {
          console.error(data.message);
        }

        setPendingReq(data.requests);
      } catch (error) {
        console.error("Api error", error);
      }
    };
    fetchHistories();
  }, [activeAccount, loading]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-[calc(100vh-85px)]">
        <Loader />
      </div>
    );
  }

  return (
    <div className="space-y-4 pb-4">
      {/* Page heading */}
      <PagesTitle
        title="My Wallet"
        description="Manage your wallet, view balance, and track transactions."
      />

      {/* Balance Card */}
      <section className="relative overflow-hidden rounded-2xl bg-linear-to-br from-[#063D2B] via-[#075638] to-[#087447] p-5 shadow-lg shadow-emerald-950/10 sm:p-7 lg:p-8">
        {/* Decoration */}
        <Wallet
          size={160}
          className="absolute -right-4 top-0 rotate-[-25deg] text-white/[0.07] sm:right-8 sm:top-2"
        />

        <div className="relative z-10">
          <p className="text-sm font-medium text-emerald-100/80 sm:text-base">
            Available Balance
          </p>

          <h3 className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
            {formatCurrency(activeAccount?.currentBalance || 0)}
          </h3>

          <Separator className="my-4 border-emerald-100/20" />
        </div>
      </section>

      {/* Wallet Actions */}
      <section className="grid grid-cols-1 gap-3 sm:grid-cols-3 sm:gap-4">
        {/* Deposit */}
        <Link
          href="/profile/wallet/deposit"
          className="group relative flex items-center gap-4 rounded-2xl border bg-card p-4 shadow-sm transition hover:-translate-y-1 hover:border-emerald-200 hover:shadow-md sm:flex-col sm:items-start sm:p-5"
        >
          <div className="flex size-12 shrink-0 items-center justify-center rounded-full bg-[#087447] shadow-md shadow-emerald-900/10 transition group-hover:scale-105">
            <Plus size={27} />
          </div>

          <div className="min-w-0 flex-1 sm:w-full">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <h3 className="font-bold">Deposit</h3>
            </div>
            <p className="mt-1 text-sm text-muted-foreground">Add money</p>
          </div>

          <ArrowRight
            size={19}
            className="text-emerald-700 sm:absolute sm:bottom-5 sm:right-5"
          />
        </Link>

        {/* Withdraw */}
        <div className="group relative flex items-center gap-4 rounded-2xl border bg-card p-4 shadow-sm transition duration-200 hover:-translate-y-1 hover:border-blue-200 hover:shadow-md sm:flex-col sm:items-start sm:p-5 cursor-not-allowed">
          <div className="flex size-12 shrink-0 items-center justify-center rounded-full bg-[#176C72] shadow-md shadow-teal-900/10 transition group-hover:scale-105">
            <ArrowUp size={25} />
          </div>

          <div className="min-w-0 flex-1 sm:w-full">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <h3 className="font-bold">Withdraw</h3>
            </div>
            <p className="mt-1 text-sm text-muted-foreground">Request fund</p>
          </div>

          <ArrowRight
            size={19}
            className="text-emerald-700 sm:absolute sm:bottom-5 sm:right-5"
          />
        </div>

        {/* Transfer */}
        <div className="group relative flex items-center gap-4 rounded-2xl border bg-card p-4 shadow-sm transition duration-200 hover:-translate-y-1 hover:border-violet-200 hover:shadow-md sm:flex-col sm:items-start sm:p-5 cursor-not-allowed">
          <div className="flex size-12 shrink-0 items-center justify-center rounded-full bg-[#087447] shadow-md shadow-emerald-900/10 transition group-hover:scale-105">
            <ArrowLeftRight size={25} />
          </div>

          <div className="min-w-0 flex-1 sm:w-full">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <h3 className="font-bold">Transfer</h3>
            </div>
            <p className="mt-1 text-sm text-muted-foreground">Send money</p>
          </div>

          <ArrowRight
            size={19}
            className="text-emerald-700 sm:absolute sm:bottom-5 sm:right-5"
          />
        </div>
      </section>

      {/* Pending Requests */}
      <section className="overflow-hidden rounded-2xl border bg-card shadow-sm">
        <div className="flex items-center gap-3 border-b p-4 sm:p-6">
          <Clock3 className="size-10 p-2.5 rounded-full bg-emerald-50 text-emerald-700" />

          <div>
            <h3 className="font-bold sm:text-lg">Pending Requests</h3>
            <p className="mt-0.5 text-xs text-muted-foreground sm:text-sm">
              Your requests are waiting for review.
            </p>
          </div>
        </div>

        {/* Requests */}
        {pendingReq.length <= 0 ? (
          <div className="p-2.5 text-center text-sm text-muted-foreground">
            No Request yet
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-4 p-4 sm:grid-cols-2 sm:p-6 xl:grid-cols-3">
            {pendingReq.map((request) => (
              <div
                key={request._id}
                className="group rounded-2xl border bg-card p-5 shadow-sm transition-all duration-200 hover:-translate-y-1 hover:border-emerald-500/40 hover:shadow-md"
              >
                {/* Header */}
                <div className="flex items-center justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <div
                      className={cn(
                        "flex size-11 shrink-0 items-center justify-center rounded-xl",
                        {
                          "bg-emerald-500/10 text-emerald-600":
                            request.requestType === "deposit",
                          "bg-blue-500/10 text-blue-600":
                            request.requestType === "withdraw",
                          "bg-violet-500/10 text-violet-600":
                            request.requestType === "transfer",
                        },
                      )}
                    >
                      {request.requestType === "deposit" && (
                        <CircleArrowDown size={21} />
                      )}
                      {request.requestType === "withdraw" && (
                        <CircleArrowUp size={21} />
                      )}
                      {request.requestType === "transfer" && <Send size={21} />}
                    </div>

                    <div>
                      <p className="text-sm font-semibold capitalize">
                        {request.requestType} Request
                      </p>
                      <p className="mt-0.5 text-xs text-muted-foreground">
                        #{request._id?.slice(-8)}
                      </p>
                    </div>
                  </div>

                  <span className="rounded-full bg-amber-500/10 px-3 py-1 text-xs font-medium text-amber-600">
                    Pending
                  </span>
                </div>

                {/* Amount */}
                <div className="mt-5 rounded-xl bg-muted/50 p-4">
                  <p className="text-xs font-medium text-muted-foreground">
                    Requested Amount
                  </p>
                  <p className="mt-1 text-2xl font-bold tracking-tight">
                    {formatCurrency(request.amount)}
                  </p>
                </div>

                {/* Details */}
                <div className="mt-4 space-y-3">
                  <div className="flex items-center justify-between gap-3 text-sm">
                    <span className="text-muted-foreground">Month</span>
                    <span className="font-medium">{request.month || "—"}</span>
                  </div>

                  <div className="flex items-center justify-between gap-3 text-sm">
                    <span className="text-muted-foreground">
                      Payment Method
                    </span>
                    <span className="font-medium capitalize">
                      {request.method || "—"}
                    </span>
                  </div>

                  <div className="flex items-center justify-between gap-3 text-sm">
                    <span className="text-muted-foreground">
                      Transaction ID
                    </span>
                    <span className="max-w-[60%] truncate font-medium">
                      {request.transactionId || "—"}
                    </span>
                  </div>
                </div>

                {/* Footer */}
                <div className="mt-5 flex items-center gap-2 border-t pt-4 text-xs text-muted-foreground">
                  <CalendarDays size={14} />
                  <span>
                    Submitted{" "}
                    {new Date(request.createdAt).toLocaleDateString("en-GB", {
                      day: "2-digit",
                      month: "short",
                      year: "numeric",
                    })}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Security Notice */}
      <div className="flex items-center gap-3 overflow-hidden rounded-xl border border-emerald-100 p-4">
        <div className="flex size-10 shrink-0 items-center justify-center rounded-full bg-emerald-100 text-emerald-500">
          <ShieldCheck size={23} />
        </div>

        <div>
          <p className="text-sm font-semibold">Your wallet is secure</p>
          <p className="mt-0.5 text-xs text-muted-foreground">
            Your financial activities are managed and monitored by ABF.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Page;
