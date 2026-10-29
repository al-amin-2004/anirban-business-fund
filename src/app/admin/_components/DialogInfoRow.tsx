import { cn } from "cn";
import { FC } from "react";

type DialogInfoRowProps = {
  label: string;
  value: string;
  className?: string;
};
export const DialogInfoRow: FC<DialogInfoRowProps> = ({
  label,
  value,
  className,
}) => {
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
