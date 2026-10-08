import { cn } from "@/lib/utils";
import { ComponentProps } from "react";

function Input({ type, className, ...props }: ComponentProps<"input">) {
  return (
    <input
      type={type}
      data-slot="input"
      className={cn(
        "w-full py-2 px-3 border border-gray-700 rounded-sm md:rounded-md text-sm text-foreground placeholder:text-muted-foreground outline-none focus:ring md:focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-200",
        className,
      )}
      {...props}
    />
  );
}

export default Input;
