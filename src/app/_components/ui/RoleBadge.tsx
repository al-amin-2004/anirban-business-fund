import { FC } from "react";
import { cn } from "cn";
import { Coins, Shield, User, UserStar } from "lucide-react";

interface IRoleBadge {
  role: string;
  classname?: string;
}
export const RoleBadge: FC<IRoleBadge> = ({ role, classname }) => {
  return (
    <div
      className={cn(
        "w-full mx-auto flex items-center justify-center gap-1.5 px-2 py-1.5 rounded uppercase text-foreground bg-foreground/15",
        { "text-destructive bg-destructive/20": role === "admin" },
        { "text-accent bg-accent/20": role === "treasurer" },
        { "text-blue-500 bg-blue-500/20": role === "member" },
        classname,
      )}
    >
      {role === "admin" && <Shield className="size-4.5" />}
      {role === "treasurer" && <Coins className="size-4.5" />}
      {role === "member" && <UserStar className="size-4.5" />}
      {role === "user" && <User className="size-4.5" />}
      {role}
    </div>
  );
};
