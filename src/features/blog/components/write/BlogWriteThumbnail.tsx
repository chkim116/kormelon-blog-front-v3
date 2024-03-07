'use client';
import { ChangeEventHandler } from 'react';
import { Button } from '@nextui-org/react';
import Image from 'next/image';
import { toast } from '@common/lib/ToastService';
import {
  IMAGE_DEFAULT_WIDTH_SIZE,
  IMAGE_DEFAULT_HEIGHT_SIZE,
} from '@shared/constants/img.const';

interface BlogWriteThumbnailProps {
  pending: boolean;
  onUploadImage: (fd: FormData) => Promise<string>;
  previewThumbnail: string;
}

export const BlogWriteThumbnail = ({
  pending,
  onUploadImage,
  previewThumbnail,
}: BlogWriteThumbnailProps) => {
  const handleUploadImage: ChangeEventHandler<HTMLInputElement> = (e) => {
    const file = e.target.files?.[0];

    if (!file) {
      toast.open('error', '올바르게 업로드 되지 않았습니다.');
      return;
    }

    const fd = new FormData();
    fd.append('file', file);

    onUploadImage(fd);
  };

  return (
    <div className="flex gap-4">
      <div className="flex-col">
        <Image
          width={IMAGE_DEFAULT_WIDTH_SIZE}
          height={IMAGE_DEFAULT_HEIGHT_SIZE}
          className="object-cover shadow-xl rounded-lg aspect-[16/9] relative overflow-hidden mt-12 sm:mt-16 lg:mt-20 mx-auto"
          src={previewThumbnail}
          alt="미리보는 썸네일"
        />

        <Button fullWidth as="label" color="primary" isLoading={pending}>
          업로드
          <input
            accept="image/*"
            type="file"
            hidden
            onChange={handleUploadImage}
          />
        </Button>
      </div>
    </div>
  );
};
