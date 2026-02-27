"use client";

import * as React from "react";
import * as ProgressPrimitive from "@radix-ui/react-progress";
import { cn } from "@/lib/utils";
import "@/css/04-components/progress.css"; // NEW corporate style

const Progress = React.forwardRef<
  React.ElementRef<typeof ProgressPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof ProgressPrimitive.Root>
>(({ className, value = 0, ...props }, ref) => {
  const clamped = Math.max(0, Math.min(100,  value ?? 0));

  return (
    <ProgressPrimitive.Root
      ref={ref}
      className={cn("corp-progress-root", className)}
      {...props}
    >
      <ProgressPrimitive.Indicator
        className="corp-progress-indicator"
        style={{ transform: `translateX(-${100 - clamped}%)` }}
      />
    </ProgressPrimitive.Root>
  );
});

Progress.displayName = ProgressPrimitive.Root.displayName;
export { Progress };
