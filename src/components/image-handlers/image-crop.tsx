'use client';

import 'cropperjs/dist/cropper.css';
import React, { createRef, useEffect, useState } from 'react';
import { Cropper, ReactCropperElement } from 'react-cropper';
import { Button } from '../ui';

export type ImageCropTypes = {
  image?: File;
  onCrop?: (file: File) => void;
  onCancel?: () => void;
};

export const ImageCrop: React.FC<ImageCropTypes> = ({ image, onCancel, onCrop }) => {
  const [open, setOpen] = useState<boolean>(false);
  const [currentImage, setCurrentImage] = useState<string | undefined>();
  const cropperRef = createRef<ReactCropperElement>();

  useEffect(() => {
    if (image) {
      setOpen(true);
      const reader = new FileReader();
      reader.onloadend = () => {
        if (reader.result) setCurrentImage(reader.result as string);
      };
      reader.readAsDataURL(image);
    }
  }, [image]);

  const getCropData = () => {
    if (typeof cropperRef.current?.cropper !== 'undefined') {
      cropperRef.current?.cropper.getCroppedCanvas().toBlob((blob) => {
        setOpen(false);
        if (blob) {
          const file = new File([blob], 'image.png', {
            type: 'image/png',
            lastModified: Date.now(),
          });
          onCrop?.(file);
        }
      });
    }
  };

  return (
    <>
      {open && (
        <div className="fixed flex justify-center items-center top-0 left-0 inset-0 z-50 bg-black/50">
          <div className="relative flex flex-col w-[500px]">
            <div className="w-full aspect-square">
              <Cropper
                className="w-full h-[80vh]"
                ref={cropperRef}
                id="cropper"
                initialAspectRatio={1}
                preview=".img-preview"
                src={currentImage}
                viewMode={1}
                minCropBoxHeight={10}
                minCropBoxWidth={10}
                background={true}
                responsive={true}
                autoCropArea={1}
                checkOrientation={false}
                guides={true}
                aspectRatio={1}
              />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <Button
                variant="outline"
                onClick={() => {
                  onCancel?.();
                  setOpen(false);
                }}
              >
                Huỷ
              </Button>
              <Button
                variant="default"
                onClick={() => {
                  getCropData();
                }}
              >
                Hoàn thành
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};