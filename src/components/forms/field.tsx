"use client";

import { useFormContext } from "react-hook-form";
import type {
  FieldPath,
  FieldValues,
  RegisterOptions,
} from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

/* ------------------------------------------------------------------ */
/* FieldShell — label + control slot + error/hint                      */
/* ------------------------------------------------------------------ */

type FieldShellProps = {
  id?: string;
  label?: React.ReactNode;
  hint?: React.ReactNode;
  error?: string;
  /** Action rendered next to the label (e.g. "Forgot password?"). */
  labelAction?: React.ReactNode;
  children: React.ReactNode;
  className?: string;
};

export const FieldShell = ({
  id,
  label,
  hint,
  error,
  labelAction,
  children,
  className,
}: FieldShellProps) => (
  <div className={cn("flex flex-col gap-2", className)}>
    {(label || labelAction) && (
      <div className="flex items-center justify-between">
        {label && (
          <Label
            htmlFor={id}
            className="font-mono text-[11px] uppercase tracking-[0.05em] text-ink-faint"
          >
            {label}
          </Label>
        )}
        {labelAction}
      </div>
    )}
    {children}
    {error ? (
      <p className="text-xs text-rust font-medium">{error}</p>
    ) : hint ? (
      <p className="text-xs text-ink-faint">{hint}</p>
    ) : null}
  </div>
);

/* ------------------------------------------------------------------ */
/* TextField — generic input bound to RHF                              */
/* ------------------------------------------------------------------ */

type TextFieldProps<TForm extends FieldValues> = {
  name: FieldPath<TForm>;
  label?: React.ReactNode;
  hint?: React.ReactNode;
  labelAction?: React.ReactNode;
  type?: "text" | "email" | "password" | "url" | "tel" | "search";
  placeholder?: string;
  autoComplete?: string;
  disabled?: boolean;
  required?: boolean;
  className?: string;
  inputClassName?: string;
  registerOptions?: RegisterOptions<TForm, FieldPath<TForm>>;
};

export const TextField = <TForm extends FieldValues>({
  name,
  label,
  hint,
  labelAction,
  type = "text",
  placeholder,
  autoComplete,
  disabled,
  required,
  className,
  inputClassName,
  registerOptions,
}: TextFieldProps<TForm>) => {
  const {
    register,
    formState: { errors },
  } = useFormContext<TForm>();

  const error = errors[name];
  const errorMessage =
    typeof error?.message === "string" ? error.message : undefined;

  return (
    <FieldShell
      id={name}
      label={label}
      hint={hint}
      error={errorMessage}
      labelAction={labelAction}
      className={className}
    >
      <Input
        id={name}
        type={type}
        placeholder={placeholder}
        autoComplete={autoComplete}
        disabled={disabled}
        required={required}
        aria-invalid={Boolean(errorMessage)}
        className={cn(
          "h-11 bg-paper border-line",
          errorMessage && "border-rust focus-visible:border-rust",
          inputClassName,
        )}
        {...register(name, registerOptions)}
      />
    </FieldShell>
  );
};

/* ------------------------------------------------------------------ */
/* PasswordField — TextField preset with type=password + autocomplete */
/* ------------------------------------------------------------------ */

type PasswordFieldProps<TForm extends FieldValues> = Omit<
  TextFieldProps<TForm>,
  "type" | "autoComplete"
> & {
  /** Defaults to "current-password" — set to "new-password" on signup. */
  autoComplete?: "current-password" | "new-password";
};

export const PasswordField = <TForm extends FieldValues>({
  autoComplete = "current-password",
  ...props
}: PasswordFieldProps<TForm>) => (
  <TextField {...props} type="password" autoComplete={autoComplete} />
);
