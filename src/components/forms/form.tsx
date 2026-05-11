"use client";

import {
  FormProvider,
  useForm,
  type DefaultValues,
  type FieldValues,
  type SubmitHandler,
  type UseFormReturn,
} from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import type { ZodType } from "zod";
import { cn } from "@/lib/utils";

type Props<TInput extends FieldValues, TOutput extends FieldValues> = {
  schema: ZodType<TOutput, TInput>;
  defaultValues?: DefaultValues<TInput>;
  onSubmit: SubmitHandler<TOutput>;
  /** Render-prop access to the underlying RHF instance if you need it. */
  children:
    | React.ReactNode
    | ((form: UseFormReturn<TInput, unknown, TOutput>) => React.ReactNode);
  className?: string;
  /** Disable native browser validation — Zod handles it. */
  noValidate?: boolean;
};

/**
 * Opinionated form wrapper: react-hook-form + zod resolver in one line.
 *
 * Usage:
 *   <Form schema={LoginSchema} defaultValues={...} onSubmit={onSubmit}>
 *     <TextField name="email" label="Email" />
 *     <SubmitButton>Se connecter</SubmitButton>
 *   </Form>
 */
export const Form = <
  TInput extends FieldValues,
  TOutput extends FieldValues = TInput,
>({
  schema,
  defaultValues,
  onSubmit,
  children,
  className,
  noValidate = true,
}: Props<TInput, TOutput>) => {
  const form = useForm<TInput, unknown, TOutput>({
    resolver: zodResolver(schema),
    defaultValues,
    mode: "onTouched",
  });

  return (
    <FormProvider {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        noValidate={noValidate}
        className={cn("flex flex-col gap-4", className)}
      >
        {typeof children === "function" ? children(form) : children}
      </form>
    </FormProvider>
  );
};
