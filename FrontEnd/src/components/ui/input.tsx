import * as React from "react";
import { cn } from "@/lib/utils";
import "@/css/04-components/input.css"; // corporate input styles

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        ref={ref}
        {...props}
        className={cn("corp-input", className)}
      />
    );
  }
);

Input.displayName = "Input";

export { Input };