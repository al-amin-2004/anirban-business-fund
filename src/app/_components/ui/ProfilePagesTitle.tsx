import { cn } from "@/lib/utils";
import { FC, ReactNode } from "react";

type ProfilePagesTitleProps = {
  title: string;
  description?: string;
  className?: string;
  children?: ReactNode;
};

const ProfilePagesTitle: FC<ProfilePagesTitleProps> = ({
  title,
  description,
  className,
  children,
}) => {
  return (
    <div
      className={cn(
        "text-3xl md:text-4xl py-2.5 md:py-3.5 border-b-2 border-dashed flex flex-col md:flex-row justify-between md:items-center",
        className,
      )}
    >
      <div>
        <h1 className="font-bold mb-2.5 ps-3.5 relative before:absolute before:content-[''] before:w-1.5 before:h-10/12 before:top-1 before:left-0 before:bg-primary before:rounded-full">
          {title}
        </h1>
        <p className="text-sm text-muted-foreground">{description}</p>
      </div>
      <div>{children}</div>
    </div>
  );
};

export default ProfilePagesTitle;
