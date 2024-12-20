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
    label: 'Phó tổng giám đốc',
    value: 'Phó tổng giám đốc',
  },
  {
    label: 'Thư ký',
    value: 'Thư ký',
  },
  {
    label: 'Giám đốc tỉnh',
    value: 'Giám đốc tỉnh',
  },
  {
    label: 'Phó giám đốc tỉnh',
    value: 'Phó giám đốc tỉnh',
  },
  {
    label: 'Giám đốc chi nhánh',
    value: 'Giám đốc chi nhánh',
  },
  {
    label: 'Phó giám đốc chi nhánh',
    value: 'Phó giám đốc chi nhánh',
  },
  {
    label: 'Phó phòng chi nhánh',
    value: 'Phó phòng chi nhánh',
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
    label: 'Giám đốc tài chính',
    value: 'Giám đốc tài chính',
  },
  {
    label: 'Phó giám đốc tài chính',
    value: 'Phó giám đốc tài chính',
  },
  {
    label: 'Giám đốc',
    value: 'Giám đốc',
  },
  {
    label: 'Phó giám đốc',
    value: 'Phó giám đốc',
  },
  {
    label: 'Trưởng phòng kinh doanh',
    value: 'Trưởng phòng kinh doanh',
  },
  {
    label: 'Phó phòng kinh doanh',
    value: 'Phó phòng kinh doanh',
  },
  {
    label: 'Ứng viên trưởng phòng',
    value: 'Ứng viên trưởng phòng',
  },
  {
    label: 'Trợ lý',
    value: 'Trợ lý',
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
  const invitationRef = useRef<any>(null);

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
      const style = document.createElement('style');
      style.innerHTML = `
        @import url('https://fonts.googleapis.com/css2?family=Quicksand:wght@300..700&display=swap');
        * {
          font-family: 'Quicksand', sans-serif !important;
        }
      `;

      // Append the style to the card container
      invitationRef.current.appendChild(style);

      // Generate the canvas with the applied font styles
      const canvas = await html2canvas(invitationRef.current, {
        useCORS: true,
      });

      // Remove the style element after rendering
      invitationRef.current.removeChild(style);

      // Convert canvas to a JPEG image
      const dataURL = canvas.toDataURL('image/png');

      // Create a download link
      const link = document.createElement('a');
      link.href = dataURL;
      link.download = fileName ?? 'thu-moi.png';
      link.click();
    }
  };

  return (
    <div className="max-w-[860px] md:mx-auto px-2 lg:px-0 py-4">
      <Form {...form}>
        <form
          id="5th-anni-form"
          onSubmit={handleSubmit((data) => {
            console.log(data);
          })}
        >
          <h3 className="text-2xl font-semibold mb-3">Thông tin thư mời</h3>
          <div className="flex flex-col gap-2">
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
            />

            <FormAvatarUpload<FifthAnniversarySchemaType>
              name="file"
              label="Hình ảnh"
              showPreview={false}
            />
          </div>

          <div className="flex justify-start gap-3 mt-5">
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
                  handleDownload(`thu-moi-${fileName}.png`);
                } else {
                  handleDownload();
                }
              }}
              disabled={!name || !role || !file}
            >
              <CloudDownload className="h-4 w-4 mr-1 opacity-70" />
              Tải xuống thư mời
            </Button>
          </div>
        </form>
      </Form>

      <h3 className="text-2xl font-semibold my-5">Ảnh xem trước</h3>

      <div className="flex w-full justify-center">
        <div ref={invitationRef} className="relative max-w-[860px] h-auto">
          <Image
            src="/images/thu-moi.png"
            alt="thu-moi"
            priority
            width={0}
            height={0}
            unoptimized
            className="w-full h-auto object-cover"
          />

          {file && (
            <div className="absolute bottom-[12%] md:bottom-[90px] lg:bottom-[100px] right-[5%] md:right-[65px] lg:right-[75px] -z-[1]">
              <Image
                src={file as string}
                alt="avatar"
                width={0}
                height={0}
                className="w-40 h-40 md:w-72 md:h-72 object-cover"
              />
            </div>
          )}

          <div className="w-[48%] md:w-[320px] absolute bottom-[11%] md:bottom-[74px] lg:bottom-[74px] right-[1%] md:right-[46px] lg:right-[56px] flex flex-col">
            {role && (
              <h4 className="w-full font-bold text-[10px] md:text-lg lg:text-xl h-[14px] md:h-[20px] lg:h-[24px] text-[#ffea85] uppercase text-center">
                {role}
              </h4>
            )}
            {name && (
              <h4 className="w-full font-bold text-[12px] md:text-[1.6rem] lg:text-[1.8rem] text-white text-center">
                {name}
              </h4>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
