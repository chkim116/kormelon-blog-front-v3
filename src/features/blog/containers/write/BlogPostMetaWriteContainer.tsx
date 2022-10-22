import { useAppSelector } from '@common/store';
import { BlogPostCreateParams } from '@core/entities';
import { repo } from '@core/repo';
import {
  PostCategory,
  PostWriteMeta,
  PostWriteThumbnail,
} from '@features/blog/components/write';
import { selCategories } from '@features/settings/stores';

interface BlogPostMetaWriteContainerProps {
  thumbnail: string;
  title: string;
  preview: string;
  categoryId: number;
  subCategoryId: number;
  onChange: (dto: Partial<BlogPostCreateParams>) => void;
}

export const BlogPostMetaWriteContainer = ({
  thumbnail,
  title,
  preview,
  categoryId,
  subCategoryId,
  onChange,
}: BlogPostMetaWriteContainerProps) => {
  const categories = useAppSelector(selCategories);

  const handleUploadImage = async (file: File) => {
    const {
      data: { payload },
    } = await repo.post.uploadImage(file);

    onChange({ thumbnail: payload });
  };

  const handleChangeCategory = (name: string, id: number) => {
    onChange({ [name]: id });
  };

  const handleChange = (name: string, value: string) => {
    onChange({ [name]: value });
  };

  return (
    <>
      <PostWriteThumbnail
        previewThumbnail={thumbnail}
        onUploadImage={handleUploadImage}
      />
      <PostCategory
        categories={categories}
        categoryId={categoryId}
        subCategoryId={subCategoryId}
        onChangeCategory={handleChangeCategory}
      />
      <PostWriteMeta title={title} preview={preview} onChange={handleChange} />
    </>
  );
};
