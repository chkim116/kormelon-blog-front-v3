import { ChangeEventHandler } from 'react';
import { Input } from '@nextui-org/react';
import Image from 'next/image';
import { toast } from '@shared/services';

interface BlogWriteThumbnailProps {
  onUploadImage: (file: File) => void;
  previewThumbnail: string;
}

export const BlogWriteThumbnail = ({
  onUploadImage,
  previewThumbnail,
}: BlogWriteThumbnailProps) => {
  const handleUploadImage: ChangeEventHandler<HTMLInputElement> = (e) => {
    const file = e.target.files?.[0];

    if (!file) {
      toast.open('error', '올바르게 업로드 되지 않았습니다.');
      return;
    }

    onUploadImage(file);
  };

  return (
    <div className="flex gap-4">
      <div className="flex-col">
        <div className="relative w-full max-h-[480px] pb-[56.25%]">
          <div className="absolute w-full h-full">
            <Image
              className="w-full h-full"
              src={previewThumbnail}
              alt="미리보는 썸네일"
              layout="fill"
            />
          </div>
        </div>

        <Input
          labelPlacement="outside-left"
          label="썸네일"
          variant="underlined"
          type="file"
          onChange={handleUploadImage}
        />
      </div>
    </div>
  );
};
