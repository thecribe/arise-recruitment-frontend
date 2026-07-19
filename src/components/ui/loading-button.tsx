import { Button } from "@/components/ui/button";
import { ArrowRight, Loader2 } from "lucide-react";
import type { ButtonHTMLAttributes } from "react";

interface LoadingButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  loading?: boolean;

  loadingText?: string;
}

export function LoadingButton({
  loading = false,
  loadingText = "Loading...",
  children,
  disabled,
  ...props
}: LoadingButtonProps) {
  return (
    <Button
      fullWidth
      rightIcon={<ArrowRight />}
      disabled={loading || disabled}
      {...props}
    >
      {loading && (
        <Loader2
          className="
            mr-2
            h-4
            w-4
            animate-spin
            "
        />
      )}

      {loading ? loadingText : children}
    </Button>
  );
}
