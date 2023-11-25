'use client';
import NextLink from 'next/link';
import { Card, CardBody, Link } from '@nextui-org/react';
import { BlogDetailNearDto } from '@domain/blog/detail/blogDetail.uiState';
import { LucideIcon } from '@shared/components/common/Icon';

interface BlogDetailNearPostProps {
  nearPost: BlogDetailNearDto;
}

export const BlogDetailNearPost = ({ nearPost }: BlogDetailNearPostProps) => {
  const { next, prev } = nearPost;

  const shouldPrev = Boolean(prev?.id);
  const shouldNext = Boolean(next?.id);

  if (!shouldPrev && !shouldNext) {
    return null;
  }

  return (
    <section className="flex flex-col md:flex-row w-full md:justify-between gap-4 mt-4">
      {shouldPrev ? (
        <Card className="flex-1 md:max-w-[50%]">
          <CardBody className="px-4 py-3">
            <div className="flex items-center gap-2">
              <LucideIcon name="arrow-left-circle" fontSize="small" />
              <p className="text-xs">이전 포스트</p>
            </div>
            <Link as={NextLink} href={`/blog/${prev?.id}`} color="foreground">
              <h3 className="mt-2 text-lg text-bold truncate">{prev?.title}</h3>
            </Link>
          </CardBody>
        </Card>
      ) : (
        <></>
      )}

      {shouldNext ? (
        <Card className="flex-1 md:ml-auto md:max-w-[50%]">
          <CardBody className="px-4 py-3">
            <div className="flex items-center gap-2 justify-end">
              <p className="text-xs">다음 포스트</p>
              <LucideIcon name="arrow-right-circle" fontSize="small" />
            </div>
            <Link as={NextLink} href={`/blog/${next?.id}`} color="foreground">
              <h3 className="mt-2 ml-auto text-lg text-bold truncate">
                {next?.title}
              </h3>
            </Link>
          </CardBody>
        </Card>
      ) : (
        <></>
      )}
    </section>
  );
};
