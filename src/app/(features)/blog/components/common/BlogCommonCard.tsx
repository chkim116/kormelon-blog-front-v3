'use client';
import {
  Card,
  CardHeader,
  CardBody,
  Image,
  Link,
  CardFooter,
} from '@nextui-org/react';
import NextLink from 'next/link';
import { BlogPostModel } from '@domain/uiStates';

interface BlogCommonCardProps extends BlogPostModel {}

export function BlogCommonCard({
  createdAt,
  id,
  preview,
  readTime,
  thumbnail,
  title,
}: BlogCommonCardProps) {
  return (
    <Card
      as="article"
      className="mx-auto max-w-full xl:max-w-sm w-full bg-dark"
      shadow="none"
    >
      <CardHeader className="p-0">
        <Link as={NextLink} href={`/blog/${id}`}>
          <Image
            alt={title}
            className="h-full w-full object-cover"
            src={thumbnail}
            width="100%"
            height="100%"
          />
        </Link>
      </CardHeader>
      <CardBody className="p-0 overflow-visible py-2">
        <Link
          as={NextLink}
          href={`/blog/${id}`}
          className="flex-col items-start"
        >
          <h3 className="text-default-foreground text-base sm:text-lg font-bold">
            {title}
          </h3>
          <p className="text-default-foreground font-medium text-sm sm:text-base py-2">
            {preview}
          </p>
        </Link>
      </CardBody>
      <CardFooter className="text-sm sm:text-base text-default-500 px-0 py-2 flex justify-between">
        <small>{readTime}</small>
        <small>{createdAt}</small>
      </CardFooter>
    </Card>
  );
}
