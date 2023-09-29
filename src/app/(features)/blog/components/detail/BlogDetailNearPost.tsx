'use client';
import NextLink from 'next/link';
import { Card, CardBody, Divider, Link } from '@nextui-org/react';
import ArrowCircleRightOutlinedIcon from '@mui/icons-material/ArrowCircleRightOutlined';
import ArrowCircleLeftOutlinedIcon from '@mui/icons-material/ArrowCircleLeftOutlined';
import { BlogPostNearEntity } from '@server/entities';

interface BlogDetailNearPostProps {
  nearPost: BlogPostNearEntity;
}

export const BlogDetailNearPost = ({ nearPost }: BlogDetailNearPostProps) => {
  const { next, prev } = nearPost;

  const shouldPrev = Boolean(prev?.id);
  const shouldNext = Boolean(next?.id);

  if (!shouldPrev && !shouldNext) {
    return null;
  }

  return (
    <>
      <Divider className="my-6" />

      <section className="flex flex-col md:flex-row w-full md:justify-between gap-4">
        {shouldPrev ? (
          <Card className="flex-1 md:max-w-[50%]">
            <CardBody className="px-4 py-3">
              <div className="flex items-center gap-2">
                <ArrowCircleLeftOutlinedIcon fontSize="small" />
                <p className="text-xs">이전 포스트</p>
              </div>
              <Link as={NextLink} href={`/blog/${prev?.id}`} color="foreground">
                <h3 className="mt-2 text-lg text-bold truncate">
                  {prev?.title}
                </h3>
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
                <ArrowCircleRightOutlinedIcon fontSize="small" />
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
    </>
  );
};
