"use client";

import { FC, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useAccounts } from "@/providers/AccountContext";
import Loader from "@/components/ui/loader";
import Link from "next/link";
import PagesTitle from "@/app/_components/ui/PagesTitle";
import {
  ArrowRight,
  Banknote,
  BookOpen,
  CalendarDays,
  CheckCircle2,
  CreditCard,
  HandCoins,
  ShieldCheck,
  TrendingUp,
  ArrowLeftRight,
  UserRound,
  LucideProps,
  Check,
  Copy,
} from "lucide-react";

const formatDate = (date: string | Date | undefined) => {
  if (!date) return "N/A";

  const parsedDate = new Date(date);

  if (Number.isNaN(parsedDate.getTime())) return "N/A";

  return parsedDate.toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
};

const formatMoney = (amount: number) =>
  `৳ ${new Intl.NumberFormat("en-BD", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(amount)}`;

export default function Page() {
  const { activeAccount, loading } = useAccounts();
  const [copied, setCopied] = useState(false);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-[calc(100vh-85px)]">
        <Loader />
      </div>
    );
  }

  if (!activeAccount) {
    return (
      <div className="flex h-full items-center justify-center">
        <p>No active account found.</p>
      </div>
    );
  }

  const handleCopyAccountNumber = async () => {
    try {
      await navigator.clipboard.writeText(activeAccount.accNumber);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000); // Reset after 2 seconds
    } catch (err) {
      console.error("Failed to copy account number:", err);
    }
  };
  return (
    <div className="space-y-4 pb-4">
      {/* Page heading */}
      <PagesTitle
        title="My Account"
        description="Manage your ABF financial account and view your balance, deposits and profit."
      />

      {/* Main balance and two summary cards */}
      <section className="grid gap-5 xl:grid-cols-[1.25fr_1fr]">
        {/* Main balance card */}
        <Card className="relative overflow-hidden bg-linear-to-br from-emerald-950 via-emerald-900 to-emerald-700 shadow-md">
          {/* Add decorative background elements for the main balance card */}
          <div className="pointer-events-none absolute -right-16 -top-20 size-64 rounded-full border-40 border-white/5" />
          <div className="pointer-events-none absolute -bottom-24 right-20 size-56 rounded-full bg-emerald-300/10" />

          {/* Main balance card content */}
          <CardContent className="px-4 sm:px-6">
            <div className="flex flex-col-reverse md:flex-row items-start justify-between gap-4">
              <div className="flex items-center gap-4">
                <CreditCard className="size-11 p-2 rounded-xl border border-accent bg-white/10" />

                <div>
                  <h2 className="mt-1 text-xl font-semibold">
                    {activeAccount.accName}
                  </h2>
                  <p className="mt-1 text-xs text-muted-foreground sm:text-sm">
                    Account No. {activeAccount.accNumber}
                  </p>
                </div>
              </div>

              <span className="inline-flex self-end md:self-auto shrink-0 items-center gap-2 rounded-full border bg-emerald-400/15 px-3 py-1.5 text-xs font-medium text-muted-foreground">
                <span className="size-2 rounded-full bg-emerald-300" />
                {activeAccount.status}
              </span>
            </div>

            <div className="mt-4">
              <p className="text-sm text-muted-foreground">Current Balance</p>

              <p className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">
                {formatMoney(activeAccount.currentBalance)}
              </p>

              <p className="mt-3 flex items-center gap-2 text-xs text-muted-foreground sm:text-sm">
                <ShieldCheck className="size-4" />
                Your ABF account overview
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Only two summary cards */}
        <div className="grid gap-5 sm:grid-cols-2">
          <SummaryCard
            title="Total Deposit"
            amount={activeAccount.totalDeposit}
            description="Total deposited amount"
            icon={Banknote}
          />

          <SummaryCard
            title="Total Profit"
            amount={activeAccount.totalProfit}
            description="Total accumulated profit"
            icon={TrendingUp}
          />
        </div>
      </section>

      {/* Account information */}
      <Card className="shadow-sm">
        <CardHeader className="flex items-center gap-3 border-b">
          <HandCoins className="size-11 p-2 rounded-xl border border-accent bg-white/10" />

          <div>
            <CardTitle className="text-lg">Account Information</CardTitle>
            <p className="mt-1 text-sm text-muted-foreground">
              Basic details of your ABF account
            </p>
          </div>
        </CardHeader>

        <CardContent className="grid gap-x-10 px-3 md:py-2 sm:grid-cols-2 sm:px-6">
          <InfoItem
            icon={UserRound}
            label="Account Name"
            value={activeAccount.accName}
          />

          <InfoItem
            icon={CreditCard}
            label="Account Number"
            value={activeAccount.accNumber}
          >
            <Button
              type="button"
              variant="ghost"
              size="icon"
              className="size-8 shrink-0 text-muted-foreground hover:bg-emerald-50 hover:text-emerald-700"
              onClick={handleCopyAccountNumber}
              aria-label="Copy account number"
              title="Copy account number"
            >
              {copied ? (
                <Check className="size-4 text-emerald-600" />
              ) : (
                <Copy className="size-4" />
              )}
            </Button>
          </InfoItem>

          <InfoItem
            icon={CheckCircle2}
            label="Account Status"
            value={activeAccount.status}
          />

          <InfoItem
            icon={CalendarDays}
            label="Account Created"
            value={formatDate(activeAccount.createdAt)}
          />
        </CardContent>
      </Card>

      {/* Quick actions */}
      <section className="space-y-3">
        <div>
          <h2 className="text-lg font-semibold">Quick Actions</h2>
          <p className="text-sm text-muted-foreground">
            Access your account services quickly.
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <QuickAction
            href="/profile/transactions"
            title="Transactions"
            description="View deposits, withdrawals and transaction history."
            icon={ArrowLeftRight}
          />

          <QuickAction
            href="/profile/passbook"
            title="Passbook"
            description="Check monthly deposit records and account history."
            icon={BookOpen}
          />
        </div>
      </section>
    </div>
  );
}

type SummaryCardProps = {
  title: string;
  amount: number;
  description: string;
  icon: FC<LucideProps>;
};
const SummaryCard: FC<SummaryCardProps> = ({
  title,
  amount,
  description,
  icon: Icon,
}) => {
  return (
    <Card className="shadow-sm">
      <CardContent className="sm:gap-5 sm:p-6">
        <Icon className="size-10 p-1.5 rounded-xl bg-emerald-100 text-muted" />

        <div>
          <p className="text-sm font-medium text-muted-foreground">{title}</p>
          <p className="mt-1 text-xl font-bold tracking-tight">
            {formatMoney(amount)}
          </p>
          <p className="mt-1 sm:mt-3 text-xs text-muted-foreground">
            {description}
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

type InfoItemProps = {
  label: string;
  value: string;
  icon: FC<LucideProps>;
  children?: React.ReactNode;
};
const InfoItem: FC<InfoItemProps> = ({
  icon: Icon,
  label,
  value,
  children,
}) => {
  return (
    <div className="flex items-center gap-3 border-b py-4 last:border-b-0 sm:nth-last-2:border-b-0">
      <Icon className="size-9 rounded-full border p-1.5" />

      <div>
        <label htmlFor={label} className="text-xs text-muted-foreground">
          {label}
        </label>
        <p
          id={label}
          className="break-all font-semibold flex items-center gap-2"
        >
          {value} {children}
        </p>
      </div>
    </div>
  );
};

type QuickActionProps = {
  href: string;
  title: string;
  description: string;
  icon: FC<LucideProps>;
};
const QuickAction: FC<QuickActionProps> = ({
  href,
  title,
  description,
  icon: Icon,
}) => {
  return (
    <Link
      href={href}
      className={`group flex items-center justify-between gap-4 rounded-2xl border p-3 sm:p-5 transition-all hover:-translate-y-0.5 hover:shadow-md `}
    >
      <div className="flex items-start gap-4">
        <Icon className="size-8 hidden md:block" />

        <div>
          <h3 className="font-semibold">{title}</h3>
          <p className="max-w-sm text-sm leading-relaxed text-muted-foreground">
            {description}
          </p>
        </div>
      </div>

      <ArrowRight className="size-8 hover:translate-x-1 bg-muted p-1.5 rounded-full" />
    </Link>
  );
};
