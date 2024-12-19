'use client';

import { ReactNode } from 'react';
import { FieldPath, FieldValues, useFormContext } from 'react-hook-form';
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui';

export type FormSelectOption<TValue> = { label: string; value: TValue };

export type FormSelectProps<TFieldValue extends FieldValues, TOption = any> = {
  name: FieldPath<TFieldValue>;
  label: string;
  description?: ReactNode;
  className?: string;
  options: FormSelectOption<string>[] | TOption[];
  typeOption?: 'default' | 'custom';
  displayLabel?: string;
  displayValue?: string;
  isObjectValue?: boolean;
  placeholder?: string;
  disabled?: boolean;
  onChange?: (value: string) => void;
  disableMessage?: boolean;
  sortByAlpha?: boolean;
};

export const FormSelect = <TFieldValue extends FieldValues, TOption = any>({
  name,
  label,
  description,
  className,
  options,
  displayLabel = 'name',
  displayValue = '_id',
  isObjectValue,
  typeOption = 'default',
  placeholder = 'Chọn',
  disabled,
  onChange,
  disableMessage = false,
  sortByAlpha = false,
}: FormSelectProps<TFieldValue, TOption>) => {
  const { control } = useFormContext<TFieldValue>();

  const sortedOptions = sortByAlpha
    ? [...options].sort((a, b) => {
        const labelA =
          typeOption === 'default'
            ? (a as FormSelectOption<string>).label
            : (a as any)[displayLabel];
        const labelB =
          typeOption === 'default'
            ? (b as FormSelectOption<string>).label
            : (b as any)[displayLabel];
        return labelA?.localeCompare(labelB);
      })
    : options;

  return (
    <FormField
      control={control}
      name={name}
      render={({ field, fieldState: { error } }) => (
        <FormItem className={className}>
          <FormLabel className="text-[13px]">{label}</FormLabel>
          <Select
            value={field.value ?? ''}
            onValueChange={(e) => {
              field.onChange(e);
              if (onChange) onChange(e);
            }}
            disabled={disabled}
          >
            <FormControl>
              <SelectTrigger className={`${error && 'border-[#ee4949]'}`}>
                <SelectValue placeholder={placeholder} />
              </SelectTrigger>
            </FormControl>
            <SelectContent className="overflow-y-auto max-h-[18rem]">
              {typeOption === 'default'
                ? (sortedOptions as FormSelectOption<string>[]).map(({ label, value }) => (
                    <SelectItem key={label} value={value} className="cursor-pointer">
                      {label}
                    </SelectItem>
                  ))
                : (sortedOptions as TOption[]).map((option) => (
                    <SelectItem
                      key={(option as any)[displayLabel]}
                      value={isObjectValue ? JSON.stringify(option) : (option as any)[displayValue]}
                      className="cursor-pointer"
                    >
                      {(option as any)[displayLabel]}
                    </SelectItem>
                  ))}
            </SelectContent>
          </Select>
          {description && <FormDescription>{description}</FormDescription>}
          {!disableMessage && <FormMessage className="text-[13px]" />}
        </FormItem>
      )}
    />
  );
};
