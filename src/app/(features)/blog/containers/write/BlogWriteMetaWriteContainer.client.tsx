'use client';
import { toast } from 'src/app/shared/services/ToastService';
import { BlogWriteCreateUiParams } from '@domain/blog/write/blogWrite.uiState';
import { CategorySearchUiState } from '@domain/category/category.uiState';
import { useActionState } from 'src/app/shared/hooks/useActionState';
import { BlogWriteCategory } from '@app/blog/components/write/BlogWriteCategory';
import { BlogWriteMeta } from '@app/blog/components/write/BlogWriteMeta';
import { BlogWriteThumbnail } from '@app/blog/components/write/BlogWriteThumbnail';
import { actBlogWriteImageUpload } from '@app/blog/actions/blogWrite.action';

interface BlogWriteMetaWriteContainerClientProps {
  thumbnail: string;
  title: string;
  preview: string;
  categoryId: number;
  subCategoryId: number;
  categories: CategorySearchUiState[];
  onChange: (dto: Partial<BlogWriteCreateUiParams>) => void;
}

export const BlogWriteMetaWriteContainerClient = ({
  thumbnail,
  title,
  preview,
  categoryId,
  subCategoryId,
  categories,
  onChange,
}: BlogWriteMetaWriteContainerClientProps) => {
  const { action: handleUploadImage } = useActionState(
    '',
    actBlogWriteImageUpload,
    {
      onSuccess({ data }) {
        onChange({ thumbnail: data });
      },
      onError({ message }) {
        toast.open('error', message);
      },
    },
  );

  const handleChangeCategory = (name: string, id: number) => {
    onChange({ [name]: id });
  };

  const handleChange = (name: string, value: string) => {
    onChange({ [name]: value });
  };

  return (
    <div className="max-w-4xl mx-auto">
      <BlogWriteThumbnail
        previewThumbnail={thumbnail}
        onUploadImage={handleUploadImage}
      />
      <BlogWriteCategory
        categories={categories}
        categoryId={categoryId}
        subCategoryId={subCategoryId}
        onChangeCategory={handleChangeCategory}
      />
      <BlogWriteMeta title={title} preview={preview} onChange={handleChange} />
    </div>
  );
};
