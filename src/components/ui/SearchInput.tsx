/**
 * -----------------------------------------------------------------------------
 * File: SearchInput.tsx
 * Description:
 * Reusable search input used across the application.
 *
 * Responsibilities:
 * - Consistent search styling
 * - Optional loading state
 * - Optional clear action (future)
 * -----------------------------------------------------------------------------
 */

import { Search } from "lucide-react";

import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

interface SearchInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  containerClassName?: string;
}

export default function SearchInput({
  className,
  containerClassName,
  placeholder = "Search...",
  ...props
}: SearchInputProps) {
  return (
    <div className={cn("relative w-full max-w-md", containerClassName)}>
      <Search
        className="
          pointer-events-none
          absolute
          left-3
          top-1/2
          h-4
          w-4
          -translate-y-1/2
          text-slate-400
        "
      />

      <Input
        placeholder={placeholder}
        className={cn(
          "h-11 rounded-xl border-slate-200 bg-white pl-10 shadow-sm",
          "focus-visible:ring-2 focus-visible:ring-blue-500",
          className,
        )}
        {...props}
      />
    </div>
  );
}
