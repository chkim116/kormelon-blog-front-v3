'use client';
import { Button } from '@nextui-org/react';
import { LucideIcon } from '@shared/components/common/Icon';

interface BlogDetailContentActionProps {
  isLiked: boolean;
  onShare: () => void;
  onLike: () => void;
}

export const BlogDetailContentAction = ({
  isLiked,
  onLike,
  onShare,
}: BlogDetailContentActionProps) => (
  <ul className="flex justify-end items-center mt-8 space-x-3">
    <Button
      as="li"
      aria-label="공유 버튼"
      isIconOnly
      variant="bordered"
      onClick={onShare}
    >
      <LucideIcon name="clipboard-copy" />
    </Button>
    <Button
      as="li"
      isIconOnly
      variant="bordered"
      color={isLiked ? 'danger' : 'default'}
      onClick={onLike}
      aria-label="좋아요 버튼"
    >
      <LucideIcon name="thumbs-up" />
    </Button>
  </ul>
);
