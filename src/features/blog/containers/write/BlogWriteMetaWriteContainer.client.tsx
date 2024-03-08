'use client';
import { useActionState } from '@common/hooks/useActionState';
import { BlogWriteCategory } from '@features/blog/components/write/BlogWriteCategory';
import { BlogWriteMeta } from '@features/blog/components/write/BlogWriteMeta';
import { BlogWriteThumbnail } from '@features/blog/components/write/BlogWriteThumbnail';
import { actBlogWriteImageUpload } from '@features/blog/actions/blogWrite.action';
import { BlogWriteCreateUiParams } from '@features/blog/domains/write/blogWrite.uiState';
import { CategorySearchUiState } from '@features/categories/domains/category.uiState';

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
  const { action: handleUploadImage, loading } = useActionState(
    '',
    actBlogWriteImageUpload,
    {
      onSuccess({ data }) {
        onChange({ thumbnail: data });
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
        pending={loading}
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
