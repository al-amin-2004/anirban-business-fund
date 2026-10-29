import { FC } from "react";
import { Button } from "@/components/ui/button";
import { IUser } from "@/types";
import { cn } from "cn";
import Image from "next/image";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface ViewProfileProps {
  user: IUser | null;
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

const ViewProfile: FC<ViewProfileProps> = ({ user, open, onClose, title }) => {
  if (!user) return null;
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="min-w-2xl">
        <DialogHeader className="border-b pb-2.5">
          <DialogTitle>{title} Profile</DialogTitle>
          <DialogDescription>
            View personal information and account details.
          </DialogDescription>
        </DialogHeader>

        <div>
          {user.avatar && (
            <HoverCard>
              <HoverCardTrigger
                delay={10}
                closeDelay={500}
                render={
                  <Image
                    src={user.avatar}
                    width={200}
                    height={200}
                    className="size-15 rounded-full cursor-pointer"
                    alt="Profile Picture"
                  />
                }
              />

              <HoverCardContent side="right" className="z-90">
                <Image
                  src={user.avatar}
                  width={500}
                  height={500}
                  className="min-size-100"
                  alt="Profile Picture"
                />
              </HoverCardContent>
            </HoverCard>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
          <div className="space-y-1">
            <DialogInfoRow label="Name" value={user.fullName} />
            <DialogInfoRow label="Username" value={user.username} />
            <DialogInfoRow label="Email" value={user.email} />
            <DialogInfoRow label="Number" value={user.number} />
          </div>
          <div className="space-y-1">
            <DialogInfoRow
              label="Birthday"
              value={dateView(user.dateOfBirth)}
            />
            <DialogInfoRow label="Gender" value={user.gender} />
            <DialogInfoRow label="Gender" value={user.blood} />
            <DialogInfoRow label="Nationality" value={user.nationality} />
            <DialogInfoRow label="Role" value={user.role} />
          </div>
          <DialogInfoRow
            label="Address"
            value={user.address ? user.address : "N/A"}
          />
        </div>

        <DialogFooter>
          <DialogClose render={<Button onClick={onClose}>Close</Button>} />
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ViewProfile;

interface DialogInfoRowProps {
  label: string;
  value: string;
  className?: string;
}

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
