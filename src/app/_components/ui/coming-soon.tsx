// src/components/common/coming-soon.tsx

import { Clock3, Construction } from "lucide-react";

interface ComingSoonProps {
  title?: string;
  description?: string;
}

export default function ComingSoon({
  title = "Coming Soon",
  description = "We're working hard to bring you this feature. Stay tuned!",
}: ComingSoonProps) {
  return (
    <div className="flex min-h-[70vh] flex-col items-center justify-center px-5 text-center">
      <div className="mb-6 flex size-20 items-center justify-center rounded-3xl bg-primary/10 text-primary">
        <Construction className="size-10" />
      </div>

      <span className="mb-4 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-4 py-2 text-sm text-primary">
        <Clock3 className="size-4" />
        Under Development
      </span>

      <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
        {title}
      </h1>

      <p className="mt-4 max-w-md text-sm leading-7 text-muted-foreground sm:text-base">
        {description}
      </p>
    </div>
  );
}