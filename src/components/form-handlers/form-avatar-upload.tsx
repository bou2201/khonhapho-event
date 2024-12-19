'use client';

import { toBase64 } from '@/lib/utils';
import React, { ReactNode, useEffect } from 'react';
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

type AvatarUploadProps = {
  value?: string;
  onChange?: (value?: string) => void;
  showPreview?: boolean;
};

export const AvatarUpload = ({ value, onChange, showPreview }: Readonly<AvatarUploadProps>) => {
  const inputRef = React.useRef<HTMLInputElement>(null);

  const handleChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      const base64 = (await toBase64(file)) as string;
      onChange?.(base64);
    }
  };

  useEffect(() => {
    if (showPreview && !value && inputRef.current) {
      inputRef.current.value = '';
    }
  }, [showPreview, value]);

  return (
    <div className="w-full">
      <Input ref={inputRef} type="file" onChange={handleChange} accept="image/*" />
      {showPreview && value && (
        <Image
          src={value}
          quality={100}
          unoptimized
          width={160}
          height={160}
          className="h-auto rounded-xl mt-5"
          alt=""
        />
      )}
    </div>
  );
};

type FormAvatarUploadProps<TFieldValue extends FieldValues> = {
  name: FieldPath<TFieldValue>;
  label: string;
  description?: ReactNode;
  className?: string;
  disableMessage?: boolean;
  showPreview?: boolean;
};

export const FormAvatarUpload = <TFieldValue extends FieldValues>({
  name,
  label,
  description,
  className,
  disableMessage = false,
  showPreview = true,
}: FormAvatarUploadProps<TFieldValue>) => {
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
              <AvatarUpload
                value={field.value}
                onChange={field.onChange}
                showPreview={showPreview}
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
