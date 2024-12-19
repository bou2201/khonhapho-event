'use client';

import { InputHTMLAttributes, ReactNode } from 'react';
import { FieldPath, FieldValues, useFormContext } from 'react-hook-form';
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Input,
} from '../ui';

type FormInputProps<TFieldValue extends FieldValues> = {
  name: FieldPath<TFieldValue>;
  label?: string;
  description?: ReactNode;
  className?: string;
  inputProps?: InputHTMLAttributes<HTMLInputElement>;
  disableMessage?: boolean;
};

export const FormInput = <TFieldValue extends FieldValues>({
  name,
  label,
  description,
  className,
  inputProps,
  disableMessage = false,
}: FormInputProps<TFieldValue>) => {
  const { control } = useFormContext<TFieldValue>();

  return (
    <FormField
      control={control}
      name={name}
      render={({ field, fieldState: { error } }) => {
        return (
          <FormItem className={className}>
            {label && <FormLabel className="text-[13px]">{label}</FormLabel>}
            <FormControl>
              <Input
                {...field}
                {...inputProps}
                className={`${error && 'border-destructive'} ${inputProps?.className}`}
              />
            </FormControl>
            {description && <FormDescription>{description}</FormDescription>}
            {!disableMessage && <FormMessage className="text-[13px]" />}
          </FormItem>
        );
      }}
    />
  );
};
