"use client";

import { FC, useState } from "react";
import { IAccount, Status } from "@/types";
import { accStatus } from "@/constants/account";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/toast";
import { Option, Select } from "@/app/_components/ui/Select";
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

interface ChangeStatusProps {
  account: IAccount | null;
  open: boolean;
  title: string;
  onClose: () => void;
}

const ChangeStatus: FC<ChangeStatusProps> = ({
  account,
  open,
  onClose,
  title,
}) => {
  const [newStatus, setNewStatus] = useState<Status | "">(
    account?.status ?? "",
  );

  if (!account) return null;

  const handleStatusChange = async () => {
    if (!newStatus || newStatus === account.status) return;

    try {
      const res = await fetch("/api/admin/accounts/status", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ accountId: account._id, newStatus }),
      });

      const data = await res.json();

      if (!res.ok) {
        console.error(data.message);
        toast.add({
          type: "error",
          description: data.message || "Something wrong",
        });
        return;
      }

      onClose();
      toast.add({
        type: "success",
        description: `Status updated to "${data.updatedAccountStatus.status}" successfully.`,
      });
    } catch (error) {
      console.error(error);
      toast.add({ type: "error", description: (error as Error).message });
    }
  };
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader className="border-b pb-2.5">
          <DialogTitle>Change {title} Status</DialogTitle>
          <DialogDescription className="text-xs">
            Update this user &apos;s role to manage their access and permissions
            within ABF.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-2">
          {/* Current Status */}
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">Current Status</span>

            <span
              className={cn(
                "inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs",
                { "bg-blue-500/20 text-blue-400": account.status === "active" },
                { "bg-red-500/20 text-red-400": account.status === "inactive" },
                {
                  "bg-yellow-500/20 text-yellow-400":
                    account.status === "frozen",
                },
              )}
            >
              {account.status.toUpperCase()}
            </span>
          </div>

          {/* Select New Status */}
          <div className="space-y-2">
            <label htmlFor="status" className="text-sm">
              Select New Status
            </label>
            <Select
              value={newStatus}
              onChange={(e) => setNewStatus(e.target.value as Status)}
            >
              <Option>Select Status</Option>
              {accStatus.map((s) => (
                <Option key={s} value={s}>
                  {s}
                </Option>
              ))}
            </Select>
          </div>
        </div>

        <DialogFooter>
          <DialogClose render={<Button variant="outline">Cancel</Button>} />
          <Button
            onClick={handleStatusChange}
            disabled={!newStatus || newStatus === account.status}
          >
            Update Status
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ChangeStatus;
