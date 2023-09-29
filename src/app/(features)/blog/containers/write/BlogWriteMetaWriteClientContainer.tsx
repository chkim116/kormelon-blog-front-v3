'use client';
import { useAppDispatch, useAppSelector } from '@shared/stores';
import { selCategories } from '@shared/stores/category';
import { BlogPostCreateParams } from '@server/entities';
import { toast } from '@shared/services';
import {
  BlogWriteCategory,
  BlogWriteMeta,
  BlogWriteThumbnail,
} from '@app/blog/components/write';
import { effBlogPostImageUpload } from '@app/blog/stores';

interface BlogWriteMetaWriteClientContainerProps {
  thumbnail: string;
  title: string;
  preview: string;
  categoryId: number;
  subCategoryId: number;
  onChange: (dto: Partial<BlogPostCreateParams>) => void;
}

export const BlogWriteMetaWriteClientContainer = ({
  thumbnail,
  title,
  preview,
  categoryId,
  subCategoryId,
  onChange,
}: BlogWriteMetaWriteClientContainerProps) => {
  const dispatch = useAppDispatch();
  const categories = useAppSelector(selCategories);

  const handleUploadImage = async (file: File) => {
    try {
      const payload = await dispatch(effBlogPostImageUpload(file)).unwrap();
      onChange({ thumbnail: payload });
    } catch (err) {
      toast.open('error', (err as Error).message);
    }
  };

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
