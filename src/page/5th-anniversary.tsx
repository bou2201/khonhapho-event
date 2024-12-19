'use client';

import { Button, Form } from '@/components/ui';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import {
  FormAvatarUpload,
  FormInput,
  FormSelect,
  FormSelectOption,
} from '@/components/form-handlers';
import { useRef } from 'react';
import Image from 'next/image';
import html2canvas from 'html2canvas-pro';
import { CloudDownload } from 'lucide-react';
import { convertSlugify } from '@/lib/utils';

const fifthAnniversarySchema = z.object({
  name: z.string(),
  role: z.string(),
  file: z.any(),
});

type FifthAnniversarySchemaType = z.infer<typeof fifthAnniversarySchema>;

const RoleOptions: FormSelectOption<string>[] = [
  {
    label: 'Ứng viên',
    value: 'Ứng viên',
  },
  {
    label: 'Thư ký',
    value: 'Thư ký',
  },
  {
    label: 'Giám đốc tài chính',
    value: 'Giám đốc tài chính',
  },
  {
    label: 'Giám đốc khu vực',
    value: 'Giám đốc khu vực',
  },
  {
    label: 'Giám đốc kinh doanh',
    value: 'Giám đốc kinh doanh',
  },
  {
    label: 'Phó giám đốc kinh doanh',
    value: 'Phó giám đốc kinh doanh',
  },
  {
    label: 'Trưởng phòng',
    value: 'Trưởng phòng',
  },
  {
    label: 'Phó phòng',
    value: 'Phó phòng',
  },
  {
    label: 'Trợ lý',
    value: 'Trợ lý',
  },
  {
    label: 'Ứng viên trưởng phòng',
    value: 'Ứng viên trưởng phòng',
  },
  {
    label: 'Đầu chủ',
    value: 'Đầu chủ',
  },
  {
    label: 'Chuyên viên',
    value: 'Chuyên viên',
  },
  {
    label: 'Học viên',
    value: 'Học viên',
  },
];

export const FifthAnniversary = () => {
  const invitationRef = useRef(null);

  const form = useForm<FifthAnniversarySchemaType>({
    resolver: zodResolver(fifthAnniversarySchema),
    defaultValues: {
      name: '',
      role: '',
      file: null,
    },
  });

  const { handleSubmit, reset, watch } = form;

  const [name, role, file] = watch(['name', 'role', 'file']);

  const handleDownload = async (fileName?: string) => {
    if (invitationRef.current) {
      const canvas = await html2canvas(invitationRef.current, {
        useCORS: true,
        scale: 2,
      });
      const dataURL = canvas.toDataURL('image/png');

      const link = document.createElement('a');
      link.href = dataURL;
      link.download = fileName ?? 'thu-moi.png';
      link.click();
    }
  };

  return (
    <div className="md:container md:mx-auto max-md:px-4 py-4">
      <Form {...form}>
        <form
          id="5th-anni-form"
          onSubmit={handleSubmit((data) => {
            console.log(data);
          })}
        >
          <h3 className="text-2xl font-semibold mb-3">Thông tin thư mời</h3>
          <div className="grid grid-cols-3 max-sm:grid-cols-1 gap-4">
            <FormInput<FifthAnniversarySchemaType>
              name="name"
              label="Tên"
              inputProps={{
                placeholder: 'Nhập tên',
              }}
            />

            <FormSelect<FifthAnniversarySchemaType>
              name="role"
              label="Chức danh"
              options={RoleOptions}
              sortByAlpha
            />

            <FormAvatarUpload<FifthAnniversarySchemaType>
              name="file"
              label="Hình ảnh"
              showPreview={false}
            />
          </div>

          <div className="flex justify-end gap-3 mt-5">
            <Button
              variant="outline"
              onClick={(e) => {
                e.preventDefault();
                reset();
              }}
            >
              Làm mới
            </Button>
            <Button
              type="button"
              onClick={(e) => {
                e.preventDefault();
                if (name && role) {
                  const fileName = convertSlugify(role + ' ' + name);
                  handleDownload(`thu-moi-${fileName}`);
                } else {
                  handleDownload();
                }
              }}
            >
              <CloudDownload className="h-4 w-4 mr-1 opacity-70" />
              Tải xuống thư mời
            </Button>
          </div>
        </form>
      </Form>

      <h3 className="text-2xl font-semibold my-3">Ảnh xem trước</h3>

      <div className="flex w-full justify-center">
        <div ref={invitationRef} className="relative max-w-[860px] h-auto">
          <Image
            src="/images/thumoi.png"
            alt="thu-moi"
            objectFit="cover"
            priority
            width={0}
            height={0}
            unoptimized
            className="w-full h-auto"
          />

          {file && (
            <div className="absolute bottom-[100px] right-[75px] -z-[1]">
              <Image
                src={file as string}
                alt="avatar"
                width={0}
                height={0}
                className="w-72 h-72 object-cover"
              />
            </div>
          )}

          <div className="w-[320px] absolute bottom-[82px] right-[56px] flex flex-col gap-[2px]">
            {role && <h4 className="w-full font-bold text-xl text-white text-center">{role}</h4>}
            {name && <h4 className="w-full font-bold text-lg text-white text-center">{name}</h4>}
          </div>
        </div>
      </div>
    </div>
  );
};
