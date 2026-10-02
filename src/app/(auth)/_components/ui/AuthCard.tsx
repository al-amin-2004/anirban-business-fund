import { ComponentProps } from "react";
import { cn } from "cn";
import style from "@/styles/registrationForm.module.css";

function AuthCard({ className, ...props }: ComponentProps<"div">) {
  return (
    <div
      data-slot="auth-card"
      className={cn(
        "w-full max-w-md rounded-2xl md:border border-border p-2 md:p-8",
        style.FormCard,
        className,
      )}
      {...props}
    />
  );
}

function AuthHeader({ className, ...props }: ComponentProps<"div">) {
  return (
    <div
      data-slot="auth-header"
      className={cn("text-center mb-7", className)}
      {...props}
    />
  );
}

function AuthTitle({ className, ...props }: ComponentProps<"h1">) {
  return (
    <h1
      data-slot="auth-title"
      className={cn("font-semibold text-2xl tracking-tight md:text-3xl", className)}
      {...props}
    />
  );
}

function AuthDescription({ className, ...props }: ComponentProps<"p">) {
  return (
    <p
      data-slot="auth-description"
      className={cn(
        "mt-2 text-sm sm:leading-5 text-muted-foreground",
        className,
      )}
      {...props}
    />
  );
}

function AuthFooter({ className, children, ...props }: ComponentProps<"div">) {
  return (
    <div
      data-slot="auth-footer"
      className={cn("mt-6 text-center", className)}
      {...props}
    >
      {children}
    </div>
  );
}

export { AuthCard, AuthHeader, AuthTitle, AuthDescription, AuthFooter };
