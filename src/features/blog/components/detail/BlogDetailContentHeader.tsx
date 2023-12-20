'use client';
import {
  BreadcrumbItem,
  Breadcrumbs,
  Button,
  Chip,
  User,
} from '@nextui-org/react';
import NextImage from 'next/image';
import NextLink from 'next/link';
import { numberFormat } from 'safers';
import { BlogDetailUiState } from '@features/blog/domains/detail/blogDetail.uiState';
import { LucideIcon } from '@shared/components/common/LucideIcon';
import {
  IMAGE_DEFAULT_HEIGHT_SIZE,
  IMAGE_DEFAULT_WIDTH_SIZE,
} from '@shared/constants/img.const';

interface BlogDetailContentHeaderProps extends BlogDetailUiState {
  isAuthor: boolean;
  onDelete: (id: number) => void;
}

export const BlogDetailContentHeader = ({
  createdAt,
  id,
  preview,
  tags,
  title,
  user,
  view,
  thumbnail,
  isAuthor,
  readTime,
  category,
  like,
  onDelete,
}: BlogDetailContentHeaderProps) => {
  const handleDelete = () => {
    onDelete(id);
  };

  return (
    <section className="pb-12 sm:pb-16 lg:pb-20">
      {isAuthor && (
        <div className="flex justify-end gap-1">
          <div className="flex items-center gap-1 border-r-1 pr-2">
            <div className="flex items-center gap-1">
              <LucideIcon name="user-2" />
              {numberFormat(view)}
            </div>
            <div className="flex items-center gap-1">
              <LucideIcon name="thumbs-up" />
              {numberFormat(like)}
            </div>
          </div>

          <Button
            isIconOnly
            size="sm"
            variant="light"
            href={`/blog/write?editId=${id}`}
            as={NextLink}
          >
            <LucideIcon name="pencil" />
          </Button>

          <Button
            isIconOnly
            size="sm"
            variant="light"
            color="danger"
            onClick={handleDelete}
          >
            <LucideIcon name="trash" />
          </Button>
        </div>
      )}

      {/* 카테고리 - 서브카테고리 */}
      <div className="max-w-2xl mx-auto text-center mb-3 flex items-center justify-center gap-1">
        <Breadcrumbs>
          <BreadcrumbItem href={`/blog?categoryId=${category.id}`}>
            {category.value}
          </BreadcrumbItem>
          <BreadcrumbItem
            href={`/blog?categoryId=${category.id}&subCategoryId=${category.subCategoryId}`}
          >
            <NextLink
              href={`/blog?categoryId=${category.id}&subCategoryId=${category.subCategoryId}`}
            >
              {category.subCategoryValue}
            </NextLink>
          </BreadcrumbItem>
        </Breadcrumbs>
      </div>

      {/* 타이틀 - 프리뷰 */}
      <div className="text-center max-w-2xl mx-auto break-all whitespace-pre-line">
        <h1 className="text-3xl font-bold tracking-tight text-default-foreground mt-8 sm:text-4xl lg:text-5xl">
          {title}
        </h1>

        <p className="text-base font-medium text-current mt-6 lg:text-lg">
          {preview}
        </p>
      </div>

      {/* 태그 */}
      <div className="flex flex-wrap my-6 gap-1 justify-center">
        {tags.map((tag) => (
          <Chip
            className="mx-1 p-2"
            as={NextLink}
            key={tag.id}
            href={`/search/tags?tagId=${tag.id}&tagValue=${tag.value}`}
            startContent={<LucideIcon name="tag" size={16} />}
            variant="bordered"
          >
            {tag.value}
          </Chip>
        ))}
      </div>

      {/* 유저 정보 */}
      <div className="gap-2 sm:gap-3 flex-col text-center items-center justify-center">
        <User
          className="flex justify-center items-center"
          name={user.username}
          avatarProps={{
            src: user.profileImage,
            alt: '유저 프로필',
            size: 'md',
          }}
        />
        <div className="flex gap-2 justify-center mt-4">
          <div className="flex justify-center text-center items-center gap-2">
            <p className="text-sm font-medium">•</p>
            <p className="text-xs sm:text-sm">{readTime}</p>
          </div>
          <div className="flex justify-center text-center items-center gap-2">
            <p className="text-sm font-medium">•</p>
            <p className="text-xs sm:text-sm">{createdAt}</p>
          </div>
        </div>
      </div>

      <NextImage
        width={IMAGE_DEFAULT_WIDTH_SIZE}
        height={IMAGE_DEFAULT_HEIGHT_SIZE}
        className="object-cover shadow-xl rounded-lg aspect-[16/9] relative overflow-hidden mt-12 sm:mt-16 lg:mt-20 mx-auto"
        priority
        src={thumbnail}
        alt={title}
      />
    </section>
  );
};
