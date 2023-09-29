'use client';
import {
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Skeleton,
} from '@nextui-org/react';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface BlogCommonCardSkeletonProps {}

export function BlogCommonCardSkeleton(_: BlogCommonCardSkeletonProps) {
  return (
    <Card className="lg:max-w-sm w-full" shadow="none">
      <CardHeader className="p-0">
        <Skeleton className="w-full h-full aspect-ratio--16x9 rounded-lg">
          <div className="h-48 rounded-lg bg-default-300" />
        </Skeleton>
      </CardHeader>

      <CardBody className="p-0 py-2 flex-col gap-2">
        <Skeleton className="w-4/5 h-6 rounded-lg" />
        <div>
          <Skeleton className="w-full h-4 rounded-lg" />
          <Skeleton className="my-1 w-full h-4 rounded-lg" />
          <Skeleton className="w-2/5 h-4 rounded-lg" />
        </div>
      </CardBody>

      <CardFooter className="px-0 py-2 flex justify-between">
        <Skeleton className="w-1/6 h-3 rounded-lg" />
        <Skeleton className="w-1/6 h-3 rounded-lg" />
      </CardFooter>
    </Card>
  );
}
