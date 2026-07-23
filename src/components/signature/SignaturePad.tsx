/**
 * -----------------------------------------------------------------------------
 * File: SignaturePad.tsx
 * Description:
 * Reusable signature component built with signature_pad.
 *
 * Features:
 * - Mouse & touch support
 * - High DPI rendering
 * - Responsive canvas
 * - Preserves signature on resize
 * - Returns PNG File
 * - Read-only support
 * -----------------------------------------------------------------------------
 */

import { useCallback, useEffect, useRef } from "react";

import SignaturePadLib from "signature_pad";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface SignaturePadProps {
  value?: File | null;
  onChange?: (file: File | null) => void;
  disabled?: boolean;
  height?: number;
}

export default function SignaturePad({
  value,
  onChange,
  disabled = false,
  height = 180,
}: SignaturePadProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const signatureRef = useRef<SignaturePadLib | null>(null);

  /**
   * Export current signature as PNG File.
   */
  const exportSignature = useCallback(() => {
    const canvas = canvasRef.current;
    const signature = signatureRef.current;

    if (!canvas || !signature) return;

    if (signature.isEmpty()) {
      onChange?.(null);
      return;
    }

    canvas.toBlob(
      (blob) => {
        if (!blob) {
          onChange?.(null);
          return;
        }

        const file = new File([blob], "signature.png", {
          type: "image/png",
          lastModified: Date.now(),
        });

        onChange?.(file);
      },
      "image/png",
      1,
    );
  }, [onChange]);

  /**
   * Resize canvas while preserving strokes.
   */
  const resizeCanvas = useCallback(() => {
    const canvas = canvasRef.current;
    const signature = signatureRef.current;

    if (!canvas || !signature) return;

    const data = signature.isEmpty() ? null : signature.toData();

    const ratio = Math.max(window.devicePixelRatio || 1, 1);

    canvas.width = canvas.offsetWidth * ratio;
    canvas.height = height * ratio;

    const context = canvas.getContext("2d");

    if (!context) return;

    context.scale(ratio, ratio);

    signature.clear();

    if (data) {
      signature.fromData(data);
    }
  }, [height]);

  /**
   * Load existing signature file.
   */
  useEffect(() => {
    const signature = signatureRef.current;

    if (!signature || !value) return;

    const reader = new FileReader();

    reader.onload = () => {
      if (typeof reader.result === "string") {
        signature.clear();
        signature.fromDataURL(reader.result);
      }
    };

    reader.readAsDataURL(value);
  }, [value]);

  /**
   * Initialize signature pad.
   */
  useEffect(() => {
    const canvas = canvasRef.current;

    if (!canvas) return;

    const signature = new SignaturePadLib(canvas, {
      minWidth: 0.8,
      maxWidth: 2.2,
      penColor: "#000000",
    });

    signatureRef.current = signature;

    signature.addEventListener("endStroke", () => {
      if (disabled) return;

      exportSignature();
    });

    resizeCanvas();

    window.addEventListener("resize", resizeCanvas);

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      signature.off();
    };
  }, [disabled, exportSignature, resizeCanvas]);

  /**
   * Clear signature.
   */
  const handleClear = () => {
    signatureRef.current?.clear();
    onChange?.(null);
  };

  return (
    <div className="space-y-3">
      <div
        className={cn(
          "overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm",
          disabled && "bg-slate-50",
        )}
      >
        <canvas
          ref={canvasRef}
          style={{ height }}
          className={cn(
            "block w-full touch-none bg-white",
            !disabled && "cursor-crosshair",
          )}
        />
      </div>

      {!disabled && (
        <div className="flex justify-end">
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={handleClear}
            className="w-full sm:w-auto"
          >
            Clear Signature
          </Button>
        </div>
      )}
    </div>
  );
}
