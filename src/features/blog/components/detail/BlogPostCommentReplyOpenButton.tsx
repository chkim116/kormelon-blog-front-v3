import { Button, Typography } from '@mui/material';

interface BlogPostCommentReplyOpenButtonProps {
  replyLength: number;
  onOpen: () => void;
}
export const BlogPostCommentReplyOpenButton = ({
  replyLength,
  onOpen,
}: BlogPostCommentReplyOpenButtonProps) => (
  <Button variant="text" onClick={onOpen}>
    <Typography variant="subtitle2">+ {replyLength}개의 답글</Typography>
  </Button>
);
