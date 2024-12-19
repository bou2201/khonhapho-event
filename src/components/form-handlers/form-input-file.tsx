'use client';

import { ReactNode, useState } from 'react';
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
import Image from 'next/image';

type FormInputFileProps<TFieldValue extends FieldValues> = {
  name: FieldPath<TFieldValue>;
  label: string;
  description?: ReactNode;
  className?: string;
  placeholder?: string;
  disabled?: boolean;
  onChange?: (file: File | null) => void;
  disableMessage?: boolean;
};

export const FormInputFile = <TFieldValue extends FieldValues>({
  name,
  label,
  description,
  className,
  placeholder = 'Choose a file',
  disabled,
  onChange,
  disableMessage = false,
}: FormInputFileProps<TFieldValue>) => {
  const { control } = useFormContext<TFieldValue>();
  const [preview, setPreview] = useState<string | null>(null);

  const handleFileChange = (file: File | null) => {
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    } else {
      setPreview(null);
    }

    if (onChange) onChange(file);
  };

  return (
    <FormField
      control={control}
      name={name}
      render={({ field, fieldState: { error } }) => (
        <FormItem className={className}>
          <FormLabel className="text-[13px]">{label}</FormLabel>
          <FormControl>
            <div>
              <Input
                type="file"
                accept="image/*"
                onChange={(e) => {
                  const file = e.target.files?.[0] || null;
                  handleFileChange(file);
                  field.onChange(file);
                }}
                disabled={disabled}
                className="cursor-pointer"
              />
              {preview && (
                <div className="mt-2">
                  <Image
                    width={120}
                    height={120}
                    src={preview}
                    alt="Preview"
                    className="rounded-md"
                  />
                </div>
              )}
            </div>
          </FormControl>
          {description && <FormDescription>{description}</FormDescription>}
          {!disableMessage && <FormMessage className="text-[13px]" />}
        </FormItem>
      )}
    />
  );
};
