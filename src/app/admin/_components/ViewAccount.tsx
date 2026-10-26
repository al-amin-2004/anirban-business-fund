import { FC } from "react";
import { IAccount } from "@/types";
import { createMapById } from "@/helpers/createMapById";
import { useAllUsers } from "@/providers/AllUsersContext";
import { Button } from "@/components/ui/button";
import { cn } from "cn";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface ViewAccountProps {
  account: IAccount | null;
  open: boolean;
  title: string;
  onClose: () => void;
}

const dateView = (date: Date | undefined): string => {
  return date
    ? new Date(date).toLocaleDateString("en-BD", {
        day: "2-digit",
        month: "long",
        year: "numeric",
      })
    : "N/A";
};

const ViewAccount: FC<ViewAccountProps> = ({
  account,
  open,
  onClose,
  title,
}) => {
  const { allUsers } = useAllUsers();
  const createMap = createMapById(allUsers);

  if (!account) return null;

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="min-w-2xl">
        <DialogHeader className="border-b pb-2.5">
          <DialogTitle>{title} Profile</DialogTitle>
          <DialogDescription>
            View personal information and account details.
          </DialogDescription>
        </DialogHeader>

        {/* Status */}
        <div className="flex items-center justify-between text-sm">
          <span className="text-muted-foreground">Status:</span>
          <span
            className={cn(
              "inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs",
              { "bg-green-500/20 text-green-400": account.status === "active" },
              {
                "bg-red-500/20 text-destructive": account.status === "inactive",
              },
              {
                "bg-yellow-500/20 text-yellow-400": account.status === "frozen",
              },
            )}
          >
            {account.status.toUpperCase()}
          </span>
        </div>

        {/* ===== STATS ===== */}
        <div className="grid grid-cols-3 gap-3">
          <StatBox label="Deposit" value={`৳ ${account.totalDeposit}`} />
          <StatBox label="Profit" value={`৳ ${account.totalProfit}`} />
          <StatBox label="Balance" value={`৳ ${account.currentBalance}`} />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
          <DialogInfoRow
            label="Owner Name"
            value={createMap[account.userId.toString()].username}
          />
          <DialogInfoRow
            label="Owner Email"
            value={createMap[account.userId.toString()].email}
          />
          <DialogInfoRow label="Account Name" value={account.accName} />
          <DialogInfoRow label="Account Number" value={account.accNumber} />
          <DialogInfoRow
            label="Birth ID"
            value={account.identification.birthId ?? "N/A"}
          />
          <DialogInfoRow
            label="National ID"
            value={account.identification.nid ?? "N/A"}
          />
          <DialogInfoRow
            label="Date of Birth"
            value={dateView(account.identification.dateOfBirth)}
          />
          <DialogInfoRow
            label="Join Date"
            value={dateView(account.createdAt)}
          />
        </div>

        <DialogFooter>
          <DialogClose render={<Button onClick={onClose}>Close</Button>} />
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ViewAccount;

type DialogInfoRowProps = {
  label: string;
  value: string;
  className?: string;
};
const DialogInfoRow: FC<DialogInfoRowProps> = ({ label, value, className }) => {
  return (
    <div className={cn("flex gap-1.5", className)}>
      <label htmlFor={label} className="text-muted-foreground">
        {label}:
      </label>
      <span id={label} className="font-medium text-right">
        {value}
      </span>
    </div>
  );
};

type StatProps = {
  label: string;
  value: string;
};
const StatBox: FC<StatProps> = ({ label, value }) => (
  <div className={cn("p-3 rounded-lg text-center border")}>
    <p className="text-xs text-muted-foreground">{label}</p>
    <p className="text-lg font-semibold">{value}</p>
  </div>
);
