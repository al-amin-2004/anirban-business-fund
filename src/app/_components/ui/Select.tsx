import { ComponentProps } from "react";
import { cn } from "@/lib/utils";

function Select({ className, children, ...props }: ComponentProps<"select">) {
  return (
    <select
      data-slot="select"
      className={cn(
        "w-full appearance-none py-2 px-3 border border-gray-700 rounded-sm md:rounded-md text-sm text-foreground capitalize outline-none focus:ring md:focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-200 cursor-pointer",
        className,
      )}
      {...props}
    >
      {children}
    </select>
  );
}

function Option({ className, ...props }: ComponentProps<"option">) {
  return (
    <option
      data-slot="option"
      className={cn("capitalize bg-background", className)}
      {...props}
    />
  );
}

export { Select, Option };
