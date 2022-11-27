import { useAppDispatch, useAppSelector } from '@common/store';
import { BlogPostCreateParams } from '@core/entities';
import { selCategories } from '@shared/stores/category';
import {
  PostCategory,
  PostWriteMeta,
  PostWriteThumbnail,
} from '@features/blog/components/write';
import { effBlogPostImageUpload } from '@features/blog/stores';

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
  const dispatch = useAppDispatch();
  const categories = useAppSelector(selCategories);

  const handleUploadImage = async (file: File) => {
    const payload = await dispatch(effBlogPostImageUpload(file)).unwrap();

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
