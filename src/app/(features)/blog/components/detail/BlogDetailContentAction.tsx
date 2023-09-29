'use client';
import ShareRoundedIcon from '@mui/icons-material/ShareRounded';
import FavoriteRoundedIcon from '@mui/icons-material/FavoriteRounded';
import { Button } from '@nextui-org/react';

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
      <ShareRoundedIcon />
    </Button>
    <Button
      as="li"
      isIconOnly
      variant="bordered"
      color={isLiked ? 'danger' : 'default'}
      onClick={onLike}
      aria-label="좋아요 버튼"
    >
      <FavoriteRoundedIcon />
    </Button>
  </ul>
);
