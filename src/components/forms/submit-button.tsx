"use client";

import { useFormContext } from "react-hook-form";
import { Loader2Icon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type Props = React.ComponentProps<typeof Button> & {
  loadingLabel?: string;
};

/**
 * Submit button bound to the surrounding RHF form — disables itself
 * while submitting and renders an optional loading label.
 */
export const SubmitButton = ({
  children,
  loadingLabel,
  disabled,
  className,
  ...props
}: Props) => {
  const {
    formState: { isSubmitting },
  } = useFormContext();

  return (
    <Button
      type="submit"
      disabled={disabled || isSubmitting}
      className={cn(className)}
      {...props}
    >
      {isSubmitting && <Loader2Icon className="size-4 animate-spin" />}
      {isSubmitting ? (loadingLabel ?? children) : children}
    </Button>
  );
};
