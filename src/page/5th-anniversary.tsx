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
import { useEffect, useRef, useState } from 'react';
import { CloudDownload } from 'lucide-react';
import { convertSlugify } from '@/lib/utils';
import {
  drawAvatarCanvas,
  drawBackgroundCanvas,
  drawFullname,
  drawInitialCanvas,
  drawRole,
} from '@/lib/canvas';
import { ImageCrop } from '@/components/image-handlers';

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

const CanvasPreview = ({ role, name, file }: FifthAnniversarySchemaType) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const timeout = setTimeout(async () => {
      const canvas = canvasRef.current;
      const ctx = canvas?.getContext('2d');
      if (!canvas || !ctx) return;

      ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);

      await drawAvatarCanvas(ctx, file);
      await drawBackgroundCanvas(ctx);
      drawFullname(ctx, name || 'Họ Tên');
      drawRole(ctx, role || 'Chức danh');
    }, 600);

    return () => {
      clearTimeout(timeout);
    };
  }, [role, name, file]);

  useEffect(() => {
    const loadData = async () => {
      const canvas = canvasRef.current;
      if (canvas) {
        const ctx = canvas.getContext('2d');
        await drawInitialCanvas(canvas);
        if (!ctx) return;
        await drawAvatarCanvas(ctx);
        await drawBackgroundCanvas(ctx);
        drawFullname(ctx, 'Họ & Tên');
        drawRole(ctx, 'Chức danh');
      }
    };
    loadData();
  }, []);

  return (
    <div className="flex justify-center items-center w-full">
      <canvas id="canvas-preview" ref={canvasRef} className="w-full"></canvas>
    </div>
  );
};

export const FifthAnniversary = () => {
  const invitationRef = useRef<any>(null);
  const [cropImage, setCropImage] = useState<File>();

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
    const canvas = document.getElementById('canvas-preview') as HTMLCanvasElement;
    if (!canvas) return;
    const dataUrl = canvas.toDataURL('image/jpeg');
    const link = document.createElement('a');
    link.href = dataUrl;
    link.download = fileName ?? 'thu-moi.jpeg';
    link.click();
  };

  return (
    <>
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
                label="Họ và tên"
                inputProps={{
                  placeholder: 'Nhập họ và tên',
                }}
              />

              <FormSelect<FifthAnniversarySchemaType>
                name="role"
                label="Chức danh"
                options={RoleOptions}
              />

              <FormAvatarUpload<FifthAnniversarySchemaType>
                name="file"
                label="Chọn ảnh avatar"
                showPreview={false}
              />
            </div>

            <div className="flex justify-start gap-3 mt-5">
              <Button
                variant="outline"
                onClick={(e) => {
                  e.preventDefault();
                  reset();
                  setCropImage(undefined);
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
                    handleDownload(`thu-moi-${fileName}.jpeg`);
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

        <div ref={invitationRef} className="pointer-events-none">
          <CanvasPreview name={name} role={role} file={cropImage} />
        </div>
      </div>

      <ImageCrop
        image={file}
        onCrop={(img) => {
          setCropImage(img);
        }}
      />
    </>
  );
};
