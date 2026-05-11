"use client";

import { useState } from "react";
import { AlertTriangleIcon } from "lucide-react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type Variant = "default" | "destructive";

type Props = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title: string;
  description?: React.ReactNode;
  confirmLabel?: string;
  cancelLabel?: string;
  variant?: Variant;
  /**
   * Called when the user confirms. May return a Promise — the dialog
   * stays open with a loading state until it resolves, then closes.
   * Throw to keep the dialog open (the parent is responsible for the
   * error toast in that case).
   */
  onConfirm: () => void | Promise<void>;
};

/**
 * Controlled confirmation dialog. Always provide `open` + `onOpenChange`
 * so the parent owns the lifecycle (testable, no imperative API).
 */
export const ConfirmDialog = ({
  open,
  onOpenChange,
  title,
  description,
  confirmLabel = "Confirmer",
  cancelLabel = "Annuler",
  variant = "default",
  onConfirm,
}: Props) => {
  const [pending, setPending] = useState(false);

  const handleConfirm = async () => {
    setPending(true);
    try {
      await onConfirm();
      onOpenChange(false);
    } finally {
      setPending(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <div className="flex items-start gap-3">
            {variant === "destructive" && (
              <div className="size-9 rounded-full bg-rust-soft text-rust flex items-center justify-center shrink-0">
                <AlertTriangleIcon className="size-5" />
              </div>
            )}
            <div className="flex-1">
              <DialogTitle className="font-serif text-[20px] tracking-[-0.01em]">
                {title}
              </DialogTitle>
              {description && (
                <DialogDescription className="mt-1 text-sm text-ink-soft leading-relaxed">
                  {description}
                </DialogDescription>
              )}
            </div>
          </div>
        </DialogHeader>
        <DialogFooter className="gap-2">
          <DialogClose
            render={
              <Button variant="outline" className="border-line bg-paper">
                {cancelLabel}
              </Button>
            }
          />
          <Button
            onClick={handleConfirm}
            disabled={pending}
            className={cn(
              variant === "destructive"
                ? "bg-rust text-white hover:bg-rust/90"
                : "bg-orange text-white hover:bg-orange/90",
            )}
          >
            {pending ? "…" : confirmLabel}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
