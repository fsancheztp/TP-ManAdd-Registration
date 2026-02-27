import * as React from "react";
import { cn } from "@/lib/utils";
import "@/css/04-components/badge.css";

export interface BadgeProps
  extends React.HTMLAttributes<HTMLSpanElement> {
  /** Visual variant */
  variant?: "solid" | "outline" | "danger" | "success" | "neutral";
  /** Size */
  size?: "sm" | "md";
}

function Badge({
  className,
  variant = "outline",
  size = "md",
  ...props
}: BadgeProps) {
  return (
    <span
      className={cn(
        "corp-badge",
        `corp-badge--${variant}`,
        `corp-badge--${size}`,
        className
      )}
      {...props}
    />
  );
}

export { Badge };