"use client";

import { FC, useState } from "react";
import { IUser, Role } from "@/types";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/toast";
import { role } from "@/constants/user";
import { Option, Select } from "@/app/_components/ui/Select";
import { Shield } from "lucide-react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface ChangeRoleProps {
  user: IUser | null;
  open: boolean;
  title: string;
  onClose: () => void;
}

const ChangeRole: FC<ChangeRoleProps> = ({ user, open, onClose, title }) => {
  const [newRole, setNewRole] = useState<Role | "">(user?.role ?? "");

  if (!user) return null;

  const handleRoleUpdate = async () => {
    if (!newRole || newRole === user.role) return;

    try {
      const res = await fetch("/api/admin/users/role", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId: user._id, newRole }),
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
        description: `Role updated to "${data.updatedUser.role}" successfully.`,
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
          <DialogTitle>Change {title} Role</DialogTitle>
          <DialogDescription className="text-xs">
            Update this user &apos;s role to manage their access and permissions
            within ABF.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-2">
          {/* Current Role */}
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">Current Role</span>

            <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full bg-blue-500/20 text-blue-400 text-xs">
              <Shield className="size-3" />
              {user.role.toUpperCase()}
            </span>
          </div>

          {/* Select New Role */}
          <div className="space-y-2">
            <label htmlFor="role" className="text-sm">
              Select New Role
            </label>
            <Select
              value={newRole}
              onChange={(e) => setNewRole(e.target.value as Role)}
            >
              <Option>Select Role</Option>
              {role.map((r) => (
                <Option key={r} value={r}>
                  {r}
                </Option>
              ))}
            </Select>
          </div>
        </div>

        <DialogFooter>
          <DialogClose render={<Button variant="outline">Cancel</Button>} />
          <Button
            onClick={handleRoleUpdate}
            disabled={!newRole || newRole === user.role}
          >
            Update Role
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ChangeRole;
